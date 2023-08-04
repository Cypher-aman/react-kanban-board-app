import { useSelector, useDispatch } from "react-redux";
import { setBoard, deleteBoard } from "../reducers/reducer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Columns from "../components/Column";
import Sidebar from "../components/Sidebar";
import openEye from "../assets/Group 3.png";
import Navbar from "../components/Navbar";
import AddEditBoard from "../components/AddEditBoard";
import Delete from "../components/Delete";

const MyBoards = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const board = useSelector((state) => state.user.activeBoard);
  const user = useSelector((state) => state.user.user);
  const darkMode = useSelector((state) => state.user.darkMode);

  const [showSidebar, setShowSidebar] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    if (!user.id) navigate("/login");
    dispatch(
      setBoard({
        id: "board1",
        mode: "personal",
      })
    );
    console.log(board);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      console.log("dark");
    }
    if (!darkMode) {
      document.documentElement.classList.remove("dark");
      console.log("light");
    }
  }, [darkMode]);

  const deleteBoardFunction = () => {
    dispatch(deleteBoard(board.id));
    setOpenDelete(false);
  };

  return (
    <>
      <div className="">
        <div className="conatiner relative font-jakarta">
          {board && (
            <>
              {showSidebar ? (
                <Sidebar
                  boardList={user.myBoards}
                  setShowSidebar={setShowSidebar}
                  mode="myBoards"
                  setOpenAdd={setOpenAdd}
                />
              ) : (
                <div
                  onClick={() => setShowSidebar(true)}
                  className="fixed bottom-14 left-0 hidden md:block"
                >
                  <img src={openEye} alt="" />
                </div>
              )}

              <Navbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                setOpenEdit={setOpenEdit}
                openDelete={setOpenDelete}
              >
                {board.name}
              </Navbar>
              <div className={`mt-2 ${showSidebar ? "md:ml-[265px]" : ""}`}>
                <ShowColumns board={board} />
              </div>
            </>
          )}
        </div>
      </div>
      {openEdit && <AddEditBoard closeEdit={setOpenEdit}>Edit</AddEditBoard>}
      {openAdd && (
        <AddEditBoard closeEdit={setOpenAdd} editBoard={false}>
          Add New
        </AddEditBoard>
      )}
      {openDelete && (
        <Delete
          title="board"
          deleteFunction={deleteBoardFunction}
          closeModal={setOpenDelete}
        >
          {board.name}
        </Delete>
      )}
    </>
  );
};

const ShowColumns = function ({ board }) {
  return (
    <div className="board flex gap-6 px-2 pt-16 no-scrollbar scrollbar-hide overflow-scroll bg-grey-vLight dark:bg-black-dark -mx-1">
      {board.columns.map((column) => (
        <Columns column={column}></Columns>
      ))}
      <div className="min-w-[18rem] h-screen bg-grey-light rounded-md flex justify-center items-center dark:bg-black-light ">
        <p
          onClick={() => setShowEditBoard(true)}
          className="font-bold text-blue-dark cursor-pointer"
        >
          +Add new column
        </p>
      </div>
    </div>
  );
};

export default MyBoards;
