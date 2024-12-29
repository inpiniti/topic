import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RangeState {
  range: "daily" | "monthly" | "yearly";
  setRange: (range: string) => void;
}

const useRangeStore = create<RangeState>()(
  devtools(
    (set) => ({
      range: "daily", // daily, monthly, yearly
      setRange: (range: "daily" | "monthly" | "yearly") => set({ range }),
    }),
    {
      name: "range",
    }
  )
);

export default useRangeStore;
