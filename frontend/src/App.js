import {Navigation} from './components/navigation';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './containers/Home';
import TaskCard from './components/taskCard';




function App() {
  return (
    <div style ={{width: '100%', height: '100%'}}>
      <Navigation/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
