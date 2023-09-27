import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useAuth } from "../../../utils/useAuth";
import Quickie from "../Entries Modal/Quickie";
import "./Calendar.css";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import moon_icon from "../../../assets/images/moon_icon.png";
import EditEntry from "./EditEntry";
import { RiPencilLine, RiDeleteBinLine } from "react-icons/ri";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loggedItems, setLoggedItems] = useState([]);
  const [clickedDate, setClickedDate] = useState(selectedDate);
  const { auth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [updatedEntry, setUpdatedEntry] = useState({
    rating: "",
    start_time: null,
    end_time: null,
    notes: null,
    duration: null,
  });

  const [editItemId, setEditItemId] = useState(null);

  const [selectedDateForQuickie, setSelectedDateForQuickie] = useState(
    new Date()
  );

  useEffect(() => {
    const fetchUserLogbookEntries = async () => {
      try {
        const response = await fetch("/api/entries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLoggedItems(data);
          console.log("Logged Items:", data);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching logbook entries:", error);
      }
    };

    fetchUserLogbookEntries();
  }, [auth]);

  const handleDateClick = (date) => {
    if (editing) {
      setEditing(false);
    }
    setClickedDate(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedDateForQuickie(date);
  };

  useEffect(() => {
    setClickedDate(selectedDate);
  }, [selectedDate]);

  const ratingEmojis = {
    horrible: "😫",
    mediocre: "😐",
    OK: "😊",
    good: "😄",
    perfect: "😍",
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const startOfDayDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      const itemsForDate = loggedItems.filter((item) =>
        moment(item.end_time).isSame(startOfDayDate, "day")
      );

      if (itemsForDate.length > 0) {
        const rating = itemsForDate[0].rating;

        if (ratingEmojis[rating]) {
          return <div className="calendar-emoji">{ratingEmojis[rating]}</div>;
        }
      }
    }

    return null;
  };

  const filteredItems = loggedItems.filter((item) =>
    moment(item.end_time).isSame(selectedDate, "day")
  );

  const handleEditClick = (itemId) => {
    setEditItemId(itemId);
    setEditing(true);
    const selectedItem = loggedItems.find((item) => item.id === itemId);
    setUpdatedEntry(selectedItem);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveEntry = (updatedItem) => {
    const jwtToken = auth.token;

    fetch(`/api/entries/${editItemId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        setEditing(false);
        setEditItemId(null);
        const updatedItems = loggedItems.map((item) =>
          item.id === editItemId ? data : item
        );
        setLoggedItems(updatedItems);
        toast.success("Success! Changes saved!");
      })
      .catch((error) => {
        console.error("Error updating entry:", error);
      });
  };

  const handleDeleteClick = (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (confirmDelete) {
      const jwtToken = auth.token;

      fetch(`/api/entries/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            const updatedItems = loggedItems.filter(
              (item) => item.id !== itemId
            );
            setLoggedItems(updatedItems);
            toast.success("Success! Entry deleted!");
          } else {
            toast.error("Whoops! Something went wrong.");
          }
        })
        .catch((error) => {
          console.error("Error deleting entry:", error);
        });
    }
  };

  return (
    <>
      <div className="calendar-view-container gap-10">
        <div className="calendar-container pb-2">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            onClickDay={handleDateClick}
          />
        </div>

        <div className="logged-items-container border-secondary dark:border-primary border-2 rounded-2xl p-2">
          <div className="flex justify-evenly items-center pb-1">
            <h2 className="font-heading dark:text-white text-black text-sm mt-2">
              {moment(clickedDate).format("LL")}
            </h2>
            <img
              src={moon_icon}
              alt="doodled sun and moon with a cloud"
              className="h-8"
            />
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
                    <p className="font-logo dark:text-white text-black mb-2 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1 flex items-center">
                      <span className="flex-grow">Sleep Entry</span>
                      <div className="flex space-x-2">
                        <button
                          className="h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent text-white dark:text-black rounded-xl"
                          onClick={() => handleEditClick(item.id)}
                        >
                          <RiPencilLine />
                        </button>
                        <button
                          className="h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent text-white dark:text-black rounded-xl"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </p>
                    <p className="dark:text-white text-black mt-1">
                      Start time: {moment(item.start_time).format("DD/MM/YYYY")}
                    </p>
                    {item.end_time && (
                      <p className="dark:text-white text-black">
                        End time: {moment(item.end_time).format("DD/MM/YYYY")}
                      </p>
                    )}
                    {item.duration && (
                      <p className="dark:text-white text-black">
                        Hours slept: {item.duration}
                      </p>
                    )}
                    <p className="dark:text-white text-black">
                      <span className="underline underline-offset-1">
                        Quality rating:
                      </span>{" "}
                      {ratingEmojis[item.rating]}
                    </p>
                    {item.notes && (
                      <p className="dark:text-white text-black mt-5">
                        Notes: {item.notes}
                      </p>
                    )}
                    <p className="text-center">***</p>
                    <Quickie selectedDate={selectedDateForQuickie} />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarView;
