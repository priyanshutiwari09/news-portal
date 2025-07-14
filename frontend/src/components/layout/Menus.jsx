import { useNavigate } from "react-router-dom";
import useNewsStore from "../../store/newsStore.js";
import { useEffect } from "react";

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

  const navigate = useNavigate();
  const { fetchNews, setCategory, category } = useNewsStore();

  // ✅ Trigger fetch only when category changes
  useEffect(() => {
    fetchNews();
  }, [category]);

  const handleClick = (item) => {
    if (category !== item) {
      setCategory(item); // this will auto-trigger fetchNews due to effect
    }
    navigate("/");
  };

  const handleHomeClick = () => {
    if (category !== "") {
      setCategory(""); // reset to home news
    }
    navigate("/");
  };

  const getItemClass = (item) => {
    const isActive = category === item;
    return `py-2 px-3 font-medium cursor-pointer whitespace-nowrap ${
      isActive ? "bg-gray-300 text-black" : "hover:bg-gray-400"
    }`;
  };

  return (
    <div className="border-y border-gray-300 lg:mb-3">
      <ul className="flex flex-nowrap overflow-x-auto w-full justify-start lg:justify-center md:justify-center px-4 no-scrollbar">
        <li
          onClick={handleHomeClick}
          className={`py-2 px-3 font-medium cursor-pointer whitespace-nowrap ${
            category === "" ? "bg-gray-300 text-black" : "hover:bg-gray-400"
          }`}
        >
          Home
        </li>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(item)}
            className={getItemClass(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menus;
