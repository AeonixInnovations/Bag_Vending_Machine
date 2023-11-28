import { useEffect, useState } from "react"
import { DeviceInterface } from "../../../@types/interface/deviceDetails/DeviceInterface"
import { getAllDeviceList } from "../../../utils/apis/Apis";
import DataTable from "../../shared/DataTable/DataTable";
import Spinner from "../../shared/spinner/Spinner";

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
  }
  const handleRefresh = async() =>{
    await getDeviceList();
  }
  useEffect(() => {
    getDeviceList();
  }, []);
  return (
    <div>
      {
        (loading) ? <Spinner /> :
          <DataTable deviceList={deviceList} handleRefresh={handleRefresh}/>
      }
    </div>
  )
}

export default DeviceList