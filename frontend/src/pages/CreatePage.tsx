import { Axios } from "axios";
import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const res = await api.post("/notes", {
        title,
        content,
      });
      if (res.status !== 201) {
        throw new Error("Failed to create note");
      }
      toast.success("Note created successfully");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error: Axios | any) {
      console.error("Error creating note:", error);
      if (error.response.status === 429) {
        toast.error("Rate limit exceeded. Please try again later.", {
          duration: 4000,
          icon: "⚠️",
        });
        return;
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to={"/"} className="btn btn-ghost mb-8 group">
          <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform" />
          Back to Notes
        </Link>

        <div className="card bg-base-100 border border-base-content/5 shadow-2xl shadow-primary/5">
          <div className="card-body p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-base-content mb-2">Create New Note</h2>
              <p className="text-base-content/60">Capture your thoughts and ideas</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a descriptive title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered focus:input-primary transition-colors"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea textarea-bordered focus:textarea-primary h-48 resize-none transition-colors"
                />
              </div>
              <div className="card-actions justify-end pt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Note"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
