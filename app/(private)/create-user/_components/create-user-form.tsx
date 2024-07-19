"use client";

import provinces from "@/constants/provinces";
import { createUser } from "@/firebase/client/mutations/auth";
import { type CreateUserPayloadType } from "@/firebase/client/mutations/auth/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import roles from "@/constants/roles";
import { CalendarIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RolesEnums } from "@/helpers/types";
import { type UserDetailsFormValues } from "@/helpers/types";
import { useRouter } from "next/navigation";
import { type GetCompaniesResponse } from "@/firebase/client/queries/companies/types";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  first_name: z.string().min(1, { message: "This field is required" }),
  last_name: z.string().min(1, { message: "This field is required" }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  role: z.array(z.string()).nonempty({ message: "This field is required" }),
  companies: z
    .array(z.string())
    .nonempty({ message: "This field is required" }),
  phone_number: z.string().min(1, { message: "This field is required" }),
  street: z.string().min(1, { message: "This field is required" }),
  province: z.string().min(1, { message: "This field is required" }),
  postal_code: z.string().min(1, { message: "This field is required" }),
});

export default function CreateUserForm(props: CreateUserFormProps) {
  const { companies } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const defaultValues: UserDetailsFormValues = {
    email: "",
    first_name: "",
    last_name: "",
    dob: new Date(),
    role: [],
    phone_number: "",
    street: "",
    province: "",
    postal_code: "",
    companies: [],
  };

  const form = useForm<UserDetailsFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const createUserMutation = useMutation({
    mutationFn: (request: CreateUserPayloadType) => createUser(request),
    onSuccess: (data) => {
      router.push(`/users/${data?.uid}/jobs`);
      toast({
        variant: "success",
        title: "User created successfully",
      });
      form.reset({});
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: error?.toString(),
      });
    },
  });

  const onPressSubmit: SubmitHandler<UserDetailsFormValues> = (payload) => {
    const { email, dob, role, ...other } = payload;
    createUserMutation.mutate({
      email,
      payload: {
        ...other,
        role: role as Array<RolesEnums>,
        dob: dob.getTime(),
      },
    });
  };

  return (
    <section>
      {createUserMutation.isPending && <Spinner centered fullScreen />}
      <h2 className="text-3xl">Create User</h2>
      <Form {...form}>
        <form
          className="mt-4 grid grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(onPressSubmit)}
        >
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
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder="First name*" />
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
                <Input {...field} placeholder="Last name*" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roles</FormLabel>
                <MultiSelect
                  options={roles}
                  selected={field.value ?? []}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Companies</FormLabel>
                <MultiSelect
                  options={
                    companies?.reduce((newItem: Array<OptionType>, item) => {
                      return [
                        ...newItem,
                        { label: item.company_name, value: item.id },
                      ];
                    }, []) ?? []
                  }
                  displayLabel={true}
                  selected={field.value ?? []}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <Input {...field} placeholder="Phone number*" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal code</FormLabel>
                <Input {...field} placeholder="Postal code*" />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <Textarea {...field} placeholder="Street*" />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 flex justify-end gap-3">
            <Button
              className="rounded-full w-28"
              type="submit"
              disabled={!form.formState.isDirty}
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

type CreateUserFormProps = {
  companies: Array<GetCompaniesResponse>;
};
