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
import { disableAccount } from '@/firebase/client/mutations/accounts';
import { useParams } from 'next/navigation';
import { type DisableAccountPayloadType } from '@/firebase/client/mutations/accounts/types';
import Spinner from '@/components/spinner';

function DisableButton() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { accountId } = useParams<{ accountId: string }>();

  const [alertOpen, setAlertOpen] = useState(false);

  const disableAccountMutation = useMutation({
    mutationFn: (request: DisableAccountPayloadType) => disableAccount(request),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Account disabled successfully',
      });
      setAlertOpen(false);
      queryClient.invalidateQueries({ queryKey: ['Account'] });
      queryClient.invalidateQueries({ queryKey: ['Accounts'] });
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: `Error disabling account: ${error}`,
      }),
  });

  return (
    <Fragment>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to disable this account?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                disableAccountMutation.mutate({ account_id: accountId });
              }}
            >
              {disableAccountMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
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
