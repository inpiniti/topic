'use client';

import useTopicListStore from '@/app/store/topicListStore';

export default function Api({ params }) {
  const { topicList, setTopicList } = useTopicListStore.getState();

  const payload = {
    range: 'realtime',
  };

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
  setTopicList(topics);

  return <div>sdf</div>;
}
