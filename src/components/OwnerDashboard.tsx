import { useState } from "react";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow } from "@/lib/types";
import { getWorkflows, saveWorkflow, updateWorkflow, deleteWorkflow } from "@/lib/store";
import { toast } from "sonner";

export default function OwnerDashboard() {
  const [workflows, setWorkflows] = useState<Workflow[]>(getWorkflows());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", price: 0 });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const refresh = () => setWorkflows(getWorkflows());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title is required"); return; }

    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      price: form.price,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : "",
      videoUrl: videoFile ? URL.createObjectURL(videoFile) : undefined,
      videoFileName: videoFile?.name,
      videoFileSize: videoFile?.size,
      createdAt: new Date().toISOString(),
    };

    saveWorkflow(newWorkflow);
    toast.success("Workflow added!");
    setForm({ title: "", description: "", price: 0 });
    setImageFile(null);
    setVideoFile(null);
    setShowForm(false);
    refresh();
  };

  const handleUpdate = (id: string) => {
    updateWorkflow(id, { description: form.description, price: form.price, title: form.title });
    toast.success("Updated!");
    setEditingId(null);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteWorkflow(id);
    toast.success("Deleted");
    refresh();
  };

  const startEdit = (w: Workflow) => {
    setEditingId(w.id);
    setForm({ title: w.title, description: w.description, price: w.price });
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes > 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
    return `${(bytes / 1e6).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Owner Dashboard</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Workflow
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Upload New Workflow</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Workflow title" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the workflow" />
              </div>
              <div>
                <Label>Price ($)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Image</Label>
                <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                {imageFile && <p className="text-xs text-muted-foreground mt-1">{imageFile.name} ({formatSize(imageFile.size)})</p>}
              </div>
              <div>
                <Label>Video</Label>
                <Input type="file" accept="video/mp4,video/mov,video/avi,video/x-matroska" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
                {videoFile && <p className="text-xs text-muted-foreground mt-1">{videoFile.name} ({formatSize(videoFile.size)})</p>}
              </div>
              <Button type="submit">Submit Workflow</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {workflows.map((w) => (
          <Card key={w.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              {editingId === w.id ? (
                <div className="flex-1 space-y-2">
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdate(w.id)} className="gap-1"><Save className="h-3 w-3" /> Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}><X className="h-3 w-3" /> Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <h4 className="font-semibold">{w.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{w.description}</p>
                    <span className="text-sm font-bold text-primary">${w.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(w)} className="gap-1"><Edit2 className="h-3 w-3" /> Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(w.id)} className="gap-1"><Trash2 className="h-3 w-3" /> Delete</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
