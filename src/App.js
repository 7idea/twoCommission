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
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const dass = [
  {
    id: 1,
    name: "เฮียสิบ",
    price: "55,000",
  },
  {
    id: 2,
    name: "เจ๊มังกร",
    price: "34,100",
  },
  {
    id: 3,
    name: "เฮียสิบ4",
    price: "55,000",
  },
];

const App = () => {
  let [groupData, setGroupData] = React.useState([[]]);
  let [dataCommissioin, setDataCommissioin] = useState(dass);
  useEffect(async () => {
    async function fetchData() {
      const result = await axios.get("/countgroups");
      let arrSlide = [[]];
      let index = 0;
      result.data.forEach((element) => {
        if (arrSlide[index].length < 8) {
          arrSlide[index].push(element);
        } else {
          arrSlide[++index] = [];
          arrSlide[index].push(element);
        }
      });
      setGroupData(arrSlide);
    }

    // one page
    let [expense, income] = await Promise.all([
      axios.get("http://209.97.169.9/commission-dashboards/"),
      axios.get("http://209.97.169.9/commission-dashboards/"),
    ]);
    expense = expense.data;
    income = income.data;

    let teamName = expense.reduce((res, item) => {
      if (!res.includes(item.team)) return [...res, item.team];
      else return res;
    }, []);

    let ppl = {};
    let rate = {};
    let incomeTeam = {};
    expense.forEach((item) => {
      if (item.type === "rate") {
        if (item.name === "พนักงาน") {
          ppl[item.team] = item.value;
        }
        if (item.name === "ค่าคอม") {
          rate[item.team] = item.value;
        }
      }
    });
    incomeTeam["เฮียสิบ"] = 1650000;
    incomeTeam["เจ๊มังกร"] = 510000;
    incomeTeam["โกรวย"] = 300000;
    incomeTeam["เฮียจอห์น"] = 840000;
    incomeTeam["ทวดเต่า"] = 258000;
    incomeTeam["ราชานำโชค"] = 78000;

    let tempData = {};
    expense.forEach(({ name, team, value, type }) => {
      if (type === "cost") {
        tempData[team] = tempData[team] || {};
        tempData[team].cost = tempData[team].cost || 0;
        let cost = 0;
        if (name === "ค่ากาแฟ") {
          cost = parseInt(value) * ppl[team] * 31;
        } else if (name === "ค่าคอมมิชชั่น") {
          cost = parseInt(value) * ppl[team];
        } else if (name === "เงินเดือน") {
          cost = parseInt(value) * ppl[team];
        } else if (name === "ค่าใช้จ่าย") {
          cost = (incomeTeam[team] * parseInt(value)) / 100;
        } else if (name === "ค่าข้าว") {
          cost = parseInt(value) * ppl[team] * 31;
        }

        tempData[team].cost += cost;
      } else if (type === "cms" && name === "คอมทีมงาน") {
        tempData[team] = tempData[team] || {};
        tempData[team].percent = parseInt(value);
      }
    }, []);
    console.log(tempData);
    let temDataCommission = Object.keys(tempData).map((teamName, i) => {
      let revenue = incomeTeam[teamName] - tempData[teamName].cost;
      let allCommission = (rate[teamName] * revenue) / 100;
      let commissionKit = (allCommission * tempData[teamName].percent) / 100;
      let personPerMonth = commissionKit / ppl[teamName];

      return {
        id: i,
        name: teamName,
        price: parseInt(personPerMonth),
        // price: (income[teamName] - tempData[teamName].cost) * tempData[teamName].percent /100,
      };
    });
    // console.log(temDataCommission);
    setDataCommissioin(temDataCommission);
    fetchData();
    const intervals = setInterval(() => fetchData(), 5000);
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
                  {dass.map((item, i) => (
                    <FirstPage key={i} data={item} />
                  ))}
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
  return (
    <div className=" h-16 w-full g-4 md:w-1/2 lg:w-1/2 bg-grey px-4 mt-32">
      <div className="border-b-4 inline-block w-full" style={styleTxt}>
        <span style={styleTitle}>{props.data.name}</span>
        <p style={stylePrice}>{props.data.price}</p>
      </div>
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
