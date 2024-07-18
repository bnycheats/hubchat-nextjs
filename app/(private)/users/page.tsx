"use client";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import UpdateCreateUserSheet from "./update-create-user-sheet";

export default function UsersPage() {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <div>
      <UpdateCreateUserSheet
        open={openSheet}
        closeModal={() => setOpenSheet(false)}
      />
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl">Users</h2>
        <Button
          onClick={() => {
            setOpenSheet(true);
          }}
          className="rounded-full"
          variant="secondary"
          size="sm"
        >
          <AiOutlinePlus /> Add User
        </Button>
      </div>
    </div>
  );
}
