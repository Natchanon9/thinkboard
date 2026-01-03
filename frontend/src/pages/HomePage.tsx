import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import type { Note } from "../types/note";
import api from "../lib/axios";
import NotFound from "../components/NotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error: AxiosError | any) {
        console.log("Error fetching notes", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="mt-4 text-base-content/60">Loading your notes...</p>
          </div>
        )}
        {notes.length === 0 && !isRateLimited && !isLoading && (
          <NotFound />
        )}
        {notes.length > 0 && !isRateLimited && !isLoading && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-base-content mb-2">Your Notes</h2>
              <p className="text-base-content/60">Manage and organize your thoughts</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
