import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  if (!news || !news._id) return null;

  return (
    <li className="list-rows border-b border-gray-300 pb-5 hover:bg-gray-100 transition rounded-lg">
      <Link
        to={`/news/${news._id}`}
        className="flex flex-col lg:flex-row gap-4 text-inherit no-underline items-start"
      >
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">
            {news.title}
          </h2>
          <p className="text-sm mt-2 text-gray-800">
            {`${news.subTitle || new Date(news.createdAt).toLocaleDateString()} ...`}
          </p>
        </div>

        {/* Image Always at Right */}
        {news.imageUrl && (
          <div className="w-full lg:w-80 ml-auto flex-shrink-0">
            <div className="aspect-video overflow-hidden rounded">
              <img
                src={news.imageUrl}
                alt="News"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </Link>
    </li>
  );
};

export default NewsCard;
