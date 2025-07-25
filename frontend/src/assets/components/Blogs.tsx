import { useNavigate } from "react-router-dom";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";

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
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readingTime = calculateReadingTime(content);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Generate author initials for avatar
  const getAuthorInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      onClick={() => navigate(`/read-blogs/${id}`)}
      className="group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
        <div className="p-8">
          {/* Header with author info and metadata */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {getAuthorInitials(author)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="flex items-center text-gray-900 font-semibold">
                  <User className="w-4 h-4 mr-1 text-gray-600" />
                  {author}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="mr-3">{formatDate(date)}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {content && content.length > 200
                ? `${content.slice(0, 200)}...`
                : content}
            </p>
          </div>

          {/* Bottom section with tags and read more */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                Article
              </span>
              <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
                {readingTime} min
              </span>
            </div>
            <div className="text-blue-500 font-medium text-sm group-hover:text-blue-600 transition-colors duration-300">
              Read more →
            </div>
          </div>
        </div>

        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/20 group-hover:to-purple-50/20 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
}