import { useQuery } from "react-query";
import useRangeStore from "../store/rangeStore";
import { useDateStore } from "../store/dateStore";
import dayjs from "dayjs";

export const fetchTopic = async ({
  range,
  date,
}: {
  range: string;
  date: string;
}) => {
  const payload = {
    range,
    date,
  };
  const queryParams = new URLSearchParams(payload).toString();
  const response = await fetch(`/api/google/topics?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch ranking data");
  }
  return response.json();
};

export const useTopicQuery = () => {
  const { range } = useRangeStore();
  const { date } = useDateStore();
  return useQuery({
    queryKey: ["topic", range, date],
    queryFn: () =>
      fetchTopic({
        range,
        date: dayjs(date).format("YYYY-MM-DD"),
      }),
    enabled: !!range && !!date,
    retry: 0,
  });
};
