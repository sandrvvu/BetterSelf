"use-client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} from "@/state/features/categories/categoryApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategorySchema,
  CategorySchemaType,
} from "@/lib/validation/category.schema";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import Spinner from "@/components/spinner";

export default function EditCategoryForm({
  id,
  setIsOpen,
}: {
  id: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [updateCategory, { data, isLoading, isSuccess }] =
    useUpdateCategoryMutation();

  const { data: category, isLoading: isDataLoading } = useGetCategoryQuery(id);

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name ?? "",
        description: category.description ?? "",
      });
    }
  }, [category, form]);

  async function onSubmit(values: CategorySchemaType) {
    await updateCategory({ id, data: values });
  }

  useEffect(() => {
    if (isSuccess && data) {
      setIsOpen(false);
      toast.success("Category edited successfully.");
    }
  }, [isSuccess, data, setIsOpen]);

  if (isDataLoading || !category) {
    return <Spinner/>;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-right">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Happiness"
                  className="col-span-3 text-purple-800 rounded-lg focus:border-violet-500 focus:outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-right">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your description here."
                  className="text-purple-800 rounded-lg focus:border-violet-500 focus:outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex justify-end">
          <Button
            type="submit"
            className="bg-violet-600 text-white py-4 rounded-lg hover:bg-violet-700"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </FormItem>
      </form>
    </Form>
  );
}
