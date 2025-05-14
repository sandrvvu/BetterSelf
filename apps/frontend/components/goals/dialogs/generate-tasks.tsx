import { Dispatch, SetStateAction,useState } from "react";
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
}: {
  goalId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [generateTasks, { data, isLoading }] = useGenerateTasksMutation();
  const [createTask] = useCreateTaskMutation();
  const [tasks, setTasks] = useState<CreateTaskDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [details, setDetails] = useState("");

  const handleGenerate = async () => {
    const result = await generateTasks({
      goalId,
      goalDetails: details,
    }).unwrap();
    setTasks(result.tasks);
    setCurrentIndex(0);
  };

  const handleAdd = async () => {
    if (tasks) {
      await createTask({ goalId, ...tasks[currentIndex] });
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate AI Tasks</DialogTitle>
        </DialogHeader>

        {tasks.length === 0 ? (
          <>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe your goal in more detail..."
            />
            <Button onClick={handleGenerate} disabled={isLoading}>
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
                <p>Estimated Time: {tasks[currentIndex].estimatedTime}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={showNext}>
                Skip
              </Button>
              <Button onClick={handleAdd}>Add Task</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
