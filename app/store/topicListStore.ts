import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTopicListStore = create()(
  devtools(
    (set) => ({
      topicList: [],
      setTopicList: (topicList: string[]) =>
        set({
          topicList,
        }),
    }),
    {
      name: "topicList",
    }
  )
);
