
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";
import React, { useCallback, useEffect, useState } from "react";
import VideoBox from "../../shared/videoBox/VideoBox";
import Alert from "../../shared/alert/Alert";

import { Blob } from 'buffer'
import { log } from "console";

const ws = new W3CWebSocket('ws://192.168.1.4:9997');

const ClickPhoto = () => {
  //Room State
  const [room, setRoom] = useState("");
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [image,setImage]=useState<string>('');

  // states States
  const [reset, setReset] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);

  const sendImageList = () => {
    setReset(false);
  };

  const handleClickImage = () => {
    console.log("clicked");
    setImageList(prevImageList => [...prevImageList, image])
  }

  const resetImageList = () => {
    setReset(true);
    setOpenAlert(true);
    setImageList([]);
  }

  const handleChangeDeviceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRoom(value);
  }

  const handleOpenAlert = () => {
    console.log("hello");
    setOpenAlert(false);
  }

  useEffect(() => {
    ws.onopen = () => {
        console.log('WebSocket Client Connected');
    };

    ws.onmessage = (message: IMessageEvent) => {
        let image = URL.createObjectURL(message.data as unknown as Blob );
        console.log(image);
        setImage(image);
    };
})


  return (
  
      <div className="flex flex-col min-h-screen py-20 justify-around align-middle items-center">
        {
          (openAlert) ?
          <div className="fixed top-20 left-0.5 sm:left-1/3 z-40">
            <Alert handleClose={handleOpenAlert} />
          </div>:
          null
        }
        {
          (!isConnected) ? <div className="flex flex-wrap mb-5 justify-center gap-3 items-center mx-10">
            <label htmlFor="voice-search" className="sr-only">Connect</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                </svg>
              </div>
              <input type="text" onChange={e => handleChangeDeviceId(e)} id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search Devices..." required />

            </div>
            <button onClick={()=>{console.log("clicked");
            }} className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>Connect
            </button>
          </div> :
            <div className="flex flex-col w-full items-center">
              <VideoBox />
              <div className="flex flex-row flex-wrap justify-center mt-10">
                <button type="button" onClick={handleClickImage} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Click Photo</button>
                <button type="button" onClick={resetImageList} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Make Pdf</button>
              </div>
            </div>
        }
        <div className="h-20 min-w-full flex overflow-y-scroll">
          {
            imageList.map((k, v) => {
              return (
                <img className="me-2" src={k} key={v} alt="images" />
              )
            })
          }
        </div>
      </div>
  );
}

export default ClickPhoto;
