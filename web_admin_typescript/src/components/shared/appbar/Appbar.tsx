// import { aeonix } from "../../../assets/images"
import { wbpcb } from "../../../assets/images";
import { DrawerPlacement } from "../sideDrawer/SideDrawer";

const Appbar = () => {
  return (
    <nav className="fixed flex w-full z-[50] h-16 bg-white shadow-md justify-between items-center px-5">
      <div className="text-2xl font-semibold text-gray-700 text-start">
        Dashboard
      </div>
      <div className="">

      <DrawerPlacement/>
      </div>
    </nav>
  );
};

export default Appbar;
