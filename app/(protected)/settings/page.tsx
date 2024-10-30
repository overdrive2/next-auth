"use client";

import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const session = useSession();

  const onClick = () =>{
    logout();
  }

  return (
    <>
      <div>Setting Page</div>
      { JSON.stringify(session) }
      <button onClick={onClick} type="button">
        Sign Out
      </button>
    </>
  )
}

export default SettingsPage; 