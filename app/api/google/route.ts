// Disable TLS certificate verification (Development Only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextRequest, NextResponse } from "next/server";
//import googleTrends from "google-trends-api";

import googleTrends from "./index";

import supabase from "@/app/supabase";
import dayjs from "dayjs";

const geo = {
  한국: "KR",
  미국: "US",
  일본: "JP",
  전체: "",
};

export async function GET(request: NextRequest) {
  // req 에서 날짜를 받아서 조회
  const date =
    request.nextUrl.searchParams.get("date") || dayjs().format("YYYY-MM-DD");
  // req 에서 날짜의 범위 가량 daily, monthly, yearly
  const range = request.nextUrl.searchParams.get("range") || "daily";
  const { startTime } = getTime({ date, range });

  // 디비에서 먼저 조회
  let res = null;
  switch (range) {
    case "daily":
      res = await supabase.daily.get({
        date: dayjs(startTime).format("YYYY-MM-DD"),
      });
      break;
    case "monthly":
      res = await supabase.monthly.get({
        date: dayjs(startTime).format("YYYY-MM-DD"),
      });
      break;
    case "yearly":
      res = await supabase.yearly.get({
        date: dayjs(startTime).format("YYYY-MM-DD"),
      });
      break;
    default:
      res = await supabase.daily.get({
        date,
      });
      break;
  }

  if (res.length > 0) {
    return NextResponse.json(res[0].json);
  } else {
    // 없는 경우 트렌드 조회
    const trand = await getTrends({
      date,
      range,
    });
    // 트렌드 저장
    switch (range) {
      case "daily":
        await supabase.daily.post({
          date: dayjs(startTime).format("YYYY-MM-DD"),
          json: trand,
        });
        break;
      case "monthly":
        await supabase.monthly.post({
          date: dayjs(startTime).format("YYYY-MM-DD"),
          json: trand,
        });
        break;
      case "yearly":
        await supabase.yearly.post({
          date: dayjs(startTime).format("YYYY-MM-DD"),
          json: trand,
        });
        break;
    }

    return NextResponse.json(trand);
  }
}

// 트랜드 조회
const getTrends = async ({ date, range }: { date: string; range: string }) => {
  try {
    const ani_list = await supabase.ani_list.get();
    const ani_name_list = ani_list.map((item) => item.name);

    // ani 목록
    const keywords = [...ani_name_list];

    // 5개씩 비교 하고
    // 비교한 녀석들 중에서도 5개씩 비교
    // 마지막 한 키워드가 남을때까지 반복
    let maxKeywords = [];
    let nextKeywords = keywords;
    while (nextKeywords.length > 0) {
      // 현재 키워드
      const currentKeywords = nextKeywords.slice(0, 5);
      // 남은 키워드
      nextKeywords = nextKeywords.filter(
        (keyword) =>
          !currentKeywords.some((current) => keyword.includes(current))
      );
      // 인기있는 키워드
      const keyword = await getKeyword({
        keywords: currentKeywords,
        date,
        range,
      });

      console.log("인기있는 키워드", keyword);

      if (keyword) maxKeywords.push(keyword);

      // 남은 키워드가 없으면 maxKeywords 가 1개 이상이면
      // nextKeywords 에 maxKeywords를 추가하고,
      // maxKeywords 를 초기화
      if (nextKeywords.length === 0 && maxKeywords.length > 1) {
        nextKeywords = [...maxKeywords];
        maxKeywords = [];
      }
    }

    // 마지막 키워드
    const listKeyword = maxKeywords[0];

    nextKeywords = keywords;

    // 결과 값
    let result = {};

    while (nextKeywords.length > 0) {
      // 현재 키워드
      const currentKeywords = nextKeywords.slice(0, 4);
      currentKeywords.push(listKeyword);

      // 남은 키워드
      nextKeywords = nextKeywords.filter(
        (keyword) =>
          !currentKeywords.some((current) => keyword.includes(current))
      );

      // 인기있는 키워드
      const averages =
        (await getAverages({
          keywords: currentKeywords,
          date,
          range,
        })) || [];

      result = { ...result, ...averages };
    }

    return result;
  } catch (error) {
    console.error("Error fetching Google Trends data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// 구글 트렌드로 5개 키워드씩 비교해서 averages 리턴
const getKeyword = async ({
  keywords,
  date,
  range,
}: {
  keywords: string[];
  date: string;
  range: string;
}) => {
  const { startTime, endTime } = getTime({ date, range });
  const payload = {
    keyword: keywords,
    startTime,
    endTime,
    geo: geo.한국,
    //category: 316,
  };

  const trendsData = await googleTrends.interestOverTime(payload);

  const parsedData = JSON.parse(trendsData);

  const averages = parsedData?.default?.averages;
  // averages [1,2,3,4,5]
  // keywords ['a','b','c','d','e']
  // 라면 e 를 max 에 넣게

  let maxKeyword = "";
  let maxAverage = -Infinity;

  averages.forEach((avg: number, index: number) => {
    if (avg > maxAverage) {
      maxAverage = avg;
      maxKeyword = keywords[index];
    }
  });

  return maxKeyword;
};

// 구글 트렌드로 5개 키워드씩 비교해서 averages 리턴
const getAverages = async ({
  keywords,
  date,
  range,
}: {
  keywords: string[];
  date: string;
  range: string;
}) => {
  const { startTime, endTime } = getTime({ date, range });
  const payload = {
    keyword: keywords,
    startTime,
    endTime,
    geo: geo.한국,
    //category: 316,
  };

  const trendsData = await googleTrends.interestOverTime(payload);

  const parsedData = JSON.parse(trendsData);
  const averages = parsedData?.default?.averages;

  const result: { [key: string]: number } = {};
  for (let i = 0; i < keywords.length; i++) {
    result[keywords[i]] = averages[i];
  }

  return result;
};

// range 와 date 에 따라 startTime, endTime
const getTime = ({ date, range }: { date: string; range: string }) => {
  const parsedDate = dayjs(date);
  switch (range) {
    case "daily":
      return {
        startTime: parsedDate.startOf("day").toDate(), // 00:00:00 부터
        endTime: parsedDate.endOf("day").toDate(), // 23:59:59 까지
      };
    case "monthly":
      return {
        startTime: parsedDate.startOf("month").toDate(), // 1일 00:00:00 부터
        endTime: parsedDate.endOf("month").toDate(), // 말일 23:59:59 까지
      };
    case "yearly":
      return {
        startTime: parsedDate.startOf("year").toDate(), // 1월 1일 00:00:00 부터
        endTime: parsedDate.endOf("year").toDate(), // 12월 31일 23:59:59 까지
      };
    default:
      throw new Error("Invalid range");
  }
};
