import React, { useState } from "react";
import moment from "moment";

function DateTime(props) {
  return <p className="date">{props.date}</p>;
}

function DateTimePretty(props) {
  const date = moment(props.date);

  let newDate;

  if (date.isBefore(moment().subtract(1, "days"))) {
    newDate = moment().diff(date, "days") + " дней назад";
  } else if (date.isBefore(moment().subtract(1, "hours"))) {
    newDate = moment().diff(date, "hours") + " часов назад";
  } else {
    newDate = moment().diff(date, "minutes") + " минут назад";
  }

  const newProps = {
    ...props,
    date: newDate,
  };

  return <DateTime {...newProps} />;
}

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item) => (
    <Video url={item.url} date={item.date} key={item.url} />
  ));
}

export default function App() {
  const [list, setList] = useState([
    {
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2025-12-27 16:00:00",
    },
    {
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2025-12-28 12:40:00",
    },
    {
      url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-02-03 23:16:00",
    },
    {
      url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-03 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-01 16:17:00",
    },
    {
      url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-12-02 05:24:00",
    },
  ]);

  return <VideoList list={list} />;
}
