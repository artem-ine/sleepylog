import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useAuth } from "../../../utils/useAuth";
import Quickie from "./Entries Modal/Quickie";
import "./Calendar.css";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import moon_icon from "../../../assets/images/moon_icon.png";
import EditEntry from "./Entries Modal/EditEntry";
import {
  FaFaceGrinWide,
  FaFaceSmile,
  FaFaceMeh,
  FaFaceSadTear,
  FaFaceSadCry,
  FaPen,
  FaTrashCan,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa6";
import DreamJournal from "./Dream Journal";
import LoggedEntries from "./Entries Modal/LoggedEntries";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loggedItems, setLoggedItems] = useState([]);
  const [clickedDate, setClickedDate] = useState(selectedDate);
  const [showQuickie, setShowQuickie] = useState(false);
  const [showDreamJournal, setShowDreamJournal] = useState(false);
  const { auth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [selectedDateForQuickie, setSelectedDateForQuickie] = useState(
    new Date()
  );
  const [updatedEntry, setUpdatedEntry] = useState({
    rating: "",
    start_time: null,
    end_time: null,
    notes: null,
    duration: null,
  });

  const [editItemId, setEditItemId] = useState(null);

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
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching logbook entries:", error);
      }
    };

    fetchUserLogbookEntries();
  }, [auth]);

  const likedEntries = loggedItems.filter((item) => item.like);

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
    horrible: <FaFaceSadCry style={{ color: "#790119" }} />,
    mediocre: <FaFaceSadTear style={{ color: "#CC6600" }} />,
    OK: <FaFaceMeh style={{ color: "#E3A92C" }} />,
    good: <FaFaceSmile style={{ color: "#B3B319" }} />,
    perfect: <FaFaceGrinWide style={{ color: "#4f8f00" }} />,
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
    if (!updatedItem.start_time || !updatedItem.end_time) {
      toast.error("Start time and end time cannot be blank.");
      return;
    }
    if (updatedItem.start_time && updatedItem.end_time) {
      const startTime = moment(updatedItem.start_time);
      const endTime = moment(updatedItem.end_time);
      if (startTime.isAfter(endTime)) {
        toast.error("Start time cannot be after end time.");
        return;
      }
    }

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

  const handleLikeClick = (itemId) => {
    const likedEntry = loggedItems.find((item) => item.id === itemId);

    const updatedLikedEntry = { ...likedEntry, like: !likedEntry.like };

    const jwtToken = auth.token;

    fetch(`/api/entries/${itemId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLikedEntry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        const updatedItems = loggedItems.map((item) =>
          item.id === itemId ? data : item
        );
        setLoggedItems(updatedItems);
        toast.success(`Success! Entry ${data.like ? "liked" : "unliked"}!`);
      })
      .catch((error) => {
        console.error("Error updating entry:", error);
      });
  };

  const toggleQuickie = () => {
    setShowQuickie(!showQuickie);
  };

  const toggleDreamJournal = () => {
    setShowDreamJournal(!showDreamJournal);
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
        <LoggedEntries
          editing={editing}
          filteredItems={filteredItems}
          selectedDateForQuickie={selectedDateForQuickie}
          handleLikeClick={handleLikeClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleCancelEdit={handleCancelEdit}
          handleSaveEntry={handleSaveEntry}
          ratingEmojis={ratingEmojis}
          clickedDate={clickedDate}
          updatedEntry={updatedEntry}
          toggleQuickie={toggleQuickie}
          showQuickie={showQuickie}
        />
      </div>
      <div className="flex flex-col w-full lg:w-2/3">
        <div className="pt-5">
          <button
            className="text-sm font-logo border-2 rounded-xl px-2 dark:border-secondary border-primary dark:text-black text-white dark:bg-primary bg-secondary hover:border-accent dark:hover:border-accent"
            onClick={toggleDreamJournal}
            aria-label="toggle open quick entry"
          >
            Dream Journal
          </button>
          <p className="pt-3">
            All the entries you like will be displayed underneath.
          </p>
          {showDreamJournal && (
            <div className="flex flex-col shadow-xl border-2 dark:border-primary border-secondary p-3 rounded-xl py-5 mt-5">
              <DreamJournal likedEntries={likedEntries} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CalendarView;
