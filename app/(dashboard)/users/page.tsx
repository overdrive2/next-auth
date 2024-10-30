"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useNewUser } from "@/features/users/hooks/use-new-user";
import { useGetUsers } from "@/features/users/api/use-get-users";

import { columns } from "./column";
import { DataTable } from "./data-table";

const UserPage = () => {

  const newUser = useNewUser();
  const usersQuery = useGetUsers();
  const users = usersQuery.data || [];

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 mt-2">
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-grow lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Users Page
        </CardTitle>
        <Button onClick={newUser.onOpen} size="sm">
          <Plus className="size-4 mr-2" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={users} />
      </CardContent>
    </Card>
    </div>
  )
}

export default UserPage; 