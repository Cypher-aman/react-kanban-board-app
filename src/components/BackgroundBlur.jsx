const BackgroundBlur = function ({ full = false, onClick = null, md = false }) {
  return (
    <div
      onClick={() => onClick(false)}
      className={`fixed left-0 h-screen w-screen bg-black-dark opacity-70 ${
        full ? "top-0" : " top-[4rem]"
      } ${md ? "hidden" : ""}`}
    ></div>
  );
};

export default BackgroundBlur;
