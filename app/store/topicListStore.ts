import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useTopicListStore = create()(
  devtools(
    (set) => ({
      topicList: [],
      setTopicList: (topicList: string[]) =>
        set({
          topicList,
        }),
    }),
    {
      name: 'topicList',
    }
  )
);

export default useTopicListStore;
