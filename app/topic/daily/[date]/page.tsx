import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Title } from "./Title";

interface Params {
  date: string;
}

export default async function DailyComponent({
  params,
}: {
  params: Promise<Params>;
}) {
  const { date } = await params;
  const payload = {
    range: "daily",
    date,
  };
  const queryParams = new URLSearchParams(payload).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/google/topics?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const topics = await response.json();

  return (
    <div>
      <Title />
      <p className="leading-7 [&:not(:first-child)]:mt-2 mb-6">
        아래 토픽을 선택하면 관련 게시물을 확인 할 수 있습니다.
      </p>
      {topics && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>순위</TableHead>
              <TableHead>topic</TableHead>
              <TableHead>관련 topic</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics?.map(
              (
                topic: {
                  topic: string;
                  relatedTopics: string[];
                },
                index: number
              ) => (
                <TableRow key={index}>
                  <TableCell>
                    <a href={`/board/${topic.topic}`}>{index + 1}</a>
                  </TableCell>
                  <TableCell>
                    <a href={`/board/${topic.topic}`}>{topic.topic}</a>
                  </TableCell>
                  <TableCell>
                    <a href={`/board/${topic.topic}`}>
                      {topic.relatedTopics.slice(0, 5).join(", ")}
                      {topic.relatedTopics.length > 5 && " ..."}
                    </a>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
