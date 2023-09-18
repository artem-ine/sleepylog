import React, { useState } from "react";
import { Link } from "react-router-dom";

function GuestView() {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="font-heading">A little header !</h1>
      <p>
        This is sleepyLog ! sleepyLog is an app designed as a personalized sleep
        tracker for you to visualize your sleep patterns. Hopefully this helps
        you identify trends to satisfy your curiosity and perhaps take action if
        there's any indicators to having a good night's rest.
      </p>
    </div>
  );
}

export default GuestView;
