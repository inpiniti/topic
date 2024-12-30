"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDateStore } from "./store/dateStore";
import dayjs from "dayjs";

export const Daily = () => {
  const router = useRouter();
  const { date } = useDateStore();

  const navigate = () => {
    router.push(`/topic/daily/${dayjs(date).format("YYYY-MM-DD")}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <Calendar />
          Daily 토픽
        </CardTitle>
        <CardDescription>
          특정날짜에 검색이 많이 되었던 토픽입니다.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" onClick={navigate}>
          <ArrowRight /> 접속
        </Button>
      </CardFooter>
    </Card>
  );
};
