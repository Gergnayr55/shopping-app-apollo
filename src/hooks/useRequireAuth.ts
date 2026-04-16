import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, LoginUser } from "../utils";

export function useRequireAuth(): LoginUser | null {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return user;
}
