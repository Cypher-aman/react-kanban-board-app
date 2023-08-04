import boardIcon from "../assets/icon-board.svg";
import closeEye from "../assets/eye-slash.1.png";
import { useDispatch, useSelector } from "react-redux";
import { setBoard, setTheme } from "../reducers/reducer";
import BackgroundBlur from "./BackgroundBlur";
import sunIcon from "../assets/icon-light-theme.svg";
import moonIcon from "../assets/icon-dark-theme.svg";

const Sidebar = function ({ boardList, setShowSidebar, setOpenAdd, mode }) {
  let board;

  const dark = useSelector((state) => state.user.darkMode);
  const dispatch = useDispatch();

  const setBoardInfo = () => {
    if (mode === "myBoards") {
      board = useSelector((state) => state.user.activeBoard);
    } else {
      board = useSelector((state) => state.user.sharedBoard);
    }
  };
  setBoardInfo();

  const handleChangeBoard = (e) => {
    dispatch(setBoard({ id: e.target.id, mode: "personal" }));
  };

  const handleTheme = () => {
    dispatch(setTheme());
    console.log(dark, "dark");
  };

  return (
    <>
      <div className="">
        <div className="md:hidden">
          <BackgroundBlur onClick={setShowSidebar} />
        </div>

        <div className="w-[264px] h-[327px] fixed top-20 left-2/4 -translate-x-2/4 rounded bg-white flex flex-col gap-2 md:left-0 md:translate-x-0 md:top-16 md:h-screen dark:bg-black-light md:rounded-none">
          <h2 className="title text-sm tracking-widest mb-5 pl-5 mt-4 text-grey-dark font-semibold ">
            ALL BOARDS {boardList.length}
          </h2>
          <div className="w-full  ">
            {boardList.map((b) => {
              return (
                <div className="boardName w-full h-min cursor-pointer">
                  <div
                    id={b.id}
                    className={`w-[90%] h-12 flex items-center gap-3 px-4 rounded-r-full ${
                      b.id === board.id ? "bg-blue-dark" : ""
                    }`}
                  >
                    <img className="h-4" src={boardIcon} alt="" />
                    <span
                      id={b.id}
                      onClick={handleChangeBoard}
                      className={`text-[15px]  ${
                        b.id === board.id
                          ? "text-white font-semibold"
                          : "text-grey-dark"
                      }`}
                    >
                      {b.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="boardName w-full h-min">
            <div className="w-[90%]  h-12 flex items-center gap-3 px-4 rounded-r-full">
              <img className="h-4" src={boardIcon} alt="" />
              <span
                onClick={() => setOpenAdd(true)}
                className="text-[15px] text-blue-dark font-semibold cursor-pointer"
              >
                +Create New Board
              </span>
            </div>
          </div>
          <div className="theme w-[90%] mx-auto">
            <div className="bg-grey-light w-full  md:mx-0 md:w-[90%] p-3 rounded-md flex justify-center items-center dark:bg-black-dark">
              <img
                src={moonIcon}
                alt="quarter moon with a star"
                className="text-grey-light mr-2"
              />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <div
                  onClick={handleTheme}
                  className={`w-10 h-5 bg-blue-dark rounded-full peer
                ${dark ? "after:-translate-x-5" : ""}
                 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white   after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600`}
                />
              </label>

              <img
                src={sunIcon}
                alt="sun with flare"
                className="text-grey-light ml-2"
              />
            </div>
          </div>
          <div
            onClick={() => setShowSidebar(false)}
            className="showHide h-full  translate-y-[70%]"
          >
            <div
              onClick={() => setShowSidebar(false)}
              className="md:flex gap-2 items-center justify-center cursor-pointer hidden "
            >
              <img
                className=" h-4 w-4"
                src={closeEye}
                alt="close eye png icon"
              />
              <p className=" font-semibold text-grey-dark cursor-pointer hover:text-blue-dark">
                Hide Sidebar
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
