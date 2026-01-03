import { PenSquare, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { Note } from "../types/note";

const NoteCard = ({
  note,
  setNotes,
}: {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (err) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", err);
    }
  };
  return (
    <Link to={`/note/${note._id}`}>
      <div className="card bg-base-100 border border-base-content/10 group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="card-body relative z-10">
          <div className="flex items-start justify-between gap-2">
            <h3 className="card-title text-base-content flex-1 group-hover:text-primary transition-colors">
              {note.title}
            </h3>
            <div className="badge badge-primary badge-sm opacity-0 group-hover:opacity-100 transition-opacity">
              View
            </div>
          </div>
          <p className="text-base-content/60 line-clamp-3 text-sm leading-relaxed mt-2">
            {note.content}
          </p>
          <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-content/5">
            <span className="text-xs text-base-content/40 font-medium">
              {formatDate(new Date(note.updatedAt))}
            </span>
            <div className="flex items-center gap-2 relative z-20">
              <PenSquare className="size-4 text-base-content/40 group-hover:text-primary transition-colors" />
              <button
                className="btn btn-ghost btn-xs text-error hover:bg-error/20 hover:text-error transition-colors relative"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
