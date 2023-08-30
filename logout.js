import { redirect } from "react-router-dom";

export function logoutAction() {
  localStorage.removeItem("MovieDepthToken");
  localStorage.removeItem("MovieDepthTokenExpiration");
  return redirect("/");
}
