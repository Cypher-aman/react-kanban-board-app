import Task from "./Task";

const Columns = function ({ column }) {
  return (
    <div id="columns">
      <div className="flex flex-col gap-5 p-2 min-h-screen">
        <p className="text-grey-dark font-semibold uppercase tracking-widest text-sm">
          {column.name}
        </p>

        {column.tasks.length !== 0 ? (
          column.tasks.map((task) => (
            <Task task={task} colId={column.id}></Task>
          ))
        ) : (
          <div className="w-72 h-7"> </div>
        )}
      </div>
    </div>
  );
};

export default Columns;
