import { useEffect, useState } from "react";
import { get } from "../utilities/fetch";

export type Session = {
  id: string;
  name: string;
  lunchDate: Date;
  creatorName: string;
  creator: Boolean;
  active: Boolean;
  winningRestaurantName: string;
};

export default function SessionsTable() {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    get("/api/v1/session").then(async (res) => {
      if (res.ok) {
        setSessions(await res.json());
      }
    });
  }, []);

  return (
    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Lunch Date
              </th>
              <th scope="col" className="px-6 py-3">
                Creator
              </th>
              <th scope="col" className="px-6 py-3">
                Action / Result
              </th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr
                key={session.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {session.name}
                </th>
                <td className="px-6 py-4">
                  {`${new Date(session.lunchDate).getDate()}/${
                    new Date(session.lunchDate).getMonth() + 1
                  }/${new Date(session.lunchDate).getFullYear()}`}
                </td>
                <td className="px-6 py-4">{session.creatorName}</td>
                <td className="px-6 py-4 text-center">
                  {session.active ? (
                    <a
                      href={`/sessions/${session.id}`}
                      type="button"
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Vote
                    </a>
                  ) : session.winningRestaurantName ? (
                    <span>{session.winningRestaurantName}</span>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
