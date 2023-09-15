import React, { useState, useEffect } from "react";
import { useAuth } from "../../utils/useAuth";

const Profile = () => {
  const auth = useAuth(); // Access the auth context

  // Destructure user information from the auth context
  const { user, updateUser, deleteUser } = auth;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateClick = () => {
    // Perform validation on formData if needed
    updateUser(formData);
    setIsEditing(false);
  };

  // Delete the account using the deleteUser function from the auth context
  const handleDeleteClick = () => {
    // Ask for confirmation or show a modal before deletion
    deleteUser();
  };

  useEffect(() => {
    // Set the form data whenever the user prop changes
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      confirmPassword: "",
    });
  }, [user]);

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>

      {isEditing ? (
        <div>
          <h3>Edit Profile</h3>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <br />
          <button onClick={handleUpdateClick}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={handleDeleteClick}>Delete Account</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
