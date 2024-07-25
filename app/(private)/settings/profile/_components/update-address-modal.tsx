'use client';

import provinces from '@/constants/provinces';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  street: z.string().min(1, { message: 'This field is required' }),
  province: z.string({ message: 'This field is required' }),
  postal_code: z.string().min(1, { message: 'This field is required' }),
});

function UpdateAddressModal(props: UpdateAddressModalProps) {
  const { closeModal, ...other } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { authUser, userDetails } = useAuth();

  const defaultValues: FormValues = {
    street: userDetails?.street ?? '',
    province: userDetails?.province ?? '',
    postal_code: userDetails?.postal_code ?? '',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const updateAddressMutation = useMutation({
    mutationFn: (request: UpdateUserPayloadType) => updateUser(request),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: "User's address updated successfully",
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
        title: `Error updating user's address: ${error}`,
      }),
  });

  const onPressSubmit: SubmitHandler<FormValues> = (payload) =>
    authUser &&
    updateAddressMutation.mutate({
      userId: authUser.uid,
      payload,
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
          <DialogTitle className="mb-2">Update address</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onPressSubmit)}>
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal code</FormLabel>
                  <Input {...field} placeholder="Postal code*" disabled={updateAddressMutation.isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <Textarea {...field} placeholder="Street*" disabled={updateAddressMutation.isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province*" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                disabled={updateAddressMutation.isPending || !form.formState.isDirty}
              >
                {updateAddressMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
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
  street: string;
  province: string;
  postal_code: string;
};

type UpdateAddressModalProps = {
  closeModal: () => void;
} & DialogProps;

export default UpdateAddressModal;
