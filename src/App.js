import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'; 
import Home from './components/Home'
import New from './components/New'
import { BrowserRouter, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Route path="/" component={Home} exact></Route>
    <Route path="/new" component={New} exact></Route>
    </BrowserRouter>
  );
}

export default App;
