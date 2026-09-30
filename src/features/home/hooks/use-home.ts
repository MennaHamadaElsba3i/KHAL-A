import { useQuery } from "@tanstack/react-query";
import { homeService } from "@/services/home.service";
import { HomeApiResponse } from "@/types/home";

export const HOME_QUERY_KEY = ["home"] as const;

export function useHome() {
  return useQuery<HomeApiResponse, Error>({
    queryKey: HOME_QUERY_KEY,
    queryFn: () => homeService.getHome(),
    staleTime: 5 * 60 * 1000,
  });
}
