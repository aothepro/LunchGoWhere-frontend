import { useState, useEffect } from "react";
import { get, post } from "../utilities/fetch";
import { Session } from "./SessionsTable";
import { useNavigate, useParams } from "react-router-dom";

export default function VotePage() {
  const [session, setSession] = useState<Session>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [restaurantName, setRestaurantName] = useState<string>("");
  const { sessionId = "" } = useParams();
  const navigate = useNavigate();
  if (!sessionId) {
    navigate("/sessions");
  }
  useEffect(() => {
    get("/api/v1/session/" + sessionId).then(async (res) => {
      if (res.ok) {
        setSession(await res.json());
      }
    });

    get("/api/v1/vote/" + sessionId).then(async (res) => {
      if (res.ok) {
        const { restaurantName = "" } = await res.json().catch(() => ({}));
        setRestaurantName(restaurantName);
      }
    });
  }, [sessionId]);

  const getDateString = (lunchDate: Date | undefined) => {
    if (!lunchDate) return "";
    return `${new Date(lunchDate).getDate()}/${
      new Date(lunchDate).getMonth() + 1
    }/${new Date(lunchDate).getFullYear()}`;
  };

  const castVote = () => {
    setIsLoading(true);
    post("/api/v1/vote", {
      sessionId,
      restaurantName,
    }).finally(() => setIsLoading(false));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Session
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="sessionName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Session Name
                </label>
                <input
                  name="sessionName"
                  id="sessionName"
                  value={session?.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="lunchDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  name="lunchDate"
                  id="lunchDate"
                  value={getDateString(session?.lunchDate)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="creator"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Creator
                </label>
                <input
                  name="creator"
                  id="creator"
                  value={session?.creatorName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="restaurant"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Restaurant vote
                </label>
                <div className="flex">
                  <input
                    name="restaurant"
                    id="restaurant"
                    defaultValue={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    autoFocus
                  />
                  <div className="px-2">
                    {isLoading ? (
                      <></>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          castVote();
                        }}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Vote
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
