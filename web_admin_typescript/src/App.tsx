import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DeviceList from "./components/pages/DeviceList/DeviceList";
import AppBar from "./components/shared/appbar/Appbar";
import ClickPhoto from "./components/pages/clickPhoto/ClickPhoto";
import LoginPage from "./components/pages/auth/loginPage/LoginPage";
import DashBoard from "./components/pages/dashboard/DashBoard";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";

const App = () => {
  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path='/click' element={<ClickPhoto />}/> */}
          {/* <Route path='/test' element={<WsPhoto />}/> */}

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
          <Route path="/home" element={<ProtectedRoute />}>
            <Route path="/home" element={<DeviceList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
