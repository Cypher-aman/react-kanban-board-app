import { useState } from "react";
import ViewTask from "./ViewTask";

const Task = function ({ task, colId }) {
  const totalCompleted = task.subtasks?.reduce((acc, st) => {
    if (st.isCompleted) return (acc += 1);
    return acc;
  }, 0);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center w-72 min-h-24 flex-col bg-white rounded-md shadow-md p-4 font-jakarta text-sm gap-3 dark:bg-black-light">
        <p
          onClick={() => setOpen(true)}
          className="cursor-pointer task-title font-bold 
            dark:text-white text-black-vDark hover:text-blue-dark text-[15px]"
        >
          {task.title}
        </p>
        <p className="text-grey-dark font-semibold">
          {totalCompleted} of {task.subtasks.length}
        </p>
      </div>
      {open && (
        <>
          <ViewTask task={task} colId={colId} onClick={setOpen}></ViewTask>
        </>
      )}
    </>
  );
};

export default Task;
