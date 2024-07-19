"use client";

import { updateUser } from "@/firebase/client/mutations/users";
import { type UpdateUserPayloadType } from "@/firebase/client/mutations/users/types";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DialogProps } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  first_name: z.string().min(1, { message: "This field is required" }),
  last_name: z.string().min(1, { message: "This field is required" }),
});

function UpdateFullNameModal(props: UpdateFullNameModalProps) {
  const { closeModal, ...other } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { authUser, userDetails } = useAuth();

  const defaultValues: FormValues = {
    first_name: userDetails?.first_name ?? "",
    last_name: userDetails?.last_name ?? "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const updateFullNameModalMutation = useMutation({
    mutationFn: (request: UpdateUserPayloadType) => updateUser(request),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "User's full name updated successfully",
      });
      form.reset(form.watch(), {
        keepValues: false,
        keepDirty: false,
        keepDefaultValues: false,
      });
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      closeModal();
    },
    onError: (error: any) =>
      toast({
        variant: "destructive",
        title: `Error updating user's full name: ${error}`,
      }),
  });

  const onPressSubmit: SubmitHandler<FormValues> = (payload) =>
    authUser &&
    updateFullNameModalMutation.mutate({
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
          <DialogTitle className="mb-2">Update full name</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onPressSubmit)}
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <Input
                    {...field}
                    placeholder="First name*"
                    disabled={updateFullNameModalMutation.isPending}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Last name*"
                    disabled={updateFullNameModalMutation.isPending}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="rounded-full"
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                className="rounded-full"
                type="submit"
                disabled={
                  updateFullNameModalMutation.isPending ||
                  !form.formState.isDirty
                }
              >
                {updateFullNameModalMutation.isPending && (
                  <Spinner className="h-5 w-5 text-white" />
                )}
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
  first_name: string;
  last_name: string;
};

type UpdateFullNameModalProps = {
  closeModal: () => void;
} & DialogProps;

export default UpdateFullNameModal;
