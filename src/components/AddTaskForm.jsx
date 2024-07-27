/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { createTasks } from "../redux/slices/todoSlice";
import { useEffect, useState } from "react";

const initialInputState = { title: "", description: "" };

function AddTaskForm({ open }) {
  const [tasks, setTasks] = useState(initialInputState);
  const [empty, setEmpty] = useState(true);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasks((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (tasks.title || tasks.description) {
      setEmpty(false);
    }
    if (tasks.title === "" || tasks.description === "") {
      setEmpty(true);
    }
  }, [tasks]);

  const handleSubmit = () => {
    setTasks(initialInputState);

    if (tasks.title && tasks.description) {
      setEmpty(false);
      dispatch(createTasks(tasks));
      open();
    }
    setEmpty(true);
  };
  const message = empty ? (
    <span style={{ fontSize: 12, color: "red", fontStyle: "italic" }}>
      Ces ne doivent pas être vides ...
    </span>
  ) : (
    ""
  );
  return (
    <div className="form">
      <h1 className="title">Ajout d'une tâche</h1>

      <form className="inputs">
        <div className="input">
          <label>Titre de la tâche</label>
          <input
            name="title"
            onChange={handleChange}
            type="text"
            value={tasks.title}
            placeholder="Titre ...."
          />
        </div>
        <div className="input">
          <label>Description de la tâche</label>
          <textarea
            onChange={handleChange}
            type="text"
            value={tasks.description}
            name="description"
            className="in"
            placeholder="Description ...."
          />
        </div>
      </form>
      {message}
      <div className="formButtons">
        <button className="addButton" onClick={handleSubmit}>
          Ajouter
        </button>
        <button className="closeButton" onClick={() => open()}>
          Abandonner
        </button>
      </div>
    </div>
  );
}

export default AddTaskForm;
