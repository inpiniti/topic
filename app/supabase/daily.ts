import { supabase } from "./supabaseClient";
import dayjs from "dayjs";

const get = async ({ date = dayjs().format("YYYY-MM-DD") }) => {
  const { data, error } = await supabase
    .schema("ani")
    .from("daily")
    .select("*")
    .eq("date", date);

  if (error) {
    throw new Error(
      `Error fetching data from Supabase : ${JSON.stringify(error)}`
    );
  }

  return data;
};

const post = async ({ date = dayjs().format("YYYY-MM-DD"), json = {} }) => {
  const { error } = await supabase.schema("ani").from("daily").upsert({
    date,
    json,
  });

  if (error) {
    throw new Error(
      `Error fetching data from Supabase : ${JSON.stringify(error)}`
    );
  }
};

const daily = {
  get,
  post,
};

export default daily;
