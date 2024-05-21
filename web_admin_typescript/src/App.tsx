import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DeviceList from "./components/pages/DeviceList/DeviceList";
import AppBar from "./components/shared/appbar/Appbar";
import ClickPhoto from "./components/pages/clickPhoto/ClickPhoto";
import LoginPage from "./components/pages/auth/loginPage/LoginPage";
import DashBoard from "./components/pages/dashboard/DashBoard";
import RefillStockForm from "./components/pages/refillStockForm/RefillStockForm";
import AddMachineForm from "./components/pages/addMachineForm/AddMachiceForm";
import ViewRefillDetails from "./components/pages/viewRefillDetails/ViewRefillDetails";

const App = () => {
  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<DeviceList />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/refill-stock" element={<RefillStockForm />}/>
          <Route path="/register-machine" element={<AddMachineForm/>}/>
          <Route path="/refill-details" element={< ViewRefillDetails/>}/>
          
          {/* <Route path='/click' element={<ClickPhoto />}/> */}
          {/* <Route path='/test' element={<WsPhoto />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
