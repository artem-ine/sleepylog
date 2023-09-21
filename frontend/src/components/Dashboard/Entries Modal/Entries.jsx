import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/useAuth";
import useErrorHandler from "../../../utils/errorHandler";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import EmojiPicker from "./EmojiPicker";
import { toast } from 'react-toastify';

function EntryForm({ onEntrySuccess }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [notes, setNotes] = useState("");

  const { error, showError } = useErrorHandler();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = auth.token;

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          rating: rating,
          duration: duration,
          start_time: start_time,
          end_time: end_time,
          notes: notes,
        }),
      });

      if (response.ok) {
        if (onEntrySuccess) {
          onEntrySuccess();
        }
        toast.success('Success! Entry saved!', {
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        toast.error('Whoops, something went wrong.');
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-xs">
        <form
          className="bg-primary shadow-md rounded-2xl border border-secondary border-4 px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h1 className="font-heading text-center text-black text-2xl mb-5">
              Sleep Entry
            </h1>
            <EmojiPicker
              onSelectRating={(selectedRating) => setRating(selectedRating)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-black text-sm font-bold mb-2"
            >
              Duration (in hours):
            </label>
            <input
              type="number"
              id="duration"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="start_time"
              className="block text-black text-sm font-bold mb-2"
            >
              Start Time:
            </label>
            <DatePicker
              id="start_time"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              selected={start_time}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd/MM/yyyy HH:mm"
              placeholderText="Select Start Time"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="end_time"
              className="block text-black text-sm font-bold mb-2"
            >
              End Time:
            </label>
            <DatePicker
              id="start_time"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              selected={end_time}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd/MM/yyyy HH:mm"
              placeholderText="Select Start Time"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="notes"
              className="block text-black text-sm font-bold mb-2"
            >
              Notes:
            </label>
            <textarea
              id="notes"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-secondary border border-black hover:bg-blue-700 font-bold text-white text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            >
              Submit Entry
            </button>
          </div>
          {error && <p className="text-xs italic">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default EntryForm;

EntryForm.propTypes = {
  onEntrySuccess: PropTypes.func,
};
