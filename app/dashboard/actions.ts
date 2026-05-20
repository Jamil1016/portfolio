"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

type Patch = {
  status?: "not_started" | "in_progress" | "done";
  notes?: string | null;
  artifact_url?: string | null;
};

export async function updateWeekStatus(id: string, patch: Patch) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("unauthorized");

  const update: Record<string, unknown> = { ...patch, updated_at: new Date().toISOString() };
  if (patch.status === "in_progress") update.started_at = new Date().toISOString();
  if (patch.status === "done") update.completed_at = new Date().toISOString();

  const { error } = await supabase
    .from("learning_weeks")
    .update(update)
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) throw error;
  revalidatePath("/dashboard");
}
