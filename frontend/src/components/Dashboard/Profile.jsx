import React, { useState } from "react";
import { useAuth } from "../../utils/useAuth";
import { useEffect } from "react";

function Profile() {
  const { auth } = useAuth();
  const [profileData, setProfileData] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      const jwtToken = auth.token;

      fetch(`http://127.0.0.1:3000/users/${auth.user.user_id}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProfileData(data);
          console.log("setProfileData:");
          console.log(data);
          setUpdatedProfile({
            username: data.username,
            email: data.email,
            password: data.password,
          });
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [auth.isAuthenticated, auth.token]);

  const handleUpdate = () => {
    const jwtToken = auth.token;

    const updatedData = {
      username: updatedProfile.username,
      email: updatedProfile.email,
      password: updatedProfile.password,
    };

    fetch(`http://localhost:1337/api/users/${profileData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div>
      {auth.isAuthenticated ? (
        profileData ? (
          <div>
            {editing ? (
              <div>
                <h2>Update Your Profile</h2>
                <form onSubmit={handleUpdate}>
                  <label>
                    Username:
                    <input
                      type="text"
                      value={updatedProfile.username}
                      onChange={(e) =>
                        setUpdatedProfile({
                          ...updatedProfile,
                          username: e.target.value,
                        })
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Email:
                    <input
                      type="text"
                      value={updatedProfile.email}
                      onChange={(e) =>
                        setUpdatedProfile({
                          ...updatedProfile,
                          email: e.target.value,
                        })
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Password:
                    <input
                      type="text"
                      onChange={(e) =>
                        setUpdatedProfile({
                          ...updatedProfile,
                          password: e.target.value,
                        })
                      }
                    />
                  </label>
                  <br />
                  <button type="submit">Update</button>
                  <button onClick={() => setEditing(false)}>Cancel</button>
                </form>
              </div>
            ) : (
              <div>
                <h2>Welcome to your profile, {profileData.username}!</h2>
                <p>Email: {profileData.email}</p>
                <p>Description: {profileData.description}</p>
                <button onClick={() => setEditing(true)}>Update Profile</button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading profile data...</p>
        )
      ) : (
        <p>You must be logged in to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;
