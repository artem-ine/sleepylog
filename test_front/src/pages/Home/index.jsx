import fetchApi from "../../utils/api";

const userService = {
  getUser: async () => {
    const data = await fetchApi(`/`);
    return data;
  },

  // Other methods for user-related API calls
};

async function Home() {
  return (
    <div id="main" className="flex justify-center pt-10">
      <h1 className="text-xl font-bold flex">
        Welcome to artemine's boilerplate.
        <p>{await userService.getUser()}</p>
      </h1>
    </div>
  );
}

export default Home;
