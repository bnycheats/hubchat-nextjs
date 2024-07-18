"use client";

import { handleForgotPasswordError } from "@/errors/forgot-password-error";
import { forgotPassword } from "@/firebase/client/mutations/auth";
import { type ForgotPasswordPayloadType } from "@/firebase/client/mutations/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Fragment } from "react";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (request: ForgotPasswordPayloadType) => forgotPassword(request),
    onSuccess: () => {
      form.reset();
      toast({
        variant: "success",
        title: "Password reset email sent. Please check your inbox.",
      });
    },
    onError: (error: any) =>
      toast({
        variant: "destructive",
        title: handleForgotPasswordError(error.code),
      }),
  });

  const onSubmit: SubmitHandler<ForgotPasswordPayloadType> = (data) =>
    forgotPasswordMutation.mutate(data);

  return (
    <Fragment>
      <div className="mb-3">
        <h1 className="text-lg font-medium">Forgot Password</h1>
        <small>
          Insert your account email and we’ll send you a reset link.
        </small>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input {...field} type="email" placeholder="Email Address*" />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            <Button className="mb-2 w-full">
              {forgotPasswordMutation.isPending && (
                <Spinner className="mr-1 h-5 w-5 text-white" />
              )}
              Send Reset Link
            </Button>
            <Link href="/login">
              <Button type="button" className="h-auto p-0" variant="link">
                Login
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </Fragment>
  );
}
