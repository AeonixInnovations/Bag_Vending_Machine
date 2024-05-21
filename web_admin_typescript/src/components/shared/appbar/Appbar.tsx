// import { aeonix } from "../../../assets/images"
import { wbpcb } from "../../../assets/images";
import SideDrawer from "../sideDrawer/SideDrawer";

const Appbar = () => {
  return (
    <nav className="fixed flex w-full z-[50] h-16 bg-white shadow-md justify-between items-center px-5">
      <div className="w-[82%] items-center flex justify-between text-2xl font-semibold text-gray-700 text-start">
        Dashboard
      <SideDrawer/>
      </div>

    </nav>
  );
};

export default Appbar;
