import { useEffect, useState } from 'react';
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";
import { Blob } from 'buffer'

const client = new W3CWebSocket('ws://192.168.1.4:9997');

const WsPhoto = () => {
    const [image,setImage]=useState<string>();
    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message: IMessageEvent) => {
            console.log("meeage",message);
            console.log("data",message.data);
            let image = URL.createObjectURL(message.data as unknown as Blob );
            console.log(image);
            setImage(image);
        };
    })
    return (
        <div className='mt-40'>
        <img src={image} alt='frames'/>
        <div >Hello WebSockets!</div>
        </div>
    );
}

export default WsPhoto;



