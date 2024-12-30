"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export const RealTime = () => {
  const router = useRouter();

  const navigate = () => {
    router.push(`/topic/realtime`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <Search />
          실시간 토픽
        </CardTitle>
        <CardDescription>
          실시간 검색이 많이 되고 있는 토픽입니다.
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
