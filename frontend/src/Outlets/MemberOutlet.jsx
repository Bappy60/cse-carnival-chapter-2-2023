import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function MemberOUtlet() {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(false);

  return (
    <Box>
      {Cookies.get("memberId") ? (
        <Outlet />
      ) : (
        <Navigate to="/member/register" />
      )}
    </Box>
  );
}
