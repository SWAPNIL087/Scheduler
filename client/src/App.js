import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Schedule from './Components/AddSchedule';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/addSchedule' component={Schedule}/>
    </div>
    </Router>
  );
}

export default App;
