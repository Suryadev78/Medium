import { useNavigate } from "react-router-dom";

interface BlogsComponentProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date?: string;
}

export function BlogsComponent({
  id,
  title,
  content,
  date,
}: BlogsComponentProps) {
  const navigate = useNavigate();
  const calculateReadingTime = (text: string) => {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readingTime = calculateReadingTime(content);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <div
      onClick={() => navigate(`/read-blogs/${id}`)}
      className="flex justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="max-w-2xl border-b border-gray-200 py-6 w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3 flex items-center justify-center text-white font-bold"></div>
            <span className="mr-2">{formatDate(date)}</span>
            <span>·</span>
            <span className="ml-2">{readingTime} min read</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-700">
              {content && content.length > 150
                ? `${content.slice(0, 150)}...`
                : content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
