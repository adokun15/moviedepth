
import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpiredDate = localStorage.getItem("MovieDepthTokenExpiration"); //string
  const expiredDate = new Date(storedExpiredDate);
  const now = new Date(); //present Date

  const duration = expiredDate.getTime() - now.getTime();

  return duration || "";
}
export function getToken() {
  const token = localStorage.getItem("MovieDepthToken");
  //  const token = localStorage.getItem("MovieDepthToken");

  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "expired";
  }
  return token;
}

export function getSession() {
  const session = localStorage.getItem("MovieDepthUser");
  const sessionId = JSON.parse(session);
  if (!session) {
    return null;
  }

  return sessionId.userId;
}
export function tokenLoader() {
  return getToken();
}

export function checkAuthLoader() {
  const token = getToken();

  if (!token) {
    return redirect("/");
  }

  return null;
}
