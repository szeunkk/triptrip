import { useMutation } from "@apollo/client";
import { CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING } from "@/graphql/mutations/point";
import { Modal } from "antd";

interface UseBuyProductResult {
  buyProduct: (useritemId: string) => Promise<boolean>;
  loading: boolean;
  error: Error | null;
}

export const useBuyProduct = (
  onSuccess: () => void,
  onFailed: (message: string) => void
): UseBuyProductResult => {
  const [createPointTransactionOfBuyingAndSelling, { loading, error }] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );

  const buyProduct = async (useritemId: string): Promise<boolean> => {
    try {
      const result = await createPointTransactionOfBuyingAndSelling({
        variables: {
          useritemId,
        },
      });

      if (result.data?.createPointTransactionOfBuyingAndSelling) {
        onSuccess();
        return true;
      } else {
        onFailed("상품 구매에 실패했습니다.");
        return false;
      }
    } catch (err) {
      console.error("상품 구매 오류:", err);
      const errorMessage = (err as Error)?.message ?? "상품 구매에 실패했습니다.";
      onFailed(errorMessage);
      return false;
    }
  };

  return {
    buyProduct,
    loading,
    error: error as Error | null,
  };
};
