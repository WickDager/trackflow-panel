'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteUserSchema, type InviteUserInput } from '@/lib/validations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InviteUserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteUserForm({ open, onOpenChange }: InviteUserFormProps) {
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteUserInput>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: '',
      role: 'user',
    },
  });

  async function handleFormSubmit(data: InviteUserInput) {
    setLoading(true);
    setSuccess(null);
    // MVP: Simulate invitation sent
    setSuccess(`Invitation sent to ${data.email}`);
    setLoading(false);
    setTimeout(() => {
      setSuccess(null);
      reset();
      onOpenChange(false);
    }, 2000);
    return true;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-bg-surface border-bg-border sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription className="text-ink-secondary">
              Send an invitation to join the Trackflow panel.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {success && (
              <div className="rounded-md bg-accent-subtle p-3 text-sm text-accent">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="bg-bg-elevated border-bg-border text-ink-primary"
              />
              {errors.email && (
                <p className="text-sm text-status-red">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                defaultValue="user"
                onValueChange={(value) => setValue('role', value as 'admin' | 'user')}
              >
                <SelectTrigger className="bg-bg-elevated border-bg-border text-ink-primary">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-status-red">{errors.role.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting || loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || loading}>
              {isSubmitting || loading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
