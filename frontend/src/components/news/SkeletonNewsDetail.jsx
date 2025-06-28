const SkeletonNewsDetail = () => {
  return (
    <div className="flex justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white p-6 space-y-6 rounded shadow animate-pulse">
        {/* Title */}
        <div className="h-8 bg-gray-300 rounded w-3/4" />

        {/* Meta */}
        <div className="flex justify-between text-sm text-gray-500">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-40" />
            <div className="h-4 bg-gray-200 rounded w-64" />
          </div>
          <div className="flex space-x-4">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Image */}
        <div className="aspect-video bg-gray-300 rounded w-full" />

        {/* Paragraph */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full" />
          ))}
        </div>

        {/* Summary button */}
        <div className="h-10 w-40 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default SkeletonNewsDetail;
