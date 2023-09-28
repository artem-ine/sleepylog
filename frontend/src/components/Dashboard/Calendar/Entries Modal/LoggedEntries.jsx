import moment from "moment";
import moon_icon from "../../../../assets/images/moon_icon.png";
import { FaPen, FaTrashCan, FaRegHeart, FaHeart } from "react-icons/fa6";
import Quickie from "./Quickie";
import EditEntry from "./EditEntry";

function LoggedEntries({
  editing,
  filteredItems,
  selectedDateForQuickie,
  handleLikeClick,
  handleEditClick,
  handleDeleteClick,
  handleCancelEdit,
  handleSaveEntry,
  ratingEmojis,
  clickedDate,
  updatedEntry,
}) {
  return (
    <div className="logged-items-container border-secondary dark:border-primary border-2 rounded-2xl p-2">
      <div className="flex justify-evenly items-center pb-1">
        <h2 className="font-heading dark:text-white text-black text-sm mt-2">
          {moment(clickedDate).format("LL")}
        </h2>
        <img src={moon_icon} alt="doodled moon" className="h-8" />
      </div>
      <div className="overflow-y-auto h-56 pt-2 px-1">
        <ul className="dark:text-white text-black text-sm px-2">
          {editing ? (
            <EditEntry
              entry={updatedEntry}
              onUpdate={handleSaveEntry}
              onCancel={handleCancelEdit}
            />
          ) : filteredItems.length === 0 ? (
            <div>
              <p className="font-logo dark:text-white text-black border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1 flex items-center">
                No entry for last night yet — wanna do a quickie?
              </p>
              <Quickie selectedDate={selectedDateForQuickie} />
            </div>
          ) : (
            filteredItems.map((item) => (
              <li key={item.id} className="flex flex-col mb-5">
                <div className="font-logo dark:text-white text-black mb-2 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1 flex items-center">
                  <span className="flex-grow">Sleep Entry</span>
                  <span className="flex space-x-2">
                    {item.like ? (
                      <button
                        className={`h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent dark:hover:border-accent text-white dark:text-black rounded-xl`}
                        onClick={() => handleLikeClick(item.id)}
                        style={{ fontSize: "12px" }}
                        aria-label="unlike"
                      >
                        <FaHeart />
                      </button>
                    ) : (
                      <button
                        className={`h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent dark:hover:border-accent text-white dark:text-black rounded-xl`}
                        onClick={() => handleLikeClick(item.id)}
                        style={{ fontSize: "12px" }}
                        aria-label="like"
                      >
                        <FaRegHeart />{" "}
                      </button>
                    )}
                    <button
                      className="h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent dark:hover:border-accent text-white dark:text-black rounded-xl"
                      onClick={() => handleEditClick(item.id)}
                      style={{ fontSize: "12px" }}
                      aria-label="edit"
                    >
                      <FaPen />
                    </button>
                    <button
                      className="h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent dark:hover:border-accent text-white dark:text-black rounded-xl"
                      onClick={() => handleDeleteClick(item.id)}
                      style={{ fontSize: "12px" }}
                      aria-label="delete"
                    >
                      <FaTrashCan />
                    </button>
                  </span>
                </div>
                <p className="dark:text-white text-black mt-1">
                  Start time:{" "}
                  {moment(item.start_time).format("DD/MM/YYYY HH:mm")}
                </p>
                {item.end_time && (
                  <p className="dark:text-white text-black">
                    End time: {moment(item.end_time).format("DD/MM/YYYY HH:mm")}
                  </p>
                )}
                {item.duration && (
                  <p className="dark:text-white text-black">
                    Hours slept: {item.duration}
                  </p>
                )}
                <div className="dark:text-white text-black flex gap-2 items-center">
                  <span className="">Quality rating:</span>
                  <p className="text-xl">{ratingEmojis[item.rating]}</p>
                </div>
                {item.notes && (
                  <p className="dark:text-white text-black mt-5">
                    Notes: {item.notes}
                  </p>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default LoggedEntries;
