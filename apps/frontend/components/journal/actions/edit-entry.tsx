"use-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { EntrySchema, EntrySchemaType } from "@/lib";
import { useUpdateEntryMutation } from "@/state/features/journal/journalApi";

import { Tiptap } from "../editor";

export default function EditEntryForm({
  id,
  title,
  content = "",
  setIsOpen,
}: {
  id: string;
  title: string;
  content?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [updateEntry, { data, isLoading, isSuccess }] =
    useUpdateEntryMutation();

  const form = useForm<EntrySchemaType>({
    mode: "onChange",
    resolver: zodResolver(EntrySchema),
    defaultValues: {
      title,
      content,
      goalId: null,
    },
  });

  async function onSubmit(values: EntrySchemaType) {
    await updateEntry({ id, data: values });
  }

  useEffect(() => {
    if (isSuccess && data) {
      setIsOpen(false);
      toast.success("Entry edited successfully.");
    }
  }, [isSuccess, data, setIsOpen]);

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
          name="content"
          render={() => (
            <FormItem>
              <FormLabel className="text-right">Description</FormLabel>
              <FormControl>
                <Tiptap
                  description={form.watch("content")}
                  onChange={(val) =>
                    form.setValue("content", val, { shouldDirty: true })
                  }
                />
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
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </FormItem>
      </form>
    </Form>
  );
}
