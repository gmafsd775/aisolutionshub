import { supabase } from "./supabase";

export async function getWorkflows() {
  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function getWorkflowById(id: string) {
  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : undefined;
}

export async function saveWorkflow(workflow: {
  title: string;
  description: string;
  price: number;
  imageFile?: File | null;
  videoFile?: File | null;
}) {
  let imageUrl = "";
  let videoUrl = "";

  if (workflow.imageFile) {
    imageUrl = await uploadFile(workflow.imageFile, "images");
  }
  if (workflow.videoFile) {
    videoUrl = await uploadFile(workflow.videoFile, "videos");
  }

  const { error } = await supabase.from("workflows").insert({
    title: workflow.title,
    description: workflow.description,
    price: workflow.price,
    image_url: imageUrl,
    video_url: videoUrl,
  });
  if (error) throw error;
}

export async function updateWorkflow(
  id: string,
  updates: { title?: string; description?: string; price?: number }
) {
  const { error } = await supabase
    .from("workflows")
    .update({
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.description !== undefined && { description: updates.description }),
      ...(updates.price !== undefined && { price: updates.price }),
    })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteWorkflow(id: string) {
  const { error } = await supabase.from("workflows").delete().eq("id", id);
  if (error) throw error;
}

async function uploadFile(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from("workflow-media")
    .upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("workflow-media").getPublicUrl(path);
  return data.publicUrl;
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

function mapRow(row: any) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: Number(row.price),
    imageUrl: row.image_url || "",
    videoUrl: row.video_url || "",
    createdAt: row.created_at,
  };
}
