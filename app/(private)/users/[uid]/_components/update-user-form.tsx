'use client';

import provinces from '@/constants/provinces';
import { updateUser } from '@/firebase/client/mutations/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import roles from '@/constants/roles';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { RolesEnums } from '@/helpers/types';
import TooltipInfo from '@/components/tooltip-info';
import { type UpdateUserPayloadType } from '@/firebase/client/mutations/users/types';
import Spinner from '@/components/spinner';
import useUser from '../_hooks/useUser';
import Message from '@/components/message';

const FormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  first_name: z.string().min(1, { message: 'This field is required' }),
  last_name: z.string().min(1, { message: 'This field is required' }),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  role: z.array(z.string()).nonempty({ message: 'This field is required' }),
  phone_number: z.string().min(1, { message: 'This field is required' }),
  street: z.string().min(1, { message: 'This field is required' }),
  province: z.string().min(1, { message: 'This field is required' }),
  postal_code: z.string().min(1, { message: 'This field is required' }),
});

export default function UpdateUserForm() {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { dob, ...other } = user;

  const defaultValues: FormValues = {
    dob: new Date(dob),
    ...other,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const updateUserMutation = useMutation({
    mutationFn: (request: UpdateUserPayloadType) => updateUser(request),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'User details updated successfully',
      });
      form.reset(form.watch(), {
        keepValues: false,
        keepDirty: false,
        keepDefaultValues: false,
      });
      queryClient.invalidateQueries({ queryKey: ['SpecificUser'] });
    },
    onError: (error: any) =>
      toast({
        variant: 'destructive',
        title: `Error updating user details: ${error}`,
      }),
  });

  const onPressSubmit: SubmitHandler<FormValues> = (payload) => {
    const { dob, role, ...other } = payload;
    updateUserMutation.mutate({
      userId: user.uid,
      payload: {
        ...other,
        role: role as Array<RolesEnums>,
        dob: dob.getTime(),
      },
    });
  };

  if (!user?.active) {
    return (
      <Message title="User Disabled" message="User has been disabled. Please contact support for more information." />
    );
  }

  return (
    <Form {...form}>
      {updateUserMutation.isPending && <Spinner centered fullScreen />}
      <form className="mt-4 grid grid-cols-2 gap-6" onSubmit={form.handleSubmit(onPressSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="relative">
                Email
                <span className="absolute top-1/2 -translate-y-1/2 -right-2/3">
                  <TooltipInfo infoText="Email can't be change, ask the developer to change it" />
                </span>
              </FormLabel>
              <Input {...field} type="email" placeholder="Email Address*" disabled />
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
              <MultiSelect options={roles} selected={field.value ?? []} onChange={field.onChange} />
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
              <Select onValueChange={field.onChange} value={field.value}>
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
          <Button className="rounded-full w-28" type="submit" disabled={!form.formState.isDirty}>
            Update
          </Button>
        </div>
      </form>
    </Form>
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
