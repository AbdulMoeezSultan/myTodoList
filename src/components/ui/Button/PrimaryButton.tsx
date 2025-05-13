const PrimaryButton = ({ Name, Function }: PropsType) => {
  return (
    <button
      className=" border p-2 rounded-3xl SecondaryColor text-lg w-32"
      onClick={Function}
    >
      {Name}
    </button>
  );
};

type PropsType = {
  Name: string;
  Function: () => void;
};

export default PrimaryButton;
