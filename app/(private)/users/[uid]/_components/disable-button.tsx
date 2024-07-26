'use client';

import { Fragment, useState } from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { disableUser } from '@/firebase/client/mutations/users';
import { useParams } from 'next/navigation';
import { type DisableUserPayloadType } from '@/firebase/client/mutations/users/types';
import Spinner from '@/components/spinner';
import useUser from '../_hooks/useUser';

function DisableButton() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { uid } = useParams<{ uid: string }>();

  const [alertOpen, setAlertOpen] = useState(false);

  const disableUserMutation = useMutation({
    mutationFn: (request: DisableUserPayloadType) => disableUser(request),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'User disabled successfully',
      });
      setAlertOpen(false);
      queryClient.invalidateQueries({ queryKey: ['SpecificUser'] });
      queryClient.invalidateQueries({ queryKey: ['Users'] });
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: `Error disabling user: ${error}`,
      }),
  });

  return (
    <Fragment>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to disable this user?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                disableUserMutation.mutate({ userId: uid });
              }}
            >
              {disableUserMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button onClick={() => setAlertOpen(true)} className="rounded-full" variant="destructive" size="sm">
        <AiOutlineStop /> Disable Account
      </Button>
    </Fragment>
  );
}

export default DisableButton;
