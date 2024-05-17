import { useEffect, useState } from "react";
import { DeviceInterface } from "../../../@types/interface/deviceDetails/DeviceInterface";
import { getAllDeviceList } from "../../../utils/apis/Apis";
import DataTable from "../../shared/DataTable/DataTable";
import Spinner from "../../shared/spinner/Spinner";
import Appbar from "../../shared/appbar/Appbar";
import Layout from "../../layout/Layout";
import Loader from "../../shared/loader/Loader";

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState<DeviceInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getDeviceList = async () => {
    setLoading(true);
    const response = await getAllDeviceList();
    setLoading(false);
    if (response?.status === 200) {
      setDeviceList(response?.data.data);
    }
  };

  const handleRefresh = async () => {
    await getDeviceList();
  };

  useEffect(() => {
    getDeviceList();
  }, []);
  return (
    <Layout>
      {/* <Appbar /> */}
      {loading ? (
        <div className="flex justify-center items-center mx-auto mt-24 my-auto">
          <Loader />
        </div>
      ) : (
        <DataTable
          deviceList={deviceList}
          setDeviceList={setDeviceList}
          handleRefresh={handleRefresh}
        />
      )}
    </Layout>
  );
};

export default DeviceList;
