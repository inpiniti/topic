import { supabase } from './supabaseClient';

type Board = {
  id?: number;
  name: string;
  title: string;
  content: string;
  author: string;
  created_at?: string;
  views?: number;
};

const get = async ({ name, id }: { name?: string; id?: number }) => {
  const query = supabase.schema('topic').from('board').select('*');

  if (name) {
    query.eq('name', name);
  } else if (id) {
    query.eq('id', id);
  } else {
    throw new Error('Either name or id must be provided');
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(
      `Error fetching data from Supabase : ${JSON.stringify(error)}`
    );
  }

  return data;
};

const post = async (board: Board) => {
  const { data, error } = await supabase
    .schema('topic')
    .from('board')
    .upsert(board);

  if (error) {
    throw new Error(
      `Error fetching data from Supabase : ${JSON.stringify(error)}`
    );
  }

  return data;
};

const board = {
  get,
  post,
};

export default board;
