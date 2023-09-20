import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useAuth } from "../../utils/useAuth";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loggedItems, setLoggedItems] = useState([]);
  const [clickedDate, setClickedDate] = useState(selectedDate);
  const { auth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [updatedEntry, setUpdatedEntry] = useState({
    rating: null,
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
          } else {
            console.error("Error deleting entry:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error deleting entry:", error);
        });
    }
  };

  return (
    <div className="calendar-view-container">
      <div className="calendar-container bg-primary">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          onClickDay={(date) => setClickedDate(date)}
        />
      </div>

      <div className="logged-items-container bg-primary rounded-xl px-3">
        <h2 className="font-heading text-black text-sm mt-5 mb-2">
          {moment(clickedDate).format("LL")}
        </h2>
        <div className="scrollable-notes">
          <ul className="text-black text-sm">
            {editing ? (
              <li key={updatedEntry.id}>
                <strong>Edit Entry</strong>
                <div className="entry-actions">
                  <button className="save-button" onClick={handleEdit}>
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <label htmlFor="duration">Hours slept:</label>
                  <input
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
                  <label htmlFor="rating">Quality rating:</label>
                  <input
                    type="text"
                    id="rating"
                    name="rating"
                    value={updatedEntry.rating}
                    onChange={(e) =>
                      setUpdatedEntry({
                        ...updatedEntry,
                        rating: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="notes">Notes:</label>
                  <textarea
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
              </li>
            ) : (
              filteredItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.date}</strong>
                  <p>Hours slept: {item.duration}</p>
                  <p>Quality rating: {item.rating}</p>
                  <p>Notes: {item.notes}</p>
                  <div className="entry-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <p>***</p>
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
