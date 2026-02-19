import { useQuery, ApolloError } from "@apollo/client";
import { FETCH_TRAVELPRODUCTS } from "@/graphql/queries/product";
import { useState } from "react";

interface Seller {
  _id: string;
  name: string;
  picture: string;
}

interface TravelproductAddress {
  address?: string | null;
  addressDetail?: string | null;
  zipcode?: string | null;
  lat?: number | null;
  lng?: number | null;
}

interface TravelProduct {
  _id: string;
  name: string;
  remarks: string;
  tags: string[];
  pickedCount: number;
  price: number;
  seller: Seller;
  images: string[];
  travelproductAddress?: TravelproductAddress | null;
  createdAt: string;
}

interface FetchTravelproductsResponse {
  fetchTravelproducts: TravelProduct[];
}

interface UseFetchTravelproductsVariables {
  isSoldout?: boolean;
  search?: string;
  page?: number;
}

interface UseFetchTravelproductsResult {
  data: FetchTravelproductsResponse | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  onNext: () => Promise<void>;
  hasMore: boolean;
}

export const useFetchTravelproducts = (
  variables: UseFetchTravelproductsVariables = {}
): UseFetchTravelproductsResult => {
  const [hasMore, setHasMore] = useState(true);
  const {
    data,
    loading,
    error,
    fetchMore: apolloFetchMore,
  } = useQuery<FetchTravelproductsResponse>(FETCH_TRAVELPRODUCTS);

  const onNext = async () => {
    if (data === undefined) return;

    await apolloFetchMore({
      variables: {
        page: Math.ceil((data.fetchTravelproducts.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchTravelproducts: [
            ...(prev.fetchTravelproducts || []),
            ...(fetchMoreResult.fetchTravelproducts || []),
          ],
        };
      },
    });
  };

  return { data, loading, error, onNext, hasMore };
};
