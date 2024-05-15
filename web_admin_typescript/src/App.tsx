import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DeviceList from "./components/pages/DeviceList/DeviceList";
import AppBar from "./components/shared/appbar/Appbar";
import ClickPhoto from "./components/pages/clickPhoto/ClickPhoto";
import LoginPage from "./components/pages/auth/loginPage/LoginPage";
import DashBoard from "./components/pages/dashboard/DashBoard";

const App = () => {
  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<DeviceList />} />
          <Route path="/dashbaord" element={<DashBoard />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path='/click' element={<ClickPhoto />}/> */}
          {/* <Route path='/test' element={<WsPhoto />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
