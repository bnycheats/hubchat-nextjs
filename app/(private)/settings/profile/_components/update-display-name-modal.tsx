"use client";

import { handleUpdateProfileError } from "@/errors/update-profile-error";
import { updateUserProfile } from "@/firebase/client/mutations/auth";
import { type UpdateUserProfilePayloadType } from "@/firebase/client/mutations/auth/types";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DialogProps } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
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
  displayName: z.string(),
});

function UpdateDisplayNameModal(props: UpdateDisplayNameModalProps) {
  const { closeModal, ...other } = props;
  const { toast } = useToast();
  const { authUser } = useAuth();

  const defaultValues: FormValues = {
    displayName: authUser?.displayName ?? "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const updateUserProfileMutation = useMutation({
    mutationFn: (request: UpdateUserProfilePayloadType) =>
      updateUserProfile(request),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Profile updated successfully.",
      });
      form.reset(form.watch(), {
        keepValues: false,
        keepDirty: false,
        keepDefaultValues: false,
      });
      closeModal();
    },
    onError: (error: any) =>
      toast({
        variant: "destructive",
        title: handleUpdateProfileError(error.code),
      }),
  });

  const onPressSubmit: SubmitHandler<FormValues> = ({ displayName }) =>
    authUser &&
    updateUserProfileMutation.mutate({
      user: authUser,
      displayName,
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
          <DialogTitle className="mb-2">
            {`${authUser?.displayName ? "Update" : "Add"} display name`}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onPressSubmit)}
          >
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Display name*"
                    disabled={updateUserProfileMutation.isPending}
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
                  updateUserProfileMutation.isPending || !form.formState.isDirty
                }
              >
                {updateUserProfileMutation.isPending && (
                  <Spinner className="h-5 w-5 text-white" />
                )}
                {authUser?.displayName ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type FormValues = {
  displayName: string;
};

type UpdateDisplayNameModalProps = {
  closeModal: () => void;
} & DialogProps;

export default UpdateDisplayNameModal;
