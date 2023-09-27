import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmojiPicker from "../Entries Modal/EmojiPicker";
import { RiSave3Fill, RiDeleteBack2Line } from "react-icons/ri";

function EditEntry({ entry, onUpdate, onCancel }) {
  const [updatedEntry, setUpdatedEntry] = useState({
    duration: entry.duration || "",
    start_time: entry.start_time || null,
    end_time: entry.end_time || null,
    notes: entry.notes || "",
    rating: entry.rating || "",
  });

  const handleEdit = () => {
    onUpdate(updatedEntry);
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    setUpdatedEntry({
      duration: entry.duration || "",
      start_time: entry.start_time || null,
      end_time: entry.end_time || null,
      notes: entry.notes || "",
      rating: entry.rating || "",
    });
  }, [entry]);

  return (
    <div>
      <p className="font-logo dark:text-white text-black mb-2 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1 flex items-center">
        <span className="flex-grow">Editing entry</span>
        <div className="flex space-x-2">
          <button
            className="h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent font-bold text-white dark:text-black text-sm rounded-xl"
            onClick={handleEdit}
          >
          <RiSave3Fill />
          </button>
          <button
            className="h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent font-bold text-white dark:text-black text-sm rounded-xl"
            onClick={handleCancel}
          >
          <RiDeleteBack2Line />
          </button>
        </div>
      </p>
      <div>
        <div className="flex justify-between">
          <label htmlFor="duration">Hours slept:</label>
          <input
            className="text-black rounded px-1 border bg-white ml-1"
            type="number"
            min="0"
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
        <div className="flex justify-between">
          <label htmlFor="start_time">Start Time:</label>
          <DatePicker
            id="start_time"
            className="bg-white shadow appearance-none border rounded-xl w-full p-1 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
            selected={
              updatedEntry.start_time ? new Date(updatedEntry.start_time) : null
            }
            onChange={(date) =>
              setUpdatedEntry({
                ...updatedEntry,
                start_time: date,
              })
            }
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Select Start Time"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="end_time">End Time:</label>
          <DatePicker
            id="end_time"
            className="bg-white shadow appearance-none border rounded-xl w-full p-1 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
            selected={
              updatedEntry.end_time ? new Date(updatedEntry.end_time) : null
            }
            onChange={(date) =>
              setUpdatedEntry({
                ...updatedEntry,
                end_time: date,
              })
            }
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Select End Time"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="rating">Rating:</label>
          <EmojiPicker
            onSelectRating={(rating) =>
              setUpdatedEntry({ ...updatedEntry, rating })
            }
          />
        </div>
        <div className="flex justify-between">
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
      </div>
    </div>
  );
}

export default EditEntry;
