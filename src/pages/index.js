import React, { useState, useEffect, useRef } from "react";
import CouponList from "../component/timeList/index";
import "./index.css";

const TITLE = "1688进货红包";

export default function Home() {
  const [list, setList] = useState([]);
  const timer = useRef();

  const URL = "https://systemjs.1688.com/krump/schema/1352.json";
  const getList = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const list = data.list;
      const mockData = {
        money: 8.2,
        title: "手动增加一条mock数据",
        description: "8.2元红包，可无门槛使用",
        time: [1654099200000, 1655740800000],
        status: "已过期",
        restTime: 5,
      };

      const pushData = [mockData, ...list];

      let flag = false;
      const result = pushData.map((v) => {
        if (v.restTime) {
          flag = true;
          return {
            ...v,
            downTime: function () {
              if (this.restTime > 0) {
                this.restTime -= 1;
              } else {
                this.restTime = 0;
              }
            },
          };
        }
        return v;
      });

      setList([...result]);
      if (flag) {
        result.forEach((v) => {
          if (v.restTime) {
            timer.current = setInterval(() => {
              v.downTime();
              setList([...result]);
            }, 1000);
          }
        });
      }
    } catch (error) {
      console.error("发生错误:", error);
    }
  };

  useEffect(() => {
    getList();
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <>
      <CouponList title={TITLE} list={list} />
    </>
  );
}
