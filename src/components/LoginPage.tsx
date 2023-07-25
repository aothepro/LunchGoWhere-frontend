import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utilities/cookies";
import { JWT_COOKIE_NAME } from "../utilities/fetch";

enum ERROR_MESSAGES {
  MISSING_PASSWORD = "Password cannot be empty",
  MISSING_USERNAME = "Username cannot be empty",
  INVALID_USERNAME_PASSWORD = "Invalid Username or password",
}
export default function LoginPage() {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<string[]>([]);

  const addError = (newError: ERROR_MESSAGES) => {
    if (!errors.includes(newError)) {
      setErrors((errors) => [...errors, newError]);
    }
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrors([]);

    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    let hasErrors = false;

    if (!password) {
      addError(ERROR_MESSAGES.MISSING_PASSWORD);
      hasErrors = true;
    }

    if (!username) {
      addError(ERROR_MESSAGES.MISSING_USERNAME);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    fetch("/api/v1/auth/authenticate", requestOptions).then(async (res) => {
      if (res.ok) {
        const { accessToken = "" } = await res.json();
        setCookie(JWT_COOKIE_NAME, accessToken);
        navigate("/sessions");
      } else {
        setErrors((errors) => [
          ...errors,
          ERROR_MESSAGES.INVALID_USERNAME_PASSWORD,
        ]);
      }
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
              Login
            </h1>
            <ul className="text-red-500">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  name="username"
                  id="username"
                  ref={usernameRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full text-center">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  onClick={handleLogin}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Login
                  </span>
                </button>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do not have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
