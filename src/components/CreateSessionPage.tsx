import { useRef, useState } from "react";
import { post } from "../utilities/fetch";

export default function CreateSessionPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const lunchDateDateRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<Set<string>>(new Set());

  const handleCreateSession = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const name = nameRef.current?.value || "";
    const lunchDate = lunchDateDateRef.current?.value || "";

    if (!name) {
      setError(error.add("Missing lunch session name"));
      return;
    }

    if (!lunchDate) {
      setError(error.add("Missing lunch date"));
      return;
    }

    const formattedDate = new Date(lunchDate);
    formattedDate.setHours(formattedDate.getHours() + 8);

    post("/api/v1/session/create", {
      name,
      lunchDate: formattedDate.toISOString(),
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          lunchgowhere
        </span>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a lunch session
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Session Name
                </label>
                <input
                  name="name"
                  id="name"
                  ref={nameRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lunch Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  ref={lunchDateDateRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="w-full text-center">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  onClick={handleCreateSession}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Create Session
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
