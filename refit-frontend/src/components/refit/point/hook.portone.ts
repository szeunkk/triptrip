import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "@/graphql/mutations/point";

export type PaymentStatus = "idle" | "loading" | "success" | "failed";

interface UsePortonePaymentResult {
  requestPayment: (amount: number) => Promise<boolean>;
  status: PaymentStatus;
  loading: boolean;
  error: Error | null;
}

export const usePortonePayment = (
  onSuccess: () => void,
  onFailed: (message: string) => void
): UsePortonePaymentResult => {
  const [createPointTransaction, { loading, error }] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);

  const requestPayment = async (amount: number): Promise<boolean> => {
    try {
      // 환경 변수에서 storeId와 channelKey 가져오기
      const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
      const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

      if (!storeId || !channelKey) {
        onFailed("환경 변수가 설정되지 않았습니다.");
        return false;
      }

      // UUID v4로 paymentId 생성
      const paymentId = uuidv4();

      // Portone 결제 요청
      const response = await PortOne.requestPayment({
        storeId,
        channelKey,
        paymentId,
        orderName: `포인트 충전 ${amount.toLocaleString()}원`,
        totalAmount: amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
      });

      // 결제 성공 여부 확인
      if (response?.code === undefined) {
        // GraphQL mutation 호출하여 서버에서 결제 상태 검증
        const result = await createPointTransaction({
          variables: {
            paymentId,
          },
        });

        if (result.data?.createPointTransactionOfLoading) {
          onSuccess();
          return true;
        } else {
          onFailed("서버 검증에 실패했습니다.");
          return false;
        }
      } else {
        onFailed("결제가 취소되었거나 실패했습니다.");
        return false;
      }
    } catch (err) {
      console.error("결제 오류:", err);
      onFailed("충전에 실패하였습니다.");
      return false;
    }
  };

  return {
    requestPayment,
    status: loading ? "loading" : "idle",
    loading,
    error: error as Error | null,
  };
};
