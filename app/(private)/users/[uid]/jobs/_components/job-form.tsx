"use client";

import provinces from "@/constants/provinces";
import { updateUser } from "@/firebase/client/mutations/users";
import { getUser } from "@/firebase/client/queries/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import roles from "@/constants/roles";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import currencies from "@/constants/currencies";
import { Input } from "@/components/ui/input";
import { MultiSelect, type OptionType } from "@/components/ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RolesEnums } from "@/helpers/types";
import TooltipInfo from "@/components/tooltip-info";
import { type UpdateUserPayloadType } from "@/firebase/client/mutations/users/types";
import Spinner from "@/components/spinner";
import { type GetCompanyResponse } from "@/firebase/client/queries/companies/types";
import { type GetUserDetailsResponseType } from "@/firebase/client/queries/users/types";

const FormSchema = z.object({
  commission_rate: z.number().min(1, { message: "This field is required" }),
  currency: z.string().min(3, { message: "This field is required" }),
});

export default function JobForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const defaultValues: FormValues = {
    commission_rate: undefined,
    currency: "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const updateCreateUserJobMutation = useMutation({
    // mutationFn: (request: UpdateUserPayloadType) => updateUser(request),
    // onSuccess: () => {
    //   toast({
    //     variant: "success",
    //     title: "User details updated successfully",
    //   });
    //   form.reset(form.watch(), {
    //     keepValues: false,
    //     keepDirty: false,
    //     keepDefaultValues: false,
    //   });
    //   queryClient.invalidateQueries({ queryKey: ["User"] });
    // },
    // onError: (error: any) =>
    //   toast({
    //     variant: "destructive",
    //     title: `Error updating user details: ${error}`,
    //   }),
  });

  // const onPressSubmit: SubmitHandler<UpdateUserDetailsFormValues> = (
  //   payload
  // ) => {
  //   const { dob, role, ...other } = payload;
  //   updateUserMutation.mutate({
  //     userId: uid,
  //     payload: {
  //       ...other,
  //       role: role as Array<RolesEnums>,
  //       dob: dob.getTime(),
  //     },
  //   });
  // };

  return (
    <Form {...form}>
      <form
        className="mt-4 grid grid-cols-2 gap-6"
        // onSubmit={form.handleSubmit(onPressSubmit)}
      >
        <FormField
          control={form.control}
          name="commission_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commission rate</FormLabel>
              <Input {...field} type="number" placeholder="Commission rate*" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency*" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(currencies).map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-end gap-3">
          <Button
            className="rounded-full"
            type="submit"
            disabled={!form.formState.isDirty}
          >
            Create Account
          </Button>
        </div>
      </form>
    </Form>
  );
}

type FormValues = {
  commission_rate: number | undefined;
  currency: string;
};
