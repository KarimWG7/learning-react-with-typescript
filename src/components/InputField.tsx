import "./styles.css";
import { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: React.FormEventHandler<HTMLFormElement>;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        className="input__box"
        type="text"
        value={todo}
        onChange={(e) => {
          setTodo((): string => {
            return e.target.value;
          });
        }}
        placeholder="Enter a Todo"
      />
      <button className="input__submit">Go</button>
    </form>
  );
};

export default InputField;
