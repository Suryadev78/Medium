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
  author,
  date,
}: BlogsComponentProps) {
  const navigate = useNavigate();
  const calculateReadingTime = (text: string) => {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const readingTime = calculateReadingTime(content);

  return (
    <div
      onClick={() => navigate(`/read-blogs/${id}`)}
      className="flex justify-center"
    >
      <div className="max-w-2xl border-b-2 border-gray-200 py-2 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>{author}</span>
            <span>{date}</span>
            <span>{readingTime} min read</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p>
              {content
                ? content.length > 150
                  ? content.slice(0, 150) + "..."
                  : content
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
