import { useState } from "react";
import logoMobile from "../assets/logo-mobile.svg";
import dropDown from "../assets/icon-chevron-down.svg";
import plusIcon from "../assets/Group 27 (1).png";
import threeDot from "../assets/Group 6.png";
import AddEditTask from "../components/AddEditTask";
import ElipsisMenu from "./ElipsisMenu";
import { useSelector } from "react-redux";

const Navbar = function ({
  showSidebar,
  setShowSidebar,
  setOpenEdit,
  children,
  openDelete,
}) {
  const board = useSelector((state) => state.user.activeBoard);

  const [openAdd, setOpenAdd] = useState(false);
  const [showElipsis, setShowElipsis] = useState(false);

  return (
    <>
      <navbar
        className=" p-3 md:p-6 h-[4rem] w-screen dark:bg-black-light
    bg-white fixed flex justify-between items-center  top-0 left-0 font-jakarta"
      >
        <div className="flex gap-2 items-center justify-center ">
          <img
            className="mr-2"
            src={logoMobile}
            alt="kanban-task-manager-app-logo"
          />
          <h1
            className={`hidden md:block font-bold text-2xl border-r border-opacity-60 border-grey-dark dark:text-white pr-14`}
          >
            Kanban
          </h1>
          <h2 className="font-bold text-xl dark:text-white">{children}</h2>
          <img
            onClick={() => setShowSidebar(!showSidebar)}
            className="h-2 md:hidden"
            src={dropDown}
            alt="arrow pointing downwards"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          {
            // TODO : fix the plus icon view
          }
          <img
            className="md:hidden"
            src={plusIcon}
            alt="plus icon"
            onClick={() => setOpenAdd(true)}
          />
          <button
            className="hidden md:block bg-blue-dark p-3 rounded-full text-white text-sm font-bold  hover:bg-blue-light"
            onClick={() => setOpenAdd(true)}
          >
            + Add New Subtask
          </button>
          <div className="relative">
            <img
              onClick={() => setShowElipsis(!showElipsis)}
              className="cursor-pointer"
              src={threeDot}
              alt="three dot verticaly"
            />
            {showElipsis && (
              <ElipsisMenu
                closeElipsis={setShowElipsis}
                openDelete={openDelete}
                openEdit={setOpenEdit}
              >
                Board
              </ElipsisMenu>
            )}
          </div>
        </div>
        {openAdd && <AddEditTask setOpen={setOpenAdd} />}
      </navbar>
    </>
  );
};

export default Navbar;
