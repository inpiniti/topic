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
      date: dayjs(),
      setDate: (date: Date) =>
        set({
          date,
        }),
    }),
    {
      name: "date",
    }
  )
);
