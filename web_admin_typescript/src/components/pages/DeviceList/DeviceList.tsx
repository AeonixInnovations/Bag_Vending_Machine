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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [perPageItem, setPerPageItem] = useState<number>(10);

  // Event handler to handle menu item selection
  const handleSelect = async (value: number) => {
    console.log("handleSelect work", value);
    setPerPageItem(value);
    setPageNumber(1);
    // // Ensure state update is complete before fetching data
    // const updatedPerPageItem = perPageItem;
  
    // await getDeviceList(pageNumber, updatedPerPageItem);
  };

  const getDeviceList = async (pageNumber: number, perPageItem: number) => {
    setLoading(true);
    const response = await getAllDeviceList(pageNumber,perPageItem);
    setLoading(false);
    if (response?.status === 200) {
      setTotalPages(response?.data.totalPages);
      setDeviceList(response?.data.data);
    }
  };

  const handleRefresh = async () => {
    await getDeviceList(pageNumber,perPageItem);
  };

  const handlePrevious = async () => {
    setPageNumber((prev) => prev - 1); // Update the page number correctly by returning prev - 1

    // Check if the updated page number is greater than or equal to 1
    if (pageNumber - 1 >= 1) {
      await getDeviceList(pageNumber - 1, perPageItem); // Fetch data for the previous page
    }
  };

  const handleNext = async () => {
    // Check if the current page number is less than the total number of pages
    if (pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1); // Update the page number by incrementing it

      await getDeviceList(pageNumber + 1,perPageItem); // Fetch data for the next page
    }
  };

  useEffect(() => {
    getDeviceList(pageNumber,perPageItem);
  }, [perPageItem]);
  
  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center mx-auto mt-24 my-auto">
          <Loader />
        </div>
      ) : (
        <DataTable
          deviceList={deviceList}
          setDeviceList={setDeviceList}
          handleRefresh={handleRefresh}
          pageNumber={pageNumber}
          totalPages={totalPages}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleSelect={handleSelect}
        />
      )}
    </Layout>
  );
};

export default DeviceList;
