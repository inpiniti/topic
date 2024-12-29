import { supabase } from "./supabaseClient";
import dayjs from "dayjs";

const get = async ({ date = dayjs().format("YYYY-MM-DD") }) => {
  const { data, error } = await supabase
    .schema("topic")
    .from("monthly")
    .select("json")
    .eq("date", date);

  if (error) {
    throw new Error(
      `Error fetching data from Supabase : ${JSON.stringify(error)}`
    );
  }

  return data;
};

const post = async ({ date = dayjs().format("YYYY-MM-DD"), json = {} }) => {
  // json 이 빈 경우는 저장하지 않음
  if (Object.keys(json).length === 0) {
    throw new Error("Empty json data");
  }

  const { error } = await supabase.schema("topic").from("monthly").upsert({
    date,
    json,
  });

  if (error) {
    throw new Error(
      `Error fetching data from Supabase : ${JSON.stringify(error)}`
    );
  }
};

const monthly = {
  get,
  post,
};

export default monthly;
