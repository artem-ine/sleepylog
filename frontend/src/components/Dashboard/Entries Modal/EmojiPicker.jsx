import React, { useState } from "react";
import {
  FaFaceGrinWide,
  FaFaceSmile,
  FaFaceMeh,
  FaFaceSadTear,
  FaFaceSadCry,
} from "react-icons/fa6";
import "./Emoji.css";

function EmojiPicker({ onSelectRating }) {
  const [selectedRating, setSelectedRating] = useState(null);

  const emojiToRating = {
    horrible: <FaFaceSadCry style={{ color: "#790119" }} />,
    mediocre: <FaFaceSadTear style={{ color: "#CC6600" }} />,
    OK: <FaFaceMeh style={{ color: "#E3A92C" }} />,
    good: <FaFaceSmile style={{ color: "#B3B319" }} />,
    perfect: <FaFaceGrinWide style={{ color: "#4f8f00" }} />,
  };

  const emojiButtons = Object.keys(emojiToRating).map((emoji) => (
    <button
      key={emoji}
      type="button"
      onClick={() => handleEmojiClick(emoji)}
      className={`emoji-button ${selectedRating === emoji ? "selected" : ""}`}
    >
      {emojiToRating[emoji]}
    </button>
  ));

  const handleEmojiClick = (rating) => {
    setSelectedRating(rating);
    onSelectRating(rating);
  };

  return (
    <div>
      <div className="emoji-buttons flex text-xl justify-center flex-row gap-6 pb-1 rounded-xl py-2">
        {emojiButtons}
      </div>
      {selectedRating && (
        <p className="text-sm flex justify-center">
          You've had a {selectedRating} sleep!
        </p>
      )}
    </div>
  );
}

export default EmojiPicker;
