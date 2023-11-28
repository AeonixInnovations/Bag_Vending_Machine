import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import DeviceList from './components/pages/DeviceList/DeviceList';
import AppBar from './components/shared/appbar/Appbar';
import ClickPhoto from './components/pages/clickPhoto/ClickPhoto';
import WsPhoto from './components/pages/wsPhoto';

const App = () => {
  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>}/>
          <Route path='/home' element={<DeviceList />}/>
          {/* <Route path='/click' element={<ClickPhoto />}/> */}
          <Route path='/test' element={<WsPhoto />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
