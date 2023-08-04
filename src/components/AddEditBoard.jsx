import BackgroundBlur from "./BackgroundBlur";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateBoard } from "../reducers/reducer";

const AddEditBoard = function ({ children, closeEdit, editBoard = true }) {
  const initialState = editBoard
    ? useSelector((state) => state.user.activeBoard)
    : {
        id: String(Math.floor(Math.random() * Date.now())),
        name: "",
        columns: [
          {
            id: String(Math.floor(Math.random() * Date.now())),
            name: "",
            tasks: [],
          },
          {
            id: String(Math.floor(Math.random() * Date.now())),
            name: "",
            tasks: [],
          },
        ],
      };

  const [board, setBoard] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setBoard(() => {
      return { ...board, [e.target.name]: e.target.value };
    });
  };

  const handleColChange = (e, index) => {
    const updatedList = [...board.columns];
    updatedList[index] = { ...updatedList[index], name: e.target.value };
    setBoard(() => {
      return {
        ...board,
        columns: updatedList,
      };
    });
  };

  const handleColAdd = () => {
    setBoard(() => {
      return {
        ...board,
        columns: [
          ...board.columns,
          {
            id: String(Math.floor(Math.random() * Date.now())),
            name: "",
            tasks: [],
          },
        ],
      };
    });
  };

  const handleColDelete = (index) => {
    const updatedList = [...board.columns];
    updatedList.splice(index, 1);
    setBoard(() => {
      return {
        ...board,
        columns: updatedList,
      };
    });
  };

  const handleSubmit = () => {
    dispatch(updateBoard({ board, mode: "personal" }));
    closeEdit(false);
  };

  return (
    <>
      <BackgroundBlur full={true} onClick={closeEdit} />
      <div className="fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-[21rem] bg-white p-4 rounded-md flex flex-col gap-2 font-jakarta dark:bg-black-light md:w-[30rem]">
        <p className="font-semibold mb-4 dark:text-white font-jakarta">
          {children} Board
        </p>
        <label
          className="text-xs font-semibold text-grey-dark dark:text-white"
          for="boardTitle"
        >
          Board Name
        </label>
        <input
          className="border border-grey-dark outline-none border-opacity-40 rounded-md focus:border-blue-dark focus:border-opacity-100 px-3 py-2 text-sm font-semibold mb-4 dark:bg-black-light dark:text-white"
          value={board.name}
          onChange={handleChange}
          name="name"
          type="text"
          required
        ></input>
        <label
          for="columns"
          class="block text-xs  text-grey-dark font-bold dark:text-white"
        >
          Columns
        </label>
        {board.columns.map((col, index) => (
          <div className="flex items-center gap-3">
            <input
              onChange={(e) => handleColChange(e, index)}
              value={col.name}
              name="name"
              id={col.id}
              type="text"
              className="border border-grey-dark outline-none border-opacity-40 rounded-md focus:border-blue-dark focus:border-opacity-100 px-3 py-2 text-sm w-[90%] font-semibold dark:bg-black-light dark:text-white"
              required
            />
            <img
              onClick={() => handleColDelete(index)}
              src={crossIcon}
              alt="x shape icon"
              className="h-4 cursor-pointer"
            />
          </div>
        ))}
        <button
          onClick={handleColAdd}
          className="bg-blue-dark p-3 rounded-full text-white text-sm font-bold mt-3 mb-3 hover:bg-blue-light"
        >
          + Add New Column
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-dark p-3 rounded-full text-white text-sm font-bold mb-5 hover:bg-blue-light"
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default AddEditBoard;
