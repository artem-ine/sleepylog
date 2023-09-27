import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/useAuth";
import EmojiPicker from "./EmojiPicker";
import { toast } from "react-toastify";

function Quickie({ onEntrySuccess, selectedDate }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [rating, setRating] = useState("");
  const [duration] = useState("");
  const [notes] = useState("");

  const oneDay = 24 * 60 * 60 * 1000;
  const dayBefore = new Date(selectedDate.getTime() - oneDay);

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
          start_time: dayBefore,
          end_time: selectedDate,
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
        toast.error("Whoops! Something went wrong.");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <div>
      <form className="px-4 pt-3" onSubmit={handleSubmit}>
        <div className="mt-4">
          <h2 className="text-sm font mb-1 font-bold">
            How well did you sleep?
          </h2>
          <EmojiPicker
            onSelectRating={(selectedRating) => setRating(selectedRating)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-8 h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent font-bold text-white dark:text-black text-sm rounded-xl"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
}

export default Quickie;
