import { PencilIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { updateDeviceMaxStock } from '../../../../utils/apis/Apis';

const EditCell = ({ device_id, data, handleRefresh }: { device_id: string, data: number, handleRefresh: () => void }) => {
    const [show, setShow] = useState<boolean>(false);
    const [value, setValue] = useState<number>(data);
    const handleShow = () => {
        setShow(true)
    }
    const handleChangeMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(Number(value));
    }
    const updateMAxStock = async () => {
        const payload = {
            device_id: device_id,
            max_stocks: value
        }
        const response = await updateDeviceMaxStock(payload);
        if (response?.status === 200) {
            setShow(false);
            handleRefresh();
            return;
        }
        alert("data update failed");

    }
    return (
        <>
            <div>
                {
                    !(show) ?
                        <div className='inline-flex items-center'>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {data}
                            </Typography>
                            <button onClick={handleShow} type="button" className="px-1 ms-4 py-1 text-xs font-medium text-center text-gray-700 bg-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279" />
                                </svg>
                            </button>
                        </div> :
                        <div className='inline-flex items-center'>
                            {/* <input defaultValue={value} onChange={handleChangeMaxValue} /> */}
                            <input type="text" id="maxstock" defaultValue={value} onChange={handleChangeMaxValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 w-10 "  />
                            <button className='ms-4' onClick={updateMAxStock}>Save</button>
                        </div>
                }
            </div>
        </>
    )
}

export default EditCell