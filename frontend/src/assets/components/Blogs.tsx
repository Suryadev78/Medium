export function BlogsComponent() {
  const content =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. ";

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const readingTime = calculateReadingTime(content);

  return (
    <div className="flex gap-2 p-1 border-b-2 border-gray-200">
      <div className="flex-grow flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span>Peter V.</span>
          <span>2024-02-02</span>
          <span>{readingTime} min read</span>
        </div>
        <div>
          <h3>How an Ugly Duckling Became a Beautiful Swan</h3>
          <p>{content}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <img
          width={220}
          height={230}
          src="https://imgs.search.brave.com/vgnBMpXmaodBEhuXOi75WvrDx0l6OR8n999fE5tuSYM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5jaW1hZ2VzLmNv/bS91cGxvYWRlZF9m/aWxlcy9pbWFnZS8x/OTIweDEwODAvZ2V0/dHlfMTI5NzE0MTY5/Xzk3MDY0Nzk3MDQ1/MDA0MV81NDI1MS5q/cGc"
          className="object-cover"
        />
      </div>
    </div>
  );
}
