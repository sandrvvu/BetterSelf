"use-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
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
  Textarea,
} from "@/components/ui";
import { VisionBoardSchema, VisionBoardSchemaType } from "@/lib";
import { useUpdateVisionBoardMutation } from "@/state/features/vision-boards/visionBoardApi";

export default function EditVisionBoardForm({
  id,
  title,
  description,
  setIsOpen,
}: {
  id: string;
  title: string;
  description?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [updateVisionBoard, { data, isLoading, isSuccess }] =
    useUpdateVisionBoardMutation();

  const form = useForm<VisionBoardSchemaType>({
    resolver: zodResolver(VisionBoardSchema),
    defaultValues: {
      title,
      description,
      goalId: null,
    },
  });

  async function onSubmit(values: VisionBoardSchemaType) {
    await updateVisionBoard({ id, data: values });
  }

  useEffect(() => {
    if (isSuccess && data) {
      setIsOpen(false);
      toast.success("Vision board edited successfully.");
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
              <FormLabel className="text-right">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Travel dreams"
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
                  placeholder="Places I long to explore."
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
