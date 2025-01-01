import supabase from "@/app/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 데이터를 가져오려면 다음과 같이 합니다.
    const myJson = await request.text();
    console.log("myJson", myJson);

    // 현재는 하드코딩된 데이터 사용
    const payload = {
      name: "토픽주제",
      title: "글제목",
      author: "글쓴이",
      content: "글내용",
    };

    const result = await supabase.board.post(payload);

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: unknown) {
    console.error("Supabase POST Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
