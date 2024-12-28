import supabase from ".";

describe("Supabase Query Test", () => {
  it("ani_list", async () => {
    try {
      const data = await supabase.ani_list.get();

      // 데이터가 배열인지 확인
      expect(Array.isArray(data)).toBe(true);
      // 데이터가 정의되어 있는지 확인
      expect(data).toBeDefined();
    } catch (error) {
      expect(error).toBeNull();
    }
  });

  it.only("daily", async () => {
    try {
      const data = await supabase.daily.post("test");
      // 데이터가 정의되어 있는지 확인
      expect(data).toBeDefined();
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
