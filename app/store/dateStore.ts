// src/store/day.ts
import dayjs from "dayjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DateState {
  date: Date;
  setDate: (date: Date) => void;
}

export const useDateStore = create<DateState>()(
  devtools(
    (set) => ({
      date: dayjs(),
      setDate: (date: Date) => set({ date }),
    }),
    {
      name: "date",
    }
  )
);
