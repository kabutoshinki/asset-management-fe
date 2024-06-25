'use client';

import { useRouter } from 'next-nprogress-bar';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreateUserResponse } from '@/features/user/user.types';
import { normalizeText } from '@/lib/utils';

export type CreateUserResultDialogProps = {
  userData: CreateUserResponse;
};

function CreateUserResultDialog({ userData }: CreateUserResultDialogProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleConfirmDialog = () => {
    router.replace('/users?new=true');
  };

  useOnClickOutside(modalRef, (e) => {
    e.preventDefault();
    handleConfirmDialog();
  });

  useEffect(() => {
    if (isOpen === false) {
      handleConfirmDialog();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} modal onOpenChange={setIsOpen}>
      <DialogContent ref={modalRef}>
        <DialogHeader>
          <DialogTitle>User created</DialogTitle>
          <DialogClose data-id="close-button" />
          <DialogDescription>
            Warning: You will not be able to see this information again after
            closing this window.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <Label>
              <span>First name</span>
            </Label>
            <Input value={userData?.firstName} readOnly />
          </div>
          <div className="col-span-1">
            <Label>
              <span>Last name</span>
            </Label>
            <Input value={userData?.lastName} readOnly />
          </div>
          <div className="col-span-2">
            <Label>
              <span>Gender</span>
            </Label>
            <Input value={normalizeText(userData?.gender)} readOnly />
          </div>
          <div className="col-span-2">
            <Label>
              <span>Date of Birth</span>
            </Label>
            <Input
              value={new Date(userData?.dob).toLocaleDateString()}
              readOnly
            />
          </div>
          <div className="col-span-2">
            <Label>
              <span>Joined Date</span>
            </Label>
            <Input
              value={new Date(userData?.joinedAt).toLocaleDateString()}
              readOnly
            />
          </div>
          <div className="col-span-2">
            <Label>
              <span>Type</span>
            </Label>
            <Input value={userData?.type} readOnly />
          </div>
          <div className="col-span-1">
            <Label>
              <span>Username</span>
            </Label>
            <Input value={userData?.username} readOnly />
          </div>
          <div className="col-span-1">
            <Label>
              <span>Password</span>
            </Label>
            <PasswordInput value={userData?.password} readOnly />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="mt-3 w-full"
            disabled={false}
            onClick={() => setIsOpen(false)}
            data-id="confirm-button"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserResultDialog;