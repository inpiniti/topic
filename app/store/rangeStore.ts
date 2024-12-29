import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RangeState {
  range: "daily" | "realtime";
  setRange: (range: string) => void;
}

const useRangeStore = create<RangeState>()(
  devtools(
    (set) => ({
      range: "realtime", // daily, realtime
      setRange: (range: "daily" | "realtime") => set({ range }),
    }),
    {
      name: "range",
    }
  )
);

export default useRangeStore;
