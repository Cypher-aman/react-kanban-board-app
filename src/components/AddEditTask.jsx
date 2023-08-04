import { useState } from "react";
import crossIcon from "../assets/icon-cross.svg";
import BackgroundBlur from "./BackgroundBlur";
import { useDispatch, useSelector } from "react-redux";
import { setTaskColumn, updateTask } from "../reducers/reducer";

const AddEditTask = function ({
  colId = "",
  task = null,
  children,
  setOpen,
  closeModal = null,
}) {
  const board = useSelector((state) => state.user.activeBoard);
  const dispatch = useDispatch();

  const prevColId = colId || board.columns[0].id;
  const [nextColId, setNextColId] = useState(colId || board.columns[0].id);
  const init = task
    ? { ...task }
    : {
        id: String(Math.floor(Math.random() * Date.now())),
        title: "",
        description: "",
        status: "",
        subtasks: [
          {
            id: String(Math.floor(Math.random() * Date.now())),
            title: "",
            isCompleted: false,
          },
          {
            id: String(Math.floor(Math.random() * Date.now())),
            title: "",
            isCompleted: false,
          },
          {
            id: String(Math.floor(Math.random() * Date.now())),
            title: "",
            isCompleted: false,
          },
        ],
      };

  const [initTask, setInitTask] = useState(init);

  const handleChange = (e) => {
    setInitTask(() => {
      return {
        ...initTask,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubTaskChange = (e, index) => {
    const newSubtasks = [...initTask.subtasks];
    newSubtasks[index] = { ...newSubtasks[index], title: e.target.value };

    setInitTask(() => {
      return {
        ...initTask,
        subtasks: newSubtasks,
      };
    });
  };

  const handleColumnChange = (e) => {
    setNextColId(e.target.value);
  };

  const handleAddSubtask = (e) => {
    const newSubtasks = initTask.subtasks;
    setInitTask(() => {
      return {
        ...initTask,
        subtasks: [
          ...newSubtasks,
          {
            id: String(Math.floor(Math.random() * Date.now())),
            title: "",
            isCompleted: false,
          },
        ],
      };
    });
  };

  const handleDeleteSubtask = (index) => {
    const newSubtasks = [...initTask.subtasks];
    newSubtasks.splice(index, 1);

    setInitTask(() => {
      return {
        ...initTask,
        subtasks: newSubtasks,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({ colId: prevColId, task: initTask, mode: "personal" })
    );
    if (nextColId !== prevColId)
      dispatch(
        setTaskColumn({
          prevColId,
          nextColId,
          taskId: initTask.id,
          mode: "personal",
        })
      );

    setOpen(false);
    closeModal !== null ? closeModal(false) : "";
  };

  return (
    <div className="">
      <BackgroundBlur onClick={setOpen} full={true} />
      <div className="fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[21.4rem] h-[38rem] bg-white rounded-md p-6 flex flex-col gap-3 font-jakarta overflow-x-scroll no-scrollbar md:w-[30rem] dark:bg-black-light">
        <p className="text-blackvDark font-bold text-base mb-2 dark:text-white">
          {children || "Edit Task"}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label
            htmlFor="title"
            class="block text-xs text-grey-dark font-bold dark:text-white"
          >
            Task Name
          </label>
          <input
            onChange={handleChange}
            value={initTask.title}
            name="title"
            id="title"
            type="text"
            className="border border-grey-dark outline-none border-opacity-40 rounded-md focus:border-blue-dark focus:border-opacity-100 p-2 text-sm mb-4 py-2 px-3 dark:bg-black-light dark:text-white"
            required
            placeholder="e.g. Take coffe break"
          />
          <label
            htmlFor="desc"
            className="block text-xs  text-grey-dark font-bold dark:text-white"
          >
            Description
          </label>
          <div>
            <textarea
              onChange={handleChange}
              value={initTask.description}
              name="description"
              id="desc"
              className="border border-grey-dark outline-none border-opacity-40 rounded-md focus:border-blue-dark focus:border-opacity-100 p-2 text-sm mb-4 resize-none overflow-y-auto w-full dark:text-white dark:bg-black-light"
              rows="6"
            ></textarea>
          </div>
          <label
            for="subtask"
            class="block text-xs  text-grey-dark font-bold dark:text-white "
          >
            Subtasks
          </label>
          {initTask.subtasks.map((st, index) => (
            <div className="flex items-center gap-3">
              <input
                onChange={(e) => handleSubTaskChange(e, index)}
                value={st.title}
                id={st.id}
                type="text"
                className="border border-grey-dark outline-none border-opacity-40 rounded-sm focus:border-blue-dark focus:border-opacity-100 px-3 py-2 text-sm w-[90%] dark:bg-black-light dark:text-white"
                required
                placeholder="e.g. Make coffe"
              />
              <img
                onClick={() => handleDeleteSubtask(index)}
                src={crossIcon}
                alt="x shape icon"
                className="h-4 cursor-pointer"
              />
            </div>
          ))}
          <button
            onClick={handleAddSubtask}
            className="bg-blue-dark p-3 rounded-full text-white text-sm font-bold mt-3 mb-5 hover:bg-blue-light"
          >
            + Add New Subtask
          </button>

          <select
            value={nextColId}
            onChange={handleColumnChange}
            className="border border-grey-dark border-opacity-50 rounded p-2 px-3 text-grey-vDark text-sm font-semibold focus:border-blue-dark outline-none dark:bg-black-light dark:text-white"
          >
            {board.columns.map((col) => (
              <option value={col.id}>{col.name}</option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-dark p-3 rounded-full text-white text-sm font-bold mt-3 mb-4 hover:bg-blue-light"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditTask;
