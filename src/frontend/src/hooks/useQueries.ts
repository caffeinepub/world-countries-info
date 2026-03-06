import { useQuery } from "@tanstack/react-query";
import type { Country } from "../backend.d";
import { useActor } from "./useActor";

export function useGetCountries() {
  const { actor, isFetching } = useActor();
  return useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCountries();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchCountries(term: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Country[]>({
    queryKey: ["countries", "search", term],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchCountries(term);
    },
    enabled: !!actor && !isFetching && term.length > 0,
    staleTime: 30 * 1000,
  });
}
