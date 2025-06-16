import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
} from "@/components/ui";
import { CreateTaskDto } from "@/lib";
import { useGenerateTasksMutation } from "@/state/features/goals/goalApi";
import { useCreateTaskMutation } from "@/state/features/tasks/taskApi";

export function GenerateTasksModal({
  goalId,
  isOpen,
  setIsOpen,
  onAdded,
}: {
  goalId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onAdded: () => void;
}) {
  const [generateTasks, { data, isLoading, isSuccess }] =
    useGenerateTasksMutation();
  const [createTask] = useCreateTaskMutation();
  const [tasks, setTasks] = useState<CreateTaskDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [details, setDetails] = useState("");

  const handleGenerate = async () => {
    await generateTasks({
      goalId,
      goalDetails: details,
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      setTasks(data.tasks);
      setCurrentIndex(0);
    }
  }, [isSuccess, data, setTasks, setCurrentIndex]);

  const handleAdd = async () => {
    const task = tasks?.[currentIndex];
    if (task?.title && task?.description) {
      await createTask({ ...task });
      toast.success("Task added!");
      showNext();
    }
  };

  const showNext = () => {
    if (currentIndex + 1 < tasks.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.success("All tasks reviewed");
      setIsOpen(false);
      onAdded();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate AI Tasks</DialogTitle>
        </DialogHeader>

        {!tasks?.[currentIndex] ? (
          <>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe your goal in more detail..."
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                void handleGenerate();
              }}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <h3 className="font-bold text-lg">{tasks[currentIndex].title}</h3>
              <p>{tasks[currentIndex].description}</p>
              <div className="text-sm text-muted-foreground">
                <p>Importance: {tasks[currentIndex].importance}</p>
                <p>Urgency: {tasks[currentIndex].urgency}</p>
                <p>Difficulty: {tasks[currentIndex].difficulty}</p>
                <p>
                  Success Probability: {tasks[currentIndex]?.successProbability}
                  %
                </p>
                <p>
                  Estimated Time: {tasks[currentIndex].estimatedTime}{" "}
                  {tasks[currentIndex].estimatedTimeUnit}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={showNext}>
                Skip
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  void handleAdd();
                }}
              >
                Add Task
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
