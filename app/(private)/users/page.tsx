"use client";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import UpdateCreateUserSheet from "./components/update-create-user-sheet";

export default function UsersPage() {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <div>
      <UpdateCreateUserSheet
        open={openSheet}
        closeModal={() => setOpenSheet(false)}
      />
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
  );
}
