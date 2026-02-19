import { useQuery, ApolloError } from "@apollo/client";
import { FETCH_TRAVELPRODUCTS } from "@/graphql/queries/product";

interface Seller {
  _id: string;
  name: string;
  picture: string;
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
  fetchMore: (page: number) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useFetchTravelproducts = (
  variables: UseFetchTravelproductsVariables = {}
): UseFetchTravelproductsResult => {
  const { data, loading, error, fetchMore: apolloFetchMore, refetch: apolloRefetch } = useQuery<FetchTravelproductsResponse>(
    FETCH_TRAVELPRODUCTS,
    {
      variables: {
        isSoldout: variables.isSoldout,
        search: variables.search,
        page: variables.page,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const fetchMore = async (page: number) => {
    await apolloFetchMore({
      variables: {
        isSoldout: variables.isSoldout,
        search: variables.search,
        page,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          fetchTravelproducts: [
            ...(prev.fetchTravelproducts || []),
            ...(fetchMoreResult.fetchTravelproducts || []),
          ],
        };
      },
    });
  };

  const refetch = async () => {
    await apolloRefetch({
      isSoldout: variables.isSoldout,
      search: variables.search,
      page: 1,
    });
  };

  return { data, loading, error, fetchMore, refetch };
};
