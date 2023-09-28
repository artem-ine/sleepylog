import React from "react";
import moment from "moment";
import sun_icon from "../../../assets/images/sun_icon.png";

function DreamJournal({ likedEntries }) {
  return (
    <div>
      <ul className="flex flex-col">
        {likedEntries.map((entry) => (
          <li key={entry.id}>
            <p className="dark:text-white text-black pt-15">
              Start time: {moment(entry.start_time).format("DD/MM/YYYY")}
            </p>
            <p className="dark:text-white text-black py-2">
              Notes: {entry.notes}
            </p>
            <div className="justify-center flex">
              <img
                src={sun_icon}
                alt="doodled sun and moon with a cloud"
                className="h-6"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DreamJournal;
