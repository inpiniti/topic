'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDateStore } from './store/dateStore';
import dayjs from 'dayjs';
import useRangeStore from './store/rangeStore';
import { useMemo } from 'react';
import { useTopicQuery } from './query/topicQuery';
import { useRouter } from 'next/navigation';

export default function Home() {
  return <RankingComponent />;
}

const RankingComponent = () => {
  const { data: topics, error, isLoading } = useTopicQuery();
  const { range } = useRangeStore();
  const { date } = useDateStore();
  const router = useRouter();

  const displayTitle = useMemo(() => {
    switch (range) {
      case 'daily':
        return dayjs(date).format('YYYY-MM-DD');
      case 'realtime':
        return '실시간';
    }
  }, [date, range]);

  // 게시판으로 이동
  const goToBoard = (topic: string) => {
    router.push(`/board/${topic}`);
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {displayTitle} TOPIC
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-2 mb-6">
        아래 토픽을 선택하면 관련 게시물을 확인 할 수 있습니다.
      </p>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {JSON.stringify(error)}</div>}
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
                <TableRow key={index} onClick={() => goToBoard(topic.topic)}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{topic.topic}</TableCell>
                  <TableCell>
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
};
