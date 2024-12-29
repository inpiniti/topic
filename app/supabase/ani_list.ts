import { supabase } from "./supabaseClient";

const getListFromSupabase = async () => {
  const { data, error } = await supabase
    .schema("ani")
    .from("ani_list")
    .select("name");

  if (error) {
    throw new Error(
      `Error fetching data from Supabase : ${JSON.stringify(error)}`
    );
  }

  return data;
};

const ani_list = {
  get: getListFromSupabase,
};

export default ani_list;
