"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Post() {
  const params = useParams();
  const router = useRouter();

  const { name } = params;
  const decodedName = decodeURIComponent(String(name));

  const [board, setBoard] = useState({
    name: decodedName,
    title: "",
    content: "",
    author: "",
  });

  const onChange = (data: {
    name?: string;
    title?: string;
    content?: string;
    author?: string;
  }) => {
    setBoard({
      ...board,
      ...data,
    });
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {decodedName} 글쓰기
      </h1>
      <p className="leading-7">글 작성해주세요.</p>

      <div className="flex flex-col gap-4 pt-4">
        <div className="grid w-full gap-1.5">
          <Label className="font-bold">게시판명</Label>
          <Input
            type="name"
            id="name"
            value={board.name}
            onChange={(e) => {
              onChange({
                name: e.target.value,
              });
            }}
            disabled
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label className="font-bold">작성자</Label>
          <Input
            type="author"
            id="author"
            value={board.author}
            onChange={(e) => {
              onChange({
                author: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label className="font-bold">제목</Label>
          <Input
            type="title"
            id="title"
            value={board.title}
            onChange={(e) => {
              onChange({
                title: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label className="font-bold">내용</Label>
          <Textarea
            value={board.content}
            placeholder="Type your message here."
            onChange={(e) => {
              onChange({
                content: e.target.value,
              });
            }}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={goBack}>
            취소
          </Button>
          <Button>작성 완료</Button>
        </div>
      </div>
    </div>
  );
}
