const ElipsisMenu = function ({
  children,
  closeElipsis,
  openEdit,
  openDelete,
}) {
  const handleEdit = () => {
    openEdit(true);
    closeElipsis(false);
  };

  const handleDelete = () => {
    openDelete(true);
    closeElipsis(false);
  };

  return (
    <div className="absolute bg-white drop-shadow-2xl shadow-black-vDark top-9 right-0 p-3 flex flex-col gap-4 w-36 rounded-md text-xs dark:bg-black-light md:text-sm">
      <p
        onClick={handleEdit}
        className="text-grey-dark font-semibold cursor-pointer "
      >
        Edit {children}
      </p>
      <p
        onClick={handleDelete}
        className="text-red-dark font-semibold cursor-pointer"
      >
        Delete {children}
      </p>
    </div>
  );
};

export default ElipsisMenu;
