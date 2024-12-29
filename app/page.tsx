"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRankingQuery } from "./query/rankingQuery";
import { useDateStore } from "./store/dateStore";
import dayjs from "dayjs";
import useRangeStore from "./store/rangeStore";
import { useMemo } from "react";

export default function Home() {
  return <RankingComponent />;
}

const RankingComponent = () => {
  const { data: rankings, error, isLoading } = useRankingQuery();
  const { range }: { range: keyof typeof RANGE_NAME } = useRangeStore();
  const { date } = useDateStore();

  const RANGE_NAME = {
    daily: "일",
    monthly: "월",
    yearly: "년",
  };

  const formattedDate = useMemo(() => {
    switch (range) {
      case "daily":
        return dayjs(date).format("YYYY-MM-DD");
      case "monthly":
        return dayjs(date).format("YYYY-MM");
      case "yearly":
        return dayjs(date).format("YYYY");
    }
  }, [date, range]);

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {formattedDate}
        {RANGE_NAME[range]} 랭크
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-2 mb-6">
        감자 만화는 일별 랭크를 제공합니다.
      </p>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {rankings && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>순위</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>점수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(rankings)
              .map(([name, score]) => ({
                name,
                score,
              }))
              .sort((a, b) => Number(b.score) - Number(a.score))
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{String(item.score)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
