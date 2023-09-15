import React from "react";
import { useAuth } from "../../utils/useAuth";

function Profile() {
  const { auth, handleLogout } = useAuth();

  // State to track whether the profile is in edit mode
  const [isEditing, setIsEditing] = React.useState(false);

  // State to store modified profile data
  const [modifiedProfileData, setModifiedProfileData] = React.useState({
    email: auth.user.email,
    username: auth.user.username,
  });

  const handleModifyProfileClick = () => {
    setIsEditing(true);
  };

  const handleSaveProfileClick = () => {
    // Perform an API request to update the user's profile with modifiedProfileData
    // You can use fetch or an API client library like Axios

    // Assuming a successful update, update the auth state
    // This is a simplified example, please handle errors appropriately
    const updatedUser = { ...auth.user, ...modifiedProfileData };
    auth.setAuth({ ...auth, user: updatedUser });

    // Exit edit mode
    setIsEditing(false);
  };

  const handleDeleteAccountClick = () => {
    // Implement your logic to delete the user's account here
    // You can show a confirmation dialog to confirm the deletion

    // Assuming a successful deletion, log the user out and redirect to the login page
    handleLogout();
  };

  return (
    <div>
      <h2>Profile</h2>
      {isEditing ? (
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={modifiedProfileData.email}
            onChange={(e) =>
              setModifiedProfileData({
                ...modifiedProfileData,
                email: e.target.value,
              })
            }
          />
          <br />
          <label>Username:</label>
          <input
            type="text"
            value={modifiedProfileData.username}
            onChange={(e) =>
              setModifiedProfileData({
                ...modifiedProfileData,
                username: e.target.value,
              })
            }
          />
          <br />
          <button onClick={handleSaveProfileClick}>Save Profile</button>
        </div>
      ) : (
        <div>
          <p>Email: {auth.user.email}</p>
          <p>Username: {auth.user.username}</p>
          <button onClick={handleModifyProfileClick}>Modify Profile</button>
          <button onClick={handleDeleteAccountClick}>Delete Account</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
