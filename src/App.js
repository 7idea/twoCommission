import "./App.css";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { data } from "autoprefixer";
import Slider from "react-slick";

const classes = {
  body: "flex flex-wrap w-full h-screen",
  lowWrap:
    "border-2 mt-0 p-10 text-center w-full items-center rounded-3xl mx-2 ",
  title: "text-gray-800 text-l font-bold",
  description: (active) =>
    `my-6 ${active ? "text-red-900 font-medium" : "text-gray-800"}`,
  button: "py-2 px-4 bg-gray-100 border-2 focus:outline-none",
  buttonActive: "bg-gray-400",
  num: "w-1/2 text-5xl font-extrabold",
  hnum: "w-1/2 text-xl font-extralight mt-2 mb-4 font-thin",
  line: "w-full flex items-center p-2 ",
};
const styleTxt = {
  fontFamily: "supermarket",
  color: "#fff",
};
const styleTitle = {
  fontSize: "28px",
  fontFamily: "supermarket",
  color: "#fff",
};
const stylePrice = {
  fontSize: "90px",
  color: "#ffce1f",
};

const settings = {
  dots: false,
  infinite: true,
  speed: 200,
  autoplaySpeed: 8000,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const dataMock = [
  { number: "1" },
  { number: "2" },
  { number: "3" },
  { number: "4" },
  { number: "5" },
  { number: "6" },
  { number: "7" },
  { number: "8" },
  { number: "9" },
  { number: "10" },
  { number: "11" },
  { number: "12" },
  { number: "13" },
  { number: "14" },
  { number: "15" },
  { number: "16" },
];

const App = () => {
  let [groupData, setGroupData] = React.useState([[]]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/countgroups");
      let arrSlide = [[]];
      let index = 0;
      result.data.forEach((element) => {
        // console.log("บน if ", element);
        if (arrSlide[index].length < 8) {
          arrSlide[index].push(element);
          console.log(element);
        } else {
          arrSlide[++index] = [];
          arrSlide[index].push(element);
          console.log(arrSlide[index].push(element));
        }
      });
      setGroupData(arrSlide);
    }
    fetchData();
    // const intervals = setInterval(() => fetchData(), 5000);
  }, []);

  return (
    <div>
      <div className="OK">
        <Slider {...settings}>
          <div
            className=""
            style={{
              backgroundColor: "#0b1228",
              height: "100vh",
              width: "100%",
            }}
          >
            <div
              className="flex items-center"
              style={{
                backgroundColor: "#0b1228",
                height: "100vh",
                width: "100%",
              }}
            >
              <div className="container mx-auto md:container md:mx-auto">
                <div className="mb-8 p-6 w-full flex flex-wrap bg-grey-light ">
                  <div className=" h-16 w-full g-4 md:w-1/2 lg:w-1/2 bg-grey px-4 mt-32">
                    <div
                      className="border-b-4 inline-block w-full"
                      style={styleTxt}
                    >
                      <span style={styleTitle}>เฮียสิบ</span>
                      <p style={stylePrice}>55,000</p>
                    </div>
                  </div>
                  <div className="h-16  w-full md:w-1/2 lg:w-1/2 bg-grey px-4 mt-32">
                    <div
                      className="border-b-4 inline-block w-full"
                      style={styleTxt}
                    >
                      <span style={styleTitle}>เจ๊มังกร </span>
                      <p style={stylePrice}>34,100</p>
                    </div>
                  </div>
                  <div className="h-16  w-full md:w-1/2 lg:w-1/2 bg-grey px-4 mt-32">
                    <div
                      className="border-b-4 inline-block w-full"
                      style={styleTxt}
                    >
                      <span style={styleTitle}>โกรวย </span>
                      <p style={stylePrice}>40,300</p>
                    </div>
                  </div>
                  <div className="h-16  w-full md:w-1/2 lg:w-1/2 bg-grey px-4 mt-32">
                    <div
                      className="border-b-4 inline-block w-full"
                      style={styleTxt}
                    >
                      <span style={styleTitle}>เฮียจอห์น </span>
                      <p style={stylePrice}>31,000</p>
                    </div>
                  </div>
                  <div className="h-16  w-full md:w-1/2 lg:w-1/2 bg-grey px-4 mt-32">
                    <div
                      className="border-b-4 inline-block w-full"
                      style={styleTxt}
                    >
                      <span style={styleTitle}>ทวดเต่า </span>
                      <p style={stylePrice}>76,080</p>
                    </div>
                  </div>
                  <div className="h-16  w-full md:w-1/2 lg:w-1/2 bg-grey px-4 mt-32">
                    <div
                      className="border-b-4 inline-block w-full"
                      style={styleTxt}
                    >
                      <span style={styleTitle}>ราชานำโชค </span>
                      <p style={stylePrice}>51,000</p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-32 mb-28">
                  <span style={styleTitle}>ค่าคอมเฉลี่ย คน/เดือน</span>
                </div>
              </div>
            </div>
          </div>
          {groupData.map((datas, i) => (
            <div className="w-full">
              <div className="grid  grid-cols-4 gap-4 p-8 ">
                {datas.map((data, i) => (
                  <Group key={data.id} groupdata={data} />
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const FirstPage = (props) => {
  let [dataState, setDataState] = useState([]);
  const result = axios.get("/").then("");
  return (
    <div className="p-8 m-8">
      <h3>FirstPage</h3>
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
    // const intervals = setInterval(() => fetchData2(), 2000);
  }, []);

  return (
    <div>
      <div className={classes.lowWrap}>
        <img
          className="rounded-full w-28 mx-auto mt-8"
          src={props.groupdata.pictureUrl}
        />
        <div className="border border-gray-400 text-black rounded-full mx-14 mb-4 mt-6">
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
    </div>

    // 11111
    // <div>
    //   <div className={classes.lowWrap}>
    //     <img
    //       className="rounded-full w-28 mx-auto mt-8"
    //       src={props.groupdata.pictureUrl}
    //     />
    //     <div className="border border-gray-400 text-black rounded-full mx-14 mb-4 mt-6">
    //       <p className="text-xl p-4">{props.groupdata.groupName}</p>
    //     </div>
    //     <div className="w-full flex">
    //       <div className={classes.hnum}>IN</div>
    //       <div className={classes.hnum}>OUT</div>
    //     </div>
    //     <div className="w-full flex">
    //       <div className={classes.num}>
    //         {responseData.filter((item) => item.status == "join").length}
    //       </div>
    //       <div className={classes.num}>
    //         {responseData.filter((item) => item.status == "left").length}
    //       </div>
    //     </div>
    //     <div className="w-full flex">
    //       <div className="bg-green-400 w-full h-2 mx-4 rounded-full"></div>
    //       <div className="bg-red-500 w-full h-2 mx-4 rounded-full"></div>
    //     </div>
    //     <div className="flex mt-4 border-t-2">
    //       <div className="w-full items-center overflow-y-scroll h-32 mx-2 pt-4 border-r-2">
    //         {responseData
    //           .filter((item) => item.status == "join")
    //           .map((data) => {
    //             return <Linemember key={data.id} datas={data} />;
    //           })}
    //       </div>
    //       <div className="w-full items-center overflow-y-scroll h-32">
    //         {responseData
    //           .filter((item) => item.status == "left")
    //           .map((data) => {
    //             return <Linemember key={data.id} datas={data} />;
    //           })}
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
