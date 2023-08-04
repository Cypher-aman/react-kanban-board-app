import BackgroundBlur from "./BackgroundBlur";

const Delete = function ({ title, children, deleteFunction, closeModal }) {
  return (
    <>
      <BackgroundBlur full={true} onClick={closeModal}></BackgroundBlur>
      <div className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4  w-[21rem] bg-white p-6 font-jakarta flex flex-col gap-4 rounded-md md:w-[26rem] md:p-8 dark:bg-black-light">
        <p className="text-red-dark font-bold mb-2 text-lg">
          Delete this {title}?
        </p>
        <p className="font-medium text-grey-dark text-[.8rem] leading-6 mb-3">
          Are you sure you want to delete the &nbsp;
          <span className="text-black-dark font-semibold dark:text-grey-light">
            {children}
          </span>
          {title === "task"
            ? " task and its subtasks? "
            : " board and its columns? "}
          This action cannot be reversed.
        </p>
        <div className="flex flex-col gap-3 md:flex-row">
          <button
            onClick={deleteFunction}
            className="bg-red-dark p-2 py-3 text-sm font-semibold text-white rounded-full cursor-pointer hover:bg-red-light md:w-full"
          >
            Delete
          </button>
          <button
            onClick={() => closeModal(false)}
            className="bg-grey-light p-2 py-3 text-sm font-semibold text-blue-dark rounded-full hover:bg-blue-dark cursor-pointer md:w-full hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Delete;
