
import TaskCard from './components/taskCard';
import DisplayTasks from './pages/DisplayTasks'

const user = {
  username:"username_test",
  tasks:[
      { name:"name_test1", second_title: "Second title test1", content: "content test1"},
      { name:"name_test2", second_title: "Second title test2", content: "content test2"},
      { name:"name_test3", second_title: "Second title test3", content: "content test3"}
  ]
}

function App() {
  return (
    <div>
      <div>Hello This is Doit</div>
      <DisplayTasks tasks = {user.tasks}/>
    </div>
  );
}

export default App;
