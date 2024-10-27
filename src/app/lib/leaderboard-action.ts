"use server";
import { createClient } from "@/app/utils/supabase/server";

export interface LeaderBoard {
    id: string;
    username: string;
    lesson_completed: number;
}

export const getleaderboard = async (): Promise<LeaderBoard[]> => {
  const results: LeaderBoard[] = [];
  const supabase = createClient();
  const { data, error } = await supabase
  .from('profiles')
  .select(`
    id, full_name,
    profile_lessons (
      lesson_id
    )
  `)
  if (error) {
    console.error(error);
    return [];
  }

  data.map((user) => {

    results.push({
      id: user.id,
      username: user.full_name,
      lesson_completed: user.profile_lessons.length,
    });
  });
  console.log(results);
  return results;
}