import { getCookie } from "./cookies";

export const JWT_COOKIE_NAME = "jwt";
const Authorization = "Bearer " + getCookie(JWT_COOKIE_NAME);

export const get = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(input, {
    method: "GET",
    headers: { Authorization },
    ...init,
  });

export const post = (
  input: RequestInfo | URL,
  body: Object,
  init?: RequestInit | undefined
) =>
  fetch(input, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization },
    body: JSON.stringify(body),
    ...init,
  });
