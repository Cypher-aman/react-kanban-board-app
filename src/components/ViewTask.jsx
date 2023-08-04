import { useDispatch, useSelector } from "react-redux";
import threeDot from "../assets/icon-vertical-ellipsis.svg";
import BackgroundBlur from "./BackgroundBlur";
import {
  deleteTask,
  setSubtaskStatus,
  setTaskColumn,
} from "../reducers/reducer";
import AddEditTask from "./AddEditTask";
import { useState } from "react";
import ElipsisMenu from "./ElipsisMenu";
import Delete from "./Delete";

const ViewTask = function ({ task, onClick, colId }) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.user.activeBoard);

  const [openElipsis, setOpenElipsis] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClick = (e) => {
    dispatch(
      setSubtaskStatus({
        colId,
        taskId: task.id,
        subId: e.target.id,
        mode: "personal",
      })
    );
    console.log(e.target.id);
  };

  const handleColumnChange = (e) => {
    dispatch(
      setTaskColumn({
        prevColId: colId,
        nextColId: e.target.value,
        taskId: task.id,
        mode: "personal",
      })
    );
  };

  const handleDeleteTask = () => {
    dispatch(
      deleteTask({
        colId,
        taskId: task.id,
      })
    );
    onClick(false);
  };

  return (
    <div className="font-jakarta ">
      <BackgroundBlur onClick={onClick} full={true} />
      <div className="flex flex-col fixed items-stretch top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 w-[21.4rem] bg-white p-5 py-6 rounded-md md:w-[30rem] dark:bg-black-light">
        <div className="flex justify-between gap-2 relative">
          <p className="font-bold mb-4 text-lg leading-6 dark:text-white">
            {task.title}
          </p>
          <img
            onClick={() => setOpenElipsis(!openElipsis)}
            className="w-[0.28rem] h-5 cursor-pointer"
            src={threeDot}
            alt="three vertical dot"
          />
          {openElipsis && (
            <ElipsisMenu
              closeElipsis={setOpenElipsis}
              openEdit={setOpenEdit}
              openDelete={setOpenDelete}
            >
              Task
            </ElipsisMenu>
          )}
        </div>
        <p className=" mb-4 text-grey-dark text-[0.85rem] leading-6 ">
          {task.description}
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-grey-dark mb-1">Subtask</p>

          {task.subtasks.map((st) => {
            return (
              <div
                id={st.id}
                className={`taskBox flex bg-grey-vLight p-3 gap-3 leading-5 text-sm dark:bg-black-dark dark:text-white font-semibold rounded ${
                  st.isCompleted
                    ? "line-through text-grey-dark dark:text-grey-dark"
                    : "text-black-vDark"
                }`}
              >
                {st.isCompleted ? (
                  <input
                    id={st.id}
                    onClick={handleClick}
                    className=""
                    type="checkbox"
                    checked
                  />
                ) : (
                  <input
                    id={st.id}
                    onClick={handleClick}
                    className=""
                    type="checkbox"
                  />
                )}
                <p className="font-jakarta text-[0.8rem]">{st.title}</p>
              </div>
            );
          })}

          <div className="flex flex-col mt-4 ">
            <p className="text-grey-dark font-semibold text-sm">
              Current Satus
              <select
                onChange={handleColumnChange}
                value={colId}
                className="mt-2 block border border-grey-dark outline-none w-full p-1 px-2 text-black-vDark
              text-sm font-semibold dark:bg-black-light dark:text-white"
              >
                {board.columns.map((column) => {
                  return <option value={column.id}>{column.name}</option>;
                })}
              </select>
            </p>
          </div>
        </div>
      </div>
      {openEdit && (
        <AddEditTask
          colId={colId}
          task={task}
          closeModal={onClick}
          setOpen={setOpenEdit}
        >
          Edit
        </AddEditTask>
      )}
      {openDelete && (
        <Delete
          title="Task"
          closeModal={setOpenDelete}
          deleteFunction={handleDeleteTask}
        >
          {task.title}
        </Delete>
      )}
    </div>
  );
};

export default ViewTask;
