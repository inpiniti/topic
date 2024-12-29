import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const topics = [
  {
    topic: "토픽1",
    relatedTopics: ["토픽2", "토픽3", "토픽4", "토픽5", "토픽6", "토픽7"],
  },
  {
    topic: "토픽2",
    relatedTopics: ["토픽1", "토픽3", "토픽4", "토픽5", "토픽6", "토픽7"],
  },
  {
    topic: "토픽3",
    relatedTopics: ["토픽1", "토픽2", "토픽4", "토픽5", "토픽6", "토픽7"],
  },
  {
    topic: "토픽4",
    relatedTopics: ["토픽1", "토픽2", "토픽3", "토픽5", "토픽6", "토픽7"],
  },
  {
    topic: "토픽5",
    relatedTopics: ["토픽1", "토픽2", "토픽3", "토픽4", "토픽6", "토픽7"],
  },
  {
    topic: "토픽6",
    relatedTopics: ["토픽1", "토픽2", "토픽3", "토픽4", "토픽5", "토픽7"],
  },
  {
    topic: "토픽7",
    relatedTopics: ["토픽1", "토픽2", "토픽3", "토픽4", "토픽5", "토픽6"],
  },
];

export default function Board({ params }: { params: { name: string } }) {
  const { name } = params;
  const decodedName = decodeURIComponent(name);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {decodedName} 게시판
      </h1>
      <p className="leading-7">
        아래 토픽을 선택하면 관련 게시물을 확인 할 수 있습니다.
      </p>
      <div className="flex justify-end">
        <Link href={`/board/${decodedName}/post`}>
          <Button>글 작성하기</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>순위</TableHead>
            <TableHead>topic</TableHead>
            <TableHead>관련 topic</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.map(
            (
              topic: {
                topic: string;
                relatedTopics: string[];
              },
              index: number
            ) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{topic.topic}</TableCell>
                <TableCell>
                  {topic.relatedTopics.slice(0, 5).join(", ")}
                  {topic.relatedTopics.length > 5 && " ..."}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
