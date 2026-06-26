import { useState } from "react";

function ImagesOfPost({ images }) {
  const [current, setCurrent] = useState(0);

  const handleScroll = (e) => {
    const index = Math.round(
      e.target.scrollLeft / e.target.clientWidth
    );
    setCurrent(index);
  };

  return (
    <div className="relative">
      <div
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {images.map((image, index) => (
          <div
            key={`${image.public_id}-${index}`}
            className="flex justify-center w-full min-w-full snap-start mt-4"
          >
            <img
              src={image.url}
              alt={`Post ${index + 1}`}
              className="w-11/12 max-h-125 object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                current === index
                  ? "bg-white"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImagesOfPost