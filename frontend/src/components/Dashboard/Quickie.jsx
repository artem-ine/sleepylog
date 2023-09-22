import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import useErrorHandler from "../../utils/errorHandler";
import EmojiPicker from "../Dashboard/Entries Modal/EmojiPicker"
import { toast } from 'react-toastify';

function Quickie({ onEntrySuccess, selectedDate }) {
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
          start_time: selectedDate,
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
        toast.error('Whoops! Something went wrong.')
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <div>
      <form
          className="bg-primary shadow-md rounded-2xl border border-secondary border-4 px-8 pt-6 pb-8"
          onSubmit={handleSubmit}
        >
        <p className="mb-2">How would you rate your sleep?</p>
        <EmojiPicker
          onSelectRating={(selectedRating) => setRating(selectedRating)}
        />
        <button
          type="submit"
          className="h-8 mt-2 px-4 bg-secondary border border-black hover:bg-blue-700 font-bold text-white text-sm rounded-xl focus:outline-none focus:shadow-outline"
        >
          Done
        </button>
      </form>
    </div>
  );
};

export default Quickie;
