import "../App.css";
import AddTaskHolder from "../components/AddTaskHolder";
import Header from "../components/Header";
import TaskList from "../components/TaskList";

function Home() {
  return (
    <div className="homeWrapper">
      <div className="underline">
        <span className="title"> Mes tâches </span>
      </div>
      <AddTaskHolder />
      <Header />
      <TaskList />
    </div>
  );
}

export default Home;
