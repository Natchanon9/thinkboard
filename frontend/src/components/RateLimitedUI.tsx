import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-warning/10 via-warning/5 to-warning/10 border border-warning/20 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
          <div className="flex-shrink-0 bg-gradient-to-br from-warning/30 to-warning/20 p-5 rounded-2xl mb-4 md:mb-0 md:mr-6 shadow-lg shadow-warning/10">
            <ZapIcon className="size-12 text-warning animate-pulse" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className="text-2xl font-bold text-base-content flex items-center justify-center md:justify-start gap-2">
              Rate Limit Reached
            </h3>
            <p className="text-base-content/80 font-medium">
              You've made too many requests in a short period. Please wait a moment.
            </p>
            <p className="text-sm text-base-content/60">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;