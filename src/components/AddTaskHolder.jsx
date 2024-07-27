import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
const AddTaskHolder = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="addHolder">
      <h1 className="title"> Tâche du jour</h1>
      <button className="addButton" onClick={() => setOpen(true)}>
        {" "}
        <span> +</span> Nouvelle Tâche
      </button>

      {open && <AddTaskForm open={setOpen} />}
    </div>
  );
};

export default AddTaskHolder;
