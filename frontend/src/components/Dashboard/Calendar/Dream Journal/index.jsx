/* eslint-disable react/prop-types */
import moment from "moment";
import sun_icon from "../../../../assets/images/sun_icon.png";

function DreamJournal({ likedEntries }) {
  return (
    <div>
      <h2 className="font-logo dark:text-white text-black border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1 flex items-center mb-5">
        Here's all your liked entries!
      </h2>
      <ul className="flex flex-col">
        {likedEntries.map((entry) => (
          <li key={entry.id}>
            <p className="font-logo">
              {moment(entry.start_time).format("DD/MM/YYYY")}
            </p>
            <p className="dark:text-white text-black py-2 mb-8">
              {entry.notes
                ? entry.notes
                : "You didn't add a note to this entry, but you sure liked the date!"}
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
