import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useAuth } from "../../utils/useAuth";
import Quickie from "./Quickie";
import "./Calendar.css";
import { toast } from 'react-toastify';

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedDateForQuickie(date);
  };

  useEffect(() => {
    setClickedDate(selectedDate);
  }, [selectedDate]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const startOfDayDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      const itemsForDate = loggedItems.filter((item) =>
        moment(item.start_time).isSame(startOfDayDate, "day")
      );

      if (itemsForDate.length > 0) {
        return <div className="calendar-dot" />;
      }
    }

    return null;
  };

  const filteredItems = loggedItems.filter((item) =>
    moment(item.start_time).isSame(selectedDate, "day")
  );

  const handleEditClick = (itemId) => {
    setEditItemId(itemId);
    setEditing(true);
    const selectedItem = loggedItems.find((item) => item.id === itemId);
    setUpdatedEntry(selectedItem);
  };

  const handleEdit = () => {
    const jwtToken = auth.token;

    const updatedItem = {
      rating: updatedEntry.rating,
      start_time: updatedEntry.start_time,
      end_time: updatedEntry.end_time,
      notes: updatedEntry.notes,
      duration: updatedEntry.duration,
    };

    console.log("Updated Entry:", updatedItem);

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
        toast.success('Success! Changes saved!')
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
            toast.success('Success! Entry deleted!')
          } else {
            toast.error('Whoops! Something went wrong.');
          }
        })
        .catch((error) => {
          console.error("Error deleting entry:", error);
        });
    }
  };

  return (
    <div className="calendar-view-container">
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          onClickDay={(date) => setClickedDate(date)}
        />
      </div>

      <div className="logged-items-container border border-secondary dark:border-primary border-2 rounded-2xl px-3">
        <h2 className="font-heading dark:text-white text-black text-sm mt-4 mb-2">
          {moment(clickedDate).format("LL")}
        </h2>
        <div className="overflow-y-scroll h-52">
          <ul className="dark:text-white text-black text-sm">
            {editing ? (
              <li key={updatedEntry.id}>
                <h2 className="dark:text-white text-black mb-2 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1">
                  Editing entry
                </h2>
                <div>
                  <label htmlFor="duration">Hours slept:</label>
                  <input
                    className="text-black rounded px-1 border bg-white ml-1"
                    type="text"
                    id="duration"
                    name="duration"
                    value={updatedEntry.duration}
                    onChange={(e) =>
                      setUpdatedEntry({
                        ...updatedEntry,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="rating">Rating:</label>
                  <select
                    className="text-black rounded px-1 border bg-white ml-1 mt-1"
                    id="rating"
                    name="rating"
                    value={updatedEntry.rating}
                    onChange={(e) =>
                      setUpdatedEntry({
                        ...updatedEntry,
                        rating: e.target.value,
                      })
                    }
                  >
                    <option value="no_data">I don't remember</option>
                    <option value="horrible">Horrible</option>
                    <option value="mediocre">Mediocre</option>
                    <option value="OK">OK</option>
                    <option value="good">Good</option>
                    <option value="perfect">Perfect</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="notes">Notes:</label>
                  <textarea
                    className="text-black rounded px-1 border bg-white ml-1 mt-1"
                    id="notes"
                    name="notes"
                    value={updatedEntry.notes}
                    onChange={(e) =>
                      setUpdatedEntry({
                        ...updatedEntry,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="entry-actions mt-5 mb-3 space-x-2">
                  <button
                    className="h-8 px-4 bg-secondary dark:bg-primary border border-2 border-secondary dark:border-primary hover:border-accent font-bold text-white dark:text-black text-sm rounded-xl"
                    onClick={handleEdit}
                  >
                    Save
                  </button>
                  <button
                    className="h-8 px-4 bg-secondary dark:bg-primary border border-2 border-secondary dark:border-primary hover:border-accent font-bold text-white dark:text-black text-sm rounded-xl"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ) : filteredItems.length === 0 ? (
              <div>
                <p className="text-white mb-2 border border-primary rounded-lg bg-secondary px-2 py-1">
                  No entries yet - wanna do a quickie?
                </p>
                <Quickie selectedDate={selectedDateForQuickie} />
              </div>
            ) : (
              filteredItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.date}</strong>
                  <p className="dark:text-white text-black mb-2 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1">
                    Hours slept: {item.duration}
                  </p>
                  <p className="dark:text-white text-black mb-2 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1">
                    Quality rating: {item.rating}
                  </p>
                  <p className="dark:text-white text-black mt-4">
                    Notes:
                    <br />
                    {item.notes}
                  </p>
                  <br />
                  <div className="entry-actions mt-5 mb-3 space-x-2">
                    <button
                      className="h-8 px-4 bg-secondary dark:bg-primary border border-2 border-secondary dark:border-primary hover:border-accent font-bold text-white dark:text-black text-sm rounded-xl"
                      onClick={() => handleEditClick(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="h-8 px-4 bg-secondary dark:bg-primary border border-2 border-secondary dark:border-primary hover:border-accent font-bold text-white dark:text-black text-sm rounded-xl"
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
