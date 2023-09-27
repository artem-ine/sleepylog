import React, { useState } from "react";
import "./Emoji.css";

function EmojiPicker({ onSelectRating }) {
  const [selectedRating, setSelectedRating] = useState(null);

  const emojiToRating = {
    "😫": "horrible",
    "😐": "mediocre",
    "😊": "OK",
    "😄": "good",
    "😍": "perfect",
  };

  const emojiButtons = Object.keys(emojiToRating).map((emoji) => (
    <button
      key={emoji}
      type="button"
      onClick={() => handleEmojiClick(emojiToRating[emoji])}
      className={`emoji-button ${selectedRating === emojiToRating[emoji] ? "selected" : ""}`}
    >
      {emoji}
    </button>
  ));

  const handleEmojiClick = (rating) => {
    setSelectedRating(rating);
    onSelectRating(rating);
  };

  return (
    <div>
      <div className="emoji-buttons flex justify-center flex-row gap-6 pb-1 rounded-xl py-2">
        {emojiButtons}
      </div>
      {selectedRating && (
        <p className="text-sm flex justify-center">You've had a {selectedRating} sleep!</p>
      )}
    </div>
  );
}

export default EmojiPicker;
