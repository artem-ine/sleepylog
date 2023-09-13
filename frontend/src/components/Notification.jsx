import React from "react";

const Notification = ({ message, type }) => {
  return (
    <div
      className={`notification bg-${type}-500 text-white p-4 rounded-md shadow-md`}
    >
      {message}
    </div>
  );
};

export default Notification;

/* WAYS TO USE:

  const [showNotification, setShowNotification] = useState(false);

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Hide the notification after 3 seconds
  };

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleShowNotification}>Show Notification</button>
      {showNotification && (
        <Notification type="green" message="Action successful!" />
      )}
    </div>
  );
};


--> customize type variable

*/
