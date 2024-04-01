import React from "react";
import { nanoid } from "nanoid";
import {
  formatTimeFromTimestamp,
  timestampToMonthDayTime,
} from "../../utils/utils";
import "./index.css";

const id = nanoid();

function CouponList({ title = "", list = [] }) {
  if (!Array.isArray(list) || list.length === 0) {
    return <div className="no-data">暂无数据</div>;
  }

  return (
    <div className="list-wrap">
      <p className="list-title">{title}</p>
      <ul>
        {list.map((coupon, index) => (
          <li key={index + id}>
            <div className="list-content-left">
              <span className="figure">
                {coupon.money || "-"}
                <span className="unit">元</span>
              </span>
            </div>
            <div className="list-content-center">
              <p className="title">{coupon.title || "-"}</p>
              <p className="description">{coupon.description || "-"}</p>
              {coupon.restTime && coupon.restTime >= 0 ? (
                <div className="time">
                  {formatTimeFromTimestamp(coupon.restTime).map(
                    (segment, timeIndex) => (
                      <span key={timeIndex}>
                        <span className="downTime">{segment}</span>
                        {timeIndex !==
                          formatTimeFromTimestamp(coupon.restTime).length -
                            1 && <span> : </span>}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p className="time">
                  有效期: {timestampToMonthDayTime(coupon.time[0])} -{" "}
                  {timestampToMonthDayTime(coupon.time[1])}
                </p>
              )}
            </div>
            <div className="list-content-right">{coupon.status || "-"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CouponList;
