// src/store/day.ts
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// dayjs 플러그인 확장
dayjs.extend(isSameOrAfter);

interface DateState {
  date: Date;
  setDate: (date: Date) => void;
}

export const useDateStore = create<DateState>()(
  devtools(
    (set) => ({
      date: dayjs().subtract(1, "day").toDate(),
      setDate: (date: Date) =>
        set({
          date: dayjs(date).isSameOrAfter(dayjs(), "day")
            ? dayjs().subtract(1, "day").toDate()
            : date,
        }),
    }),
    {
      name: "date",
    }
  )
);
