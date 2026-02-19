import { useQuery } from "@apollo/client";
import { FETCH_TRAVELPRODUCTS_OF_THE_BEST } from "@/graphql/queries/product";

interface TravelProduct {
  _id: string;
  name: string;
  remarks: string;
  price: number;
  pickedCount: number;
  images: string[];
}

interface FetchTravelProductsOfTheBestData {
  fetchTravelproductsOfTheBest: TravelProduct[];
}

export function useProductsListBest() {
  const { data, loading, error } = useQuery<FetchTravelProductsOfTheBestData>(
    FETCH_TRAVELPRODUCTS_OF_THE_BEST
  );

  return { data, loading, error };
}

