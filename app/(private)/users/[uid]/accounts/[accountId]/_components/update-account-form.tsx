"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import roles from "@/constants/roles";

import { Button } from "@/components/ui/button";
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
import CompanyDetails from "../../../_components/comany-details";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { updateAccount } from "@/firebase/client/mutations/accounts";
import { type UpdateAccountPayloadType } from "@/firebase/client/mutations/accounts/types";
import useCompanies from "@/app/(private)/_hooks/useCompanies";
import Spinner from "@/components/spinner";
import convertToCents from "@/utils/convertToCents";
import { type GetAccountResponseType } from "@/firebase/client/queries/accounts/types";
import convertToAmount from "@/utils/convertToAmount";
import { getAccount } from "@/firebase/client/queries/accounts";
import { useQuery } from "@tanstack/react-query";

const FormSchema = z.object({
  company_id: z.string().min(1, { message: "This field is required" }),
  currency: z.string().min(3, { message: "This field is required" }),
  commission_rate: z.preprocess(
    Number,
    z
      .number()
      .multipleOf(0.01, { message: "Maximum two decimal places allowed." })
  ),
  account_name: z.string().min(1, { message: "This field is required" }),
  expenses_rate: z.preprocess(
    Number,
    z
      .number()
      .multipleOf(0.01, { message: "Maximum two decimal places allowed." })
  ),
  over_time_rate: z.preprocess(
    Number,
    z
      .number()
      .multipleOf(0.01, { message: "Maximum two decimal places allowed." })
  ),
  per_hour_rate: z.preprocess(
    Number,
    z
      .number()
      .multipleOf(0.01, { message: "Maximum two decimal places allowed." })
  ),
  per_day_rate: z.preprocess(
    Number,
    z
      .number()
      .multipleOf(0.01, { message: "Maximum two decimal places allowed." })
  ),
  per_month_rate: z.preprocess(
    Number,
    z
      .number()
      .multipleOf(0.01, { message: "Maximum two decimal places allowed." })
  ),
  role: z.string().min(1, { message: "This field is required" }),
});

export default function UpdateAccountForm(props: UpdateAccountFormProps) {
  const { account: initialData, accountId } = props;
  const { companies } = useCompanies();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: account } = useQuery({
    queryKey: ["Account", accountId],
    queryFn: async () => getAccount({ account_id: accountId }),
    initialData,
  });

  const { per_day_rate, per_hour_rate, per_month_rate, ...other } = account;

  const defaultValues: FormValues = {
    per_day_rate: `${convertToAmount(Number(per_day_rate))}`,
    per_hour_rate: `${convertToAmount(Number(per_hour_rate))}`,
    per_month_rate: `${convertToAmount(Number(per_month_rate))}`,
    ...other,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const company = companies?.find(
    (item) => item.id === form.watch("company_id")
  );

  const updateAccountMutation = useMutation({
    mutationFn: (request: UpdateAccountPayloadType) => updateAccount(request),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Account updated successfully",
      });
      form.reset(form.watch(), {
        keepValues: false,
        keepDirty: false,
        keepDefaultValues: false,
      });
      queryClient.invalidateQueries({ queryKey: ["Account"] });
    },
    onError: (error: any) =>
      toast({
        variant: "destructive",
        title: `Error updating account: ${error}`,
      }),
  });

  const onPressSubmit: SubmitHandler<FormValues> = (payload) => {
    const { per_day_rate, per_hour_rate, per_month_rate, ...other } = payload;
    updateAccountMutation.mutate({
      account_id: accountId,
      payload: {
        per_day_rate: `${convertToCents(Number(per_day_rate))}`,
        per_hour_rate: `${convertToCents(Number(per_hour_rate))}`,
        per_month_rate: `${convertToCents(Number(per_month_rate))}`,
        ...other,
      },
    });
  };

  useEffect(() => {
    if (company) {
      form.setValue("currency", company.currency, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [company]);

  return (
    <div>
      {updateAccountMutation.isPending && <Spinner centered fullScreen />}
      {company && <CompanyDetails {...company} />}
      <section>
        <Form {...form}>
          <form
            className="mt-4 grid grid-cols-2 gap-6"
            onSubmit={form.handleSubmit(onPressSubmit)}
          >
            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company*" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies?.map((item, index) => (
                        <SelectItem key={index} value={item.id}>
                          {item.company_name}
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
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
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
            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account name</FormLabel>
                  <Input {...field} placeholder="Account name*" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commission_rate"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel>Commission rate</FormLabel>
                    <span className="text-xs text-primary bottom-0 absolute right-0">
                      Optional
                    </span>
                  </div>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Commission rate"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expenses_rate"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel>Company Expenses rate</FormLabel>
                    <span className="text-xs text-primary bottom-0 absolute right-0">
                      Optional
                    </span>
                  </div>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Company expenses rate"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="over_time_rate"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel>Over time rate</FormLabel>
                    <span className="text-xs text-primary bottom-0 absolute right-0">
                      Optional
                    </span>
                  </div>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Over time rate"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="per_hour_rate"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel>Per hour rate</FormLabel>
                    <span className="text-xs text-primary bottom-0 absolute right-0">
                      Optional
                    </span>
                  </div>
                  <Input {...field} type="number" placeholder="Per hour rate" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="per_day_rate"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel>Per day rate</FormLabel>
                    <span className="text-xs text-primary bottom-0 absolute right-0">
                      Optional
                    </span>
                  </div>
                  <Input {...field} type="number" placeholder="Per day rate" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="per_month_rate"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel>Per month rate</FormLabel>
                    <span className="text-xs text-primary bottom-0 absolute right-0">
                      Optional
                    </span>
                  </div>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Per month rate"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role*" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.label}
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
                className="rounded-full w-28"
                type="submit"
                disabled={!form.formState.isDirty}
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
}

type FormValues = {
  company_id: string;
  currency: string;
  account_name: string;
  commission_rate: string;
  expenses_rate: string;
  over_time_rate: string;
  per_hour_rate: string;
  per_day_rate: string;
  per_month_rate: string;
  role: string;
};

type UpdateAccountFormProps = {
  account: GetAccountResponseType;
  accountId: string;
};