import { useNavigate } from "react-router-dom";
import useNewsStore from "../../store/newsStore.js";

const Menus = () => {
  const categories = [
    "Sports",
    "Politics",
    "Entertainment",
    "Technology",
    "Crime",
    "Finance",
    "Food",
    "Travel"
  ];

  const navigate = useNavigate(); // ✅ Hook from react-router-dom
  const { fetchNews, setCategory } = useNewsStore();

  const handleClick = (item) => {
    setCategory(item);
    fetchNews();
  };

  const handleHomeClick = () => {
    setCategory(""); // Clear selected category
    fetchNews(); // Fetch all news
    navigate("/"); // ✅ Go to home route
  };

  return (
    <div className="border-y border-gray-300 lg:mb-3">
      <ul className="flex flex-wrap lg:flex-nowrap overflow-x-auto w-full justify-center lg:justify-center">
        <li
          onClick={handleHomeClick}
          className="hover:bg-gray-400 py-2 px-3 font-medium cursor-pointer whitespace-nowrap"
        >
          Home
        </li>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(item)}
            className="hover:bg-gray-400 py-2 px-3 font-medium cursor-pointer whitespace-nowrap"
          >
            <a>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menus;
