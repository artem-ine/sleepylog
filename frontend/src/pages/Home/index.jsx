import { useState, useEffect } from "react"; // Import useState and useEffect
import fetchApi from "../../utils/api";

// const userService = {
//   getUser: async () => {
//     const data = await fetchApi(`/articles`);
//     return data;
//   },
//   // Other methods for user-related API calls
// };

function Home() {
  // const [userData, setUserData] = useState(null); // Initialize a state variable

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const user = await userService.getUser();
  //       setUserData(user); // Update the state with the fetched data
  //     } catch (error) {
  //       // Handle errors here
  //       console.error(error);
  //     }
  //   }

  //   fetchData(); // Call the fetchData function when the component mounts
  // }, []);

  return (
    <div id="main" className="flex justify-center pt-10">
      <h1 className="text-xl font-heading flex">
        Welcome to artemine's boilerplate.
        {/* <p>{userData}</p>  */}
      </h1>
    </div>
  );
}

export default Home;
