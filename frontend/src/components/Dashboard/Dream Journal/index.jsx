import React from "react";

function DreamJournal({ likedEntries }) {
  return (
    <div>
      <h2>Dream Journal</h2>
      <ul>
        {likedEntries.map((entry) => (
          <li key={entry.id}>
            <p>{entry.start_date}</p>
            <p>{entry.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DreamJournal;
