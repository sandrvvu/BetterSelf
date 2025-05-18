"use-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Tiptap } from "@/components/journal";
import { Spinner } from "@/components/shared";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { EntrySchema, EntrySchemaType, Info } from "@/lib";
import { useGetGoalOptionsQuery } from "@/state/features/goals/goalApi";
import { useCreateEntryMutation } from "@/state/features/journal/journalApi";

export default function AddEntryForm() {
  const [createEntry, { data, isLoading, isSuccess }] =
    useCreateEntryMutation();

  const { data: options, isLoading: isLoadingOptions } =
    useGetGoalOptionsQuery();

  const form = useForm<EntrySchemaType>({
    mode: "onChange",
    resolver: zodResolver(EntrySchema),
    defaultValues: {
      title: "",
      content: "",
      goalId: null,
    },
  });

  async function onSubmit(values: EntrySchemaType) {
    await createEntry(values);
  }

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Entry added successfully.");
    }
  }, [isSuccess, data]);

  if (isLoadingOptions) {
    return <Spinner />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit(onSubmit)(event);
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-right">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the title of your entry here..."
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-right">Description</FormLabel>
              <FormControl>
                <Tiptap onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Related Goal</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === "__none__" ? null : value)
                  }
                  value={field.value ?? "__none__"}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a goal..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-40 overflow-y-auto">
                    <SelectItem
                      value="__none__"
                      className="cursor-pointer hover:bg-neutral-100"
                    >
                      No goal
                    </SelectItem>
                    {options?.map((goal: Info) => (
                      <SelectItem key={goal.id} value={goal.id}>
                        {goal.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex justify-end">
          <Button
            type="submit"
            className="w-full bg-violet-600 text-white py-4 rounded-lg hover:bg-violet-700"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </FormItem>
      </form>
    </Form>
  );
}
