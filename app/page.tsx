import TasksPage from "./tasks/page";

export default function Home() {
  return (
    <div>
      Hello you! <br></br>Welcome to your Personal Task Manager!
      <nav className="flex p-8" />
      <TasksPage />
    </div>
  );
}
