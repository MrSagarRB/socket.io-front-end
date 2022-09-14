import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("https://socket-io-backend-rosy.vercel.app/");

const App = () => {
  let [msg, setMsg] = useState();
  let [viewMsg, setViewMsg] = useState();

  const sendMsg = () => {
    socket.emit("send_msg", { message: msg });
  };

  let handelOnChange = (e) => {
    setMsg(e.target.value);
    sendMsg();
  };
  useEffect(() => {
    sendMsg();
    socket.on("receive_msg", (data) => {
      setViewMsg(data.message);
    });
  }, [socket]);

  console.log(msg);
  return (
    <div className="h-[400px] w-full flex mt-20 justify-center">
      <div className="w-[400px] h-[200px]">
        <textarea
          value={viewMsg}
          className="h-full w-full outline-none text-2xl "
        ></textarea>{" "}
        <div className="flex">
          <input
            type="text"
            value={msg}
            onChange={(e) => handelOnChange(e)}
            placeholder="Start Type Message"
            className="w-full h-full px-5 outline-none text-xl "
          />
          <button
            className="border px-5"
            onClick={() => {
              setMsg("");
              setViewMsg("");
            }}
          >
            Clear
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default App;
