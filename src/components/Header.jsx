import { useSelector } from "react-redux";
import { selectAllTodos } from "../redux/slices/todoSlice";
import { useState } from "react";

const options = [
  {
    id: 1,
    title: "Toutes",
  },
];

function Header() {
  const [number, setNumber] = useState(0);
  const tasks = useSelector(selectAllTodos);
  const [totalTodos] = useState(tasks.length);

  const listOptions = options.map((option, index) => (
    <div className="optionContainer" key={option.id}>
      <span
        style={{
          color: index === number ? "#034ac5" : "#222",
        }}
        className="singleOption"
        onClick={() => {
          setNumber(index);
        }}
      >
        {option.title}
        <div
          style={{ backgroundColor: index === number && "#034ac5" }}
          className="numberOption"
        >
          {option.title === "Toutes" && totalTodos}
        </div>
      </span>
      {index < 3 && <span>|</span>}
    </div>
  ));

  return (
    <div>
      <div className="options">{listOptions}</div>
    </div>
  );
}

export default Header;
