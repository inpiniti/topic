import { useQuery } from "react-query";

export const fetchRanking = async () => {
  const response = await fetch("/api/google");
  if (!response.ok) {
    throw new Error("Failed to fetch ranking data");
  }
  return response.json();
};

export const useRankingQuery = () => {
  return useQuery({
    queryKey: ["ranking"],
    queryFn: fetchRanking,
    enabled: true,
  });
};
