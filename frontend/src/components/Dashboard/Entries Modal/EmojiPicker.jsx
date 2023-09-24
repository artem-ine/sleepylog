import React, { useState } from "react";

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
      className={selectedRating === emojiToRating[emoji] ? "selected" : ""}
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
      <h2 className="text-sm font mb-1 font-bold">How well did you sleep?</h2>
      <div className="emoji-buttons flex flex-row gap-8 pb-1">
        {emojiButtons}
      </div>
      {selectedRating && (
        <p className="text-sm">You've had a {selectedRating} sleep!</p>
      )}
    </div>
  );
}

export default EmojiPicker;
