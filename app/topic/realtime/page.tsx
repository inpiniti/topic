import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function DailyComponent() {
  const payload = {
    range: 'realtime',
  };
  const queryParams = new URLSearchParams(payload).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/google/topics?${queryParams}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    }
  );
  const topics = await response.json();

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
        실시간 토픽
      </h1>
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
                  <TableCell href={`/board/${topic.topic}`}>
                    {index + 1}
                  </TableCell>
                  <TableCell href={`/board/${topic.topic}`}>
                    {topic.topic}
                  </TableCell>
                  <TableCell href={`/board/${topic.topic}`}>
                    {topic.relatedTopics.slice(0, 5).join(', ')}
                    {topic.relatedTopics.length > 5 && ' ...'}
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
