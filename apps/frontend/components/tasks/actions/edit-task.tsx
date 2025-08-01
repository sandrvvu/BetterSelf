"use-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Spinner } from "@/components/shared";
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MultiSelect,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Textarea,
} from "@/components/ui";
import { Task, TaskSchema, TaskSchemaType, TimeUnit } from "@/lib";
import { cn } from "@/lib/utils";
import {
  useGetAvailableDependenciesQuery,
  useUpdateTaskMutation,
} from "@/state/features/tasks/taskApi";

export default function EditTaskForm({
  task,
  setIsOpen,
  onEdit,
}: {
  task: Task;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onEdit: () => void;
}) {
  const [updateTask, { data, isLoading, isSuccess }] = useUpdateTaskMutation();
  const { data: availableDependencies, isLoading: isLoadingDependencies } =
    useGetAvailableDependenciesQuery({ goalId: task.goalId, taskId: task.id });

  const form = useForm<TaskSchemaType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      importance: task.importance,
      urgency: task.urgency,
      difficulty: task.difficulty,
      successProbability: task.successProbability,
      dependencies: task.dependencies,
      targetDate: task.targetDate ? new Date(task.targetDate) : undefined,
      estimatedTime: task.estimatedTime ? task.estimatedTime : undefined,
      estimatedTimeUnit: task.estimatedTimeUnit,
    },
  });

  async function onSubmit(values: TaskSchemaType) {
    await updateTask({
      id: task.id,
      data: values,
    });
  }

  useEffect(() => {
    if (isSuccess && data) {
      setIsOpen(false);
      onEdit();
      toast.success("Task edited successfully.");
    }
  }, [isSuccess, data, setIsOpen, onEdit]);

  if (isLoadingDependencies) {
    return <Spinner />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-4"
      >

<div className="flex flex-col gap-4 overflow-y-auto px-2 custom-scrollbar max-h-[500px]">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Task description (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          {(["importance", "urgency", "difficulty"] as const).map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="capitalize">{name} (1-5)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={field.value}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="successProbability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Success Probability (%)</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[field.value]}
                  onValueChange={(val) => field.onChange(val[0])}
                />
              </FormControl>
              <div className="text-sm text-muted-foreground mt-1">
                {field.value}%
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="estimatedTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Estimated Time</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 30"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estimatedTimeUnit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Time Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      className="hover:cursor-pointer hover:bg-neutral-100"
                      value={TimeUnit.MINUTES}
                    >
                      Minutes
                    </SelectItem>
                    <SelectItem
                      className="hover:cursor-pointer hover:bg-neutral-100"
                      value={TimeUnit.HOURS}
                    >
                      Hours
                    </SelectItem>
                    <SelectItem
                      className="hover:cursor-pointer hover:bg-neutral-100"
                      value={TimeUnit.DAYS}
                    >
                      Days
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {availableDependencies && (
          <FormField
            control={form.control}
            name="dependencies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dependencies</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={availableDependencies.map((dep) => ({
                      value: dep.id,
                      label: dep.title,
                    }))}
                    selected={field.value || []}
                    onChange={field.onChange}
                    placeholder="Select tasks..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
   </div>
   
        <FormItem>
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
