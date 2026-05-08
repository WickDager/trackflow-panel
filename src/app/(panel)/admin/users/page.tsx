"use client";

import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { UsersTable } from "@/components/users/UsersTable";
import { InviteUserForm } from "@/components/users/InviteUserForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Role } from "@/types";

// TODO: Get from session
const currentUserId = "current-user-id";

export default function UsersPage() {
  const { users, loading, error, refetch } = useUsers();
  const [inviteOpen, setInviteOpen] = useState(false);

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  async function handleRoleChange(
    userId: string,
    newRole: Role
  ): Promise<boolean> {
    // MVP: Just show success - would call API in production
    await refetch();
    return true;
  }

  async function handleRemove(userId: string): Promise<void> {
    // MVP: Just refetch - would call API in production
    await refetch();
  }

  return (
    <div className="space-y-4">
      {/* Summary Bar */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-ink-secondary">
          {users.length} total &middot; {adminCount} admins &middot; {userCount}{" "}
          users
        </p>
        <Button onClick={() => setInviteOpen(true)} size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Invite user
        </Button>
      </div>

      {/* Users Table */}
      <UsersTable
        users={users}
        loading={loading}
        error={error}
        currentUserId={currentUserId}
        onRoleChange={handleRoleChange}
        onRemove={handleRemove}
      />

      {/* Invite Dialog */}
      <InviteUserForm open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  );
}
