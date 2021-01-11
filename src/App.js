import "./App.css";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";

const classes = {
  body: "flex flex-wrap w-full h-screen",
  wrapper:
    "border-2 mt-16 p-5 text-center w-3/12 justify-center items-center rounded-3xl mx-4",
  title: "text-gray-800 text-l font-bold",
  description: (active) =>
    `my-6 ${active ? "text-red-900 font-medium" : "text-gray-800"}`,
  button: "py-2 px-4 bg-gray-100 border-2 focus:outline-none",
  buttonActive: "bg-gray-400",
  num: "w-1/2 text-5xl font-extrabold",
  hnum: "w-1/2 text-xl font-extralight mt-2 mb-4 font-thin",
  line: "w-full flex items-center p-2 ",
};

const App = () => {
  let [groupData, setGroupData] = React.useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/countgroups");
      setGroupData(result.data);
    }
    fetchData();
    const intervals = setInterval(() => fetchData(), 6000);
  }, []);
  return (
    <div className={classes.body}>
      Header
      {console.log(groupData)}
      {groupData.map((data) => {
        return <Group key={data.id} groupdata={data} />;
      })}
      Footer
    </div>
  );
};

const Group = (props) => {
  let [responseData, setResponseData] = React.useState([]);
  useEffect(() => {
    async function fetchData2() {
      const result = await axios.get(
        "/linegroupusers?countgroup.groupId=" + props.groupdata.groupId
      );
      setResponseData(result.data);
    }
    fetchData2();
    const intervals = setInterval(() => fetchData2(), 2000);
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className="w-full"></div>
      <img
        className="rounded-full w-28 mx-auto"
        src={props.groupdata.pictureUrl}
      />
      <div className="border border-gray-400 text-black rounded-full mx-14 mb-6">
        <p className="text-xl p-4">{props.groupdata.groupName}</p>
      </div>
      <div className="w-full flex">
        <div className={classes.hnum}>IN</div>
        <div className={classes.hnum}>OUT</div>
      </div>
      <div className="w-full flex">
        <div className={classes.num}>
          {responseData.filter((item) => item.status == "join").length}
        </div>
        <div className={classes.num}>
          {responseData.filter((item) => item.status == "left").length}
        </div>
      </div>
      <div className="w-full flex">
        <div className="bg-green-400 w-full h-2 mx-4 rounded-full"></div>
        <div className="bg-red-500 w-full h-2 mx-4 rounded-full"></div>
      </div>
      <div className="flex mt-4 border-t-2">
        <div className="w-full items-center overflow-y-scroll h-32 mx-2 pt-4 border-r-2">
          {responseData
            .filter((item) => item.status == "join")
            .map((data) => {
              return <Linemember key={data.id} datas={data} />;
            })}
        </div>
        <div className="w-full items-center overflow-y-scroll h-32">
          {responseData
            .filter((item) => item.status == "left")
            .map((data) => {
              return <Linemember key={data.id} datas={data} />;
            })}
        </div>
      </div>
    </div>
  );
};

const Linemember = (props) => {
  return (
    <div className={classes.line}>
      <img className="rounded-full w-8" src={props.datas.pictureUrl} />
      <p className="pl-4">{props.datas.displayName}</p>
    </div>
  );
};

export default App;
