'use client';

import { handleChangePasswordError } from '@/errors/change-password-error';
import { changePassword } from '@/firebase/client/mutations/auth';
import { type ChangePasswordPayloadType } from '@/firebase/client/mutations/auth/types';
import useAuth from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { type DialogProps } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import Password from '@/components/password';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z
  .object({
    oldPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
    newPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match',
  });

function ChangePasswordModal(props: ChangePasswordModalProps) {
  const { closeModal, ...other } = props;
  const { toast } = useToast();
  const { authUser } = useAuth();

  const defaultValues: FormValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const changePasswordMutation = useMutation({
    mutationFn: (request: ChangePasswordPayloadType) => changePassword(request),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Your password has been updated successfully.',
      });
      form.reset();
      closeModal();
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: handleChangePasswordError(error.code),
      }),
  });

  const onPressSubmit: SubmitHandler<FormValues> = (data) =>
    authUser &&
    changePasswordMutation.mutate({
      user: authUser,
      newPassword: data.newPassword,
    });

  return (
    <Dialog
      {...other}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          closeModal();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Change Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onPressSubmit)}>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <Password {...field} placeholder="Old password*" disabled={changePasswordMutation.isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <Password {...field} placeholder="New password*" disabled={changePasswordMutation.isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <Password
                    {...field}
                    placeholder="Re-enter your password*"
                    disabled={changePasswordMutation.isPending}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button className="rounded-full" type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button className="rounded-full" type="submit" disabled={changePasswordMutation.isPending}>
                {changePasswordMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
                Change Password
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ChangePasswordModalProps = {
  closeModal: () => void;
} & DialogProps;

export default ChangePasswordModal;
