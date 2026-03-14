"use client";

import { useEffect, useState } from "react";
import { socket } from "@/services/socket";

export default function UserList() {

  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {

    socket.on("room-users", (userList: string[]) => {
      setUsers(userList);
    });

    return () => {
      socket.off("room-users");
    };

  }, []);

  return (
    <div>

      <h3 className="font-bold mb-2">Users</h3>

      <ul className="space-y-1">
        {users.map((user, index) => (
          <li key={index} className="text-sm">
            {user}
          </li>
        ))}
      </ul>

    </div>
  );
}