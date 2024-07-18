import provinces from "@/constants/provinces";
import { createUser } from "@/firebase/client/mutations/auth";
import { type CreateUserPayloadType } from "@/firebase/client/mutations/auth/types";
import { getUserRoles } from "@/firebase/client/queries/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DialogProps } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RolesEnums } from "@/helpers/types";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  first_name: z.string().min(1, { message: "This field is required" }),
  last_name: z.string().min(1, { message: "This field is required" }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  role: z.array(z.string()).nonempty({ message: "This field is required" }),
  phone_number: z.string().min(1, { message: "This field is required" }),
  street: z.string().min(1, { message: "This field is required" }),
  province: z.string({ message: "This field is required" }),
  postal_code: z.string().min(1, { message: "This field is required" }),
});

function UpdateCreateUserSheet(props: UpdateCreateUserSheetProps) {
  const { closeModal, ...other } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userRoles } = useQuery({
    queryKey: ["Roles"],
    queryFn: async () => getUserRoles(),
  });

  const reduceUserRoles: Array<OptionType> =
    userRoles?.reduce((newRoles: Array<OptionType>, item) => {
      return [
        ...newRoles,
        {
          label: item.title,
          value: item.id,
        },
      ];
    }, []) ?? [];

  const defaultValues: FormValues = {
    email: "",
    first_name: "",
    last_name: "",
    dob: new Date(),
    role: [],
    phone_number: "",
    street: "",
    province: "",
    postal_code: "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const createUserMutation = useMutation({
    mutationFn: (request: CreateUserPayloadType) => createUser(request),
    onSuccess: (e) => {
      toast({
        variant: "success",
        title: "User created successfully",
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
        title: `Error creating user: ${error}`,
      }),
  });

  const onPressSubmit: SubmitHandler<FormValues> = (payload) => {
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
    <Sheet
      {...other}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          closeModal();
        }
      }}
    >
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add User</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            className="mt-4 space-y-3"
            onSubmit={form.handleSubmit(onPressSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email Address*"
                    disabled={createUserMutation.isPending}
                  />
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
                  <Input
                    {...field}
                    placeholder="First name*"
                    disabled={createUserMutation.isPending}
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
                    disabled={createUserMutation.isPending}
                  />
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <MultiSelect
                    options={reduceUserRoles}
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
                  <Input
                    {...field}
                    placeholder="Phone number*"
                    disabled={createUserMutation.isPending}
                  />
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
                  <Input
                    {...field}
                    placeholder="Postal code*"
                    disabled={createUserMutation.isPending}
                  />
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
                  <Textarea
                    {...field}
                    placeholder="Street*"
                    disabled={createUserMutation.isPending}
                  />
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
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  className="rounded-full"
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </SheetClose>
              <Button
                className="rounded-full"
                type="submit"
                disabled={
                  createUserMutation.isPending || !form.formState.isDirty
                }
              >
                {createUserMutation.isPending && (
                  <Spinner className="h-5 w-5 text-white" />
                )}
                Add
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

type FormValues = {
  email: string;
  first_name: string;
  last_name: string;
  dob: Date;
  role: Array<string>;
  phone_number: string;
  street: string;
  province: string;
  postal_code: string;
};

type UpdateCreateUserSheetProps = {
  closeModal: () => void;
} & DialogProps;

export default UpdateCreateUserSheet;
