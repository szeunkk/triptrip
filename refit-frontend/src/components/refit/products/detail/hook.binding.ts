import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_TRAVELPRODUCT } from "@/graphql/queries/product";

interface TravelproductAddress {
  address?: string | null;
  addressDetail?: string | null;
  zipcode?: string | null;
  lat?: number | null;
  lng?: number | null;
}

interface Seller {
  name: string;
  picture?: string | null;
}

interface FetchTravelproductData {
  fetchTravelproduct: {
    _id: string;
    name: string;
    remarks: string;
    contents: string;
    price?: number | null;
    tags?: string[] | null;
    images?: string[] | null;
    pickedCount?: number | null;
    soldAt?: string | null;
    travelproductAddress?: TravelproductAddress | null;
    seller?: Seller | null;
    createdAt?: string | null;
  };
}

interface FetchTravelproductVariables {
  travelproductId: string;
}

export default function useFetchTravelproduct() {
  const params = useParams();
  const productId = params.productId as string;

  const { data, loading, error } = useQuery<FetchTravelproductData, FetchTravelproductVariables>(
    FETCH_TRAVELPRODUCT,
    {
      variables: {
        travelproductId: productId,
      },
      skip: !productId,
    }
  );

  return { data, loading, error };
}
