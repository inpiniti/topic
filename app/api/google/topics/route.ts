import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/app/supabase";
import { Agent, setGlobalDispatcher } from "undici";

const agent = new Agent({
  connect: {
    rejectUnauthorized: false,
  },
});

setGlobalDispatcher(agent);

export async function GET(request: NextRequest) {
  try {
    const date =
      request.nextUrl.searchParams.get("date") || dayjs().format("YYYY-MM-DD");
    const range = request.nextUrl.searchParams.get("range") || "daily";

    // db 조회
    const res = await supabase.daily.get({
      date,
    });

    // 데이터가 있는 경우
    if (res.length > 0) {
      // realtime 인지?
      if (range === "realtime") {
        const topic = await getTopic();
        return NextResponse.json(topic);
      } else {
        // realtime 이 아니면 db 데이터 반환
        return NextResponse.json(res[0].json);
      }
    } else {
      // 데이터가 없는경우
      // realtime 인지?
      if (range === "realtime") {
        const topic = await getTopic();
        // db 저장
        await supabase.daily.post({
          date,
          json: topic,
        });
        return NextResponse.json(topic);
      } else {
        return NextResponse.json([]);
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json([]);
    } else {
      console.error(error);
      return NextResponse.json([]);
    }
  }
}

const getTopic = async () => {
  try {
    const query = {
      rpcids: "i0OFE",
      "source-path": "/trending",
      "f.sid": "-1626868248835384540",
      bl: "boq_trends-boq-servers-frontend_20241216.04_p0",
      hl: "ko",
      _reqid: "285342",
      rt: "c",
    };

    const formData = {
      "f.req": `[[["i0OFE","[null,null,\\"KR\\",0,\\"ko\\",24,1]",null,"generic"]]]`,
      at: "AGAV78z3SsqDQln5mWj3tHQgbWwu:1735483340188",
    };

    const queryString = new URLSearchParams(query).toString();
    const body = new URLSearchParams(formData).toString();
    const url = `https://trends.google.com/_/TrendsUi/data/batchexecute?${queryString}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        authority: "trends.google.com",
        method: "POST",
        path: "/_/TrendsUi/data/batchexecute?rpcids=i0OFE&source-path=%2Ftrending&f.sid=-1626868248835384540&bl=boq_trends-boq-servers-frontend_20241216.04_p0&hl=ko&_reqid=285342&rt=c",
        scheme: "https",
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        origin: "https://trends.google.com",
        priority: "u=1, i",
        referer: "https://trends.google.com/",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-arch": '"x86"',
        "sec-ch-ua-bitness": '"64"',
        "sec-ch-ua-form-factors": '"Desktop"',
        "sec-ch-ua-full-version": '"131.0.6778.205"',
        "sec-ch-ua-full-version-list":
          '"Google Chrome";v="131.0.6778.205", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": '""',
        "sec-ch-ua-platform": '"Windows"',
        "sec-ch-ua-platform-version": '"10.0.0"',
        "sec-ch-ua-wow64": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-data":
          "CJG2yQEIprbJAQipncoBCOX7ygEIk6HLAQiJo8sBCIWgzQEIjafNAQi6yM0BCKzJzgEIxs3OAQjHz84BCMjRzgEIstPOAQjt1c4BCLPYzgEIwNjOAQjN2M4BGM/VzgE=",
        "x-same-domain": "1",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    });

    const textResponse = await response.text();

    const lines = textResponse.split("\n");

    // 네 번째 줄만 추출
    const jsonString = lines[3].trim();

    let jsonResponse = JSON.parse(jsonString);
    jsonResponse = JSON.parse(jsonResponse[0][2]);

    const result = jsonResponse[1].map(
      (
        items: [
          string,
          unknown,
          unknown,
          unknown,
          unknown,
          unknown,
          unknown,
          unknown,
          unknown,
          string[]
        ]
      ) => {
        return {
          topic: items[0] as string,
          relatedTopics: items[9] as string[],
        };
      }
    );

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
