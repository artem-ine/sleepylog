import { useState } from "react";
import { useAuth } from "../../../../utils/useAuth";
import useErrorHandler from "../../../../utils/errorHandler";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import EmojiPicker from "./EmojiPicker";
import { toast } from "react-toastify";

function EntryForm({ onEntrySuccess }) {
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
        toast.success("Success! Entry saved!", {
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        const errorData = await response.json();
        if (errorData && errorData.errors) {
          const errorMessages = errorData.errors.join(", ");
          toast.error(`Whoops! ${errorMessages}`);
        }
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-xs">
        <form
          className="bg-primary shadow-md rounded-2xl border-secondary border-4 px-8 pt-6 pb-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h1 className="font-heading text-center text-black text-2xl mb-5">
              Sleep Entry
            </h1>
            <h5 className="text-black text-sm font-bold mb-2">
              How well did you sleep?
            </h5>
            <EmojiPicker
              onSelectRating={(selectedRating) => setRating(selectedRating)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-black text-sm font-bold mb-2"
            >
              How many hours do you think you slept?
            </label>
            <input
              type="number"
              min="0"
              id="duration"
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
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
              When did you go to bed?
            </label>
            <DatePicker
              id="start_time"
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
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
              When did you get up?
            </label>
            <DatePicker
              id="start_time"
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
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
              Anything to share? Dreams? Nightmares?
            </label>
            <textarea
              id="notes"
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="mb-6 flex gap-3 justify-center items-center">
            <button
              aria-label="submit sleep log"
              type="submit"
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
            >
              Log your sleep
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
