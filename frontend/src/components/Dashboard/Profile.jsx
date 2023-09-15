import { useAuth } from "../../utils/useAuth";

function Profile() {
  const { auth } = useAuth();

  console.log("Auth state in Profile component:", auth);

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {auth.user.email}</p>
      {/* Add more user profile information here */}
    </div>
  );
}

export default Profile;
