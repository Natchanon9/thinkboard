import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 max-w-lg mx-auto text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-3xl"></div>
        <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-10 backdrop-blur-sm border border-primary/20">
          <NotebookIcon className="size-16 text-primary mx-auto" />
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold text-base-content">No notes yet</h3>
        <p className="text-base-content/60 leading-relaxed px-4">
          Ready to organize your thoughts? Create your first note to get started on your journey.
        </p>
      </div>
      <Link to="/create" className="btn btn-primary btn-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow mt-4">
        <NotebookIcon className="size-5" />
        Create Your First Note
      </Link>
    </div>
  );
};
export default NotFound;