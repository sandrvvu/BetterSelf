"use-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
  Textarea,
} from "@/components/ui";
import {
  Info,
  VisionBoard,
  VisionBoardSchema,
  VisionBoardSchemaType,
} from "@/lib";
import { useGetGoalOptionsQuery } from "@/state/features/goals/goalApi";
import { useUpdateVisionBoardMutation } from "@/state/features/vision-boards/visionBoardApi";

export default function EditVisionBoardForm({
  board,
  setIsOpen,
}: {
  board: VisionBoard;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [updateVisionBoard, { data, isLoading, isSuccess }] =
    useUpdateVisionBoardMutation();

  const { data: options, isLoading: isLoadingOptions } =
    useGetGoalOptionsQuery();

  const form = useForm<VisionBoardSchemaType>({
    resolver: zodResolver(VisionBoardSchema),
    defaultValues: {
      title: board.title,
      description: board.description,
      goalId: board.goalId,
    },
  });

  async function onSubmit(values: VisionBoardSchemaType) {
    await updateVisionBoard({ id: board.id, data: values });
  }

  useEffect(() => {
    if (isSuccess && data) {
      setIsOpen(false);
      toast.success("Vision board edited successfully.");
    }
  }, [isSuccess, data, setIsOpen]);

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
                      <SelectItem
                        key={goal.id}
                        value={goal.id}
                        className="cursor-pointer hover:bg-neutral-100"
                      >
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
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </FormItem>
      </form>
    </Form>
  );
}
