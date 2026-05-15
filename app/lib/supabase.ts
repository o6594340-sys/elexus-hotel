import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export type RequestStatus = "new" | "in_progress" | "done";

export interface HotelRequest {
  id: string;
  hotel_id: string;
  room: string;
  type: string;
  detail: string;
  status: RequestStatus;
  created_at: string;
}
