'use client';

import { updateUser } from '@/firebase/client/mutations/users';
import { type UpdateUserPayloadType } from '@/firebase/client/mutations/users/types';
import useAuth from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { type DialogProps } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
});

function UpdateDateOfBirthModal(props: UpdateDateOfBirthModalProps) {
  const { closeModal, ...other } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { authUser, userDetails } = useAuth();

  const defaultValues: FormValues = {
    dob: Number(userDetails?.dob) ? new Date(Number(userDetails?.dob)) : new Date(),
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const updateDateOfBirthMutation = useMutation({
    mutationFn: (request: UpdateUserPayloadType) => updateUser(request),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "User's date of birth updated successfully",
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
        title: `Error updating user's date of birth: ${error}`,
      }),
  });

  const onPressSubmit: SubmitHandler<FormValues> = ({ dob }) =>
    authUser &&
    updateDateOfBirthMutation.mutate({
      userId: authUser.uid,
      payload: {
        dob: dob.getTime(),
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
          <DialogTitle className="mb-2">Update date of birth</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onPressSubmit)}>
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                disabled={updateDateOfBirthMutation.isPending || !form.formState.isDirty}
              >
                {updateDateOfBirthMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
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
  dob: Date;
};

type UpdateDateOfBirthModalProps = {
  closeModal: () => void;
} & DialogProps;

export default UpdateDateOfBirthModal;
