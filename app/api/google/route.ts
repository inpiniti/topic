// Disable TLS certificate verification (Development Only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextRequest, NextResponse } from "next/server";
import googleTrends from "google-trends-api";
import supabase from "@/app/supabase";
import dayjs from "dayjs";

const startTime = {
  지난30일: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  지난7일: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  지난1일: new Date(Date.now() - 1000 * 60 * 60 * 24),
};
const endTime = new Date(Date.now());

const geo = {
  한국: "KR",
  미국: "US",
  전체: "",
};

export async function GET(request: NextRequest) {
  // 디비에서 먼저 조회
  const res = await supabase.daily.get({ date: dayjs().format("YYYY-MM-DD") });

  if (res.length > 0) {
    return NextResponse.json(res[0].json);
  } else {
    // 없는 경우 트렌드 조회
    const trand = await getTrends();
    // 트렌드 저장
    await supabase.daily.post({ json: trand });

    return NextResponse.json(trand);
  }
}

// 트랜드 조회
const getTrends = async () => {
  try {
    const ani_list = await supabase.ani_list.get();
    const ani_name_list = ani_list.map((item) => item.name);

    // ani 목록
    const keywords = [...ani_name_list];
    console.log("keywords", keywords);

    // 5개씩 비교 하고
    // 비교한 녀석들 중에서도 5개씩 비교
    // 마지막 한 키워드가 남을때까지 반복
    let maxKeywords = [];
    let nextKeywords = keywords;
    while (nextKeywords.length > 0) {
      console.log("nextKeywords", nextKeywords);
      // 현재 키워드
      const currentKeywords = nextKeywords.slice(0, 5);
      console.log("currentKeywords", currentKeywords);
      // 남은 키워드
      nextKeywords = nextKeywords.filter(
        (keyword) =>
          !currentKeywords.some((current) => keyword.includes(current))
      );
      // 인기있는 키워드
      const keyword = await getKeyword(currentKeywords);
      maxKeywords.push(keyword);

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
      const averages = (await getAverages(currentKeywords)) || [];

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
const getKeyword = async (keywords: string[]) => {
  const payload = {
    keyword: keywords,
    startTime: startTime.지난1일,
    endTime,
    geo: geo.미국,
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
const getAverages = async (keywords: string[]) => {
  const payload = {
    keyword: keywords,
    startTime: startTime.지난1일,
    endTime,
    geo: geo.미국,
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
