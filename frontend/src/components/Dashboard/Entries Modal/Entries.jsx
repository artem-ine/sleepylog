import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../../utils/useAuth";
import useErrorHandler from "../../../utils/errorHandler";

function EntryForm() {
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
        // Parse the response JSON data if available
        const responseData = await response.json();

        // Call the callback function to handle success (if provided)
        if (onEntrySuccess) {
          onEntrySuccess(responseData);
        }

        // Redirect or perform other actions on success
        navigate("/dashboard"); // Example: Redirect to the dashboard
      } else {
        // Handle errors for non-2xx status codes
        const errorData = await response.json();
        showError(errorData.error); // Display error message to the user
      }
    } catch (error) {
      // Handle network or other errors
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
            <label
              htmlFor="rating"
              className="block text-black text-sm font-bold mb-2"
            >
              Rating:
            </label>
            <input
              type="number"
              id="rating"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
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
            <input
              type="datetime-local"
              id="start_time"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Start Time"
              value={start_time}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="end_time"
              className="block text-black text-sm font-bold mb-2"
            >
              End Time:
            </label>
            <input
              type="datetime-local"
              id="end_time"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="End Time"
              value={end_time}
              onChange={(e) => setEndTime(e.target.value)}
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
