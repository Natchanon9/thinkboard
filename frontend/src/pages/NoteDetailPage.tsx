import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import type { Note } from "../types/note";

const NoteDetailPage = () => {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    const fetchNoteById = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        console.log("Error getting note:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNoteById();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", err);
    }
  };
  const handleSave = async () => {
    if (!note?.title.trim() || !note?.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSaving(true);
    try {
      const res = await api.put(`/notes/${id}`, {
        title: note?.title,
        content: note?.content,
      });
      setNote(res.data);
      toast.success("Note updated successfully");
      navigate(`/`);
    } catch (err) {
      console.log("Error updating note:", err);
      toast.error("Failed to update note");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <LoaderIcon className="animate-spin size-12 text-primary" />
          <p className="mt-4 text-base-content/60">Loading note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-base-content/60">Note not found</p>
          <Link to="/" className="btn btn-primary mt-4">
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="btn btn-ghost group">
              <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline hover:bg-error/10"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100 border border-base-content/5 shadow-2xl shadow-primary/5">
            <div className="card-body p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-base-content mb-2">Edit Note</h2>
                <p className="text-base-content/60">Update your thoughts</p>
              </div>
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter note title"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                    className="input input-bordered focus:input-primary transition-colors"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <textarea
                    placeholder="Enter note content"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                    className="textarea textarea-bordered focus:textarea-primary h-48 resize-none transition-colors"
                  />
                </div>
                <div className="card-actions justify-end pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                    disabled={isSaving}
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    {isSaving ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
