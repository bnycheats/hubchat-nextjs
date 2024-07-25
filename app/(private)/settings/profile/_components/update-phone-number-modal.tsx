'use client';

import { updateUser } from '@/firebase/client/mutations/users';
import { type UpdateUserPayloadType } from '@/firebase/client/mutations/users/types';
import useAuth from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { type DialogProps } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  phone_number: z.string().min(1, { message: 'This field is required' }),
});

function UpdatePhoneNumberModal(props: UpdatePhoneNumberModalProps) {
  const { closeModal, ...other } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { authUser, userDetails } = useAuth();

  const defaultValues: FormValues = {
    phone_number: userDetails?.phone_number ?? '',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const updatePhoneNumberMutation = useMutation({
    mutationFn: (request: UpdateUserPayloadType) => updateUser(request),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "User's phone number updated successfully",
      });
      form.reset(form.watch(), {
        keepValues: false,
        keepDirty: false,
        keepDefaultValues: false,
      });
      queryClient.invalidateQueries({ queryKey: ['User'] });
      closeModal();
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: `Error updating user's phone number: ${error}`,
      }),
  });

  const onPressSubmit: SubmitHandler<FormValues> = ({ phone_number }) =>
    authUser &&
    updatePhoneNumberMutation.mutate({
      userId: authUser.uid,
      payload: {
        phone_number,
      },
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
          <DialogTitle className="mb-2">Update phone number</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onPressSubmit)}>
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <Input {...field} placeholder="Phone number*" disabled={updatePhoneNumberMutation.isPending} />
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
              <Button
                className="rounded-full"
                type="submit"
                disabled={updatePhoneNumberMutation.isPending || !form.formState.isDirty}
              >
                {updatePhoneNumberMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type FormValues = {
  phone_number: string;
};

type UpdatePhoneNumberModalProps = {
  closeModal: () => void;
} & DialogProps;

export default UpdatePhoneNumberModal;
