
"use client";

import { useMountedState } from "react-use";

import { NewUserDialog } from "@/features/users/components/new-user-dialog";

export const UserDialogProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewUserDialog />
    </>
  );
};