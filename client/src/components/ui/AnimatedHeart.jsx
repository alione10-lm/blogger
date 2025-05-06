const AnimatedHeart = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-40 h-40">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <clipPath id="heartClip">
              <path d="M100 180s-70-40-70-100 70-70 70-10c0-60 70-50 70 10s-70 100-70 100z" />
            </clipPath>
          </defs>

          {/* Heart outline */}
          <path
            d="M100 180s-70-40-70-100 70-70 70-10c0-60 70-50 70 10s-70 100-70 100z"
            fill="none"
            stroke="red"
            strokeWidth="5"
          />

          {/* Animated fill */}
          <rect
            x="0"
            y="200"
            width="200"
            height="200"
            fill="red"
            clipPath="url(#heartClip)"
          >
            <animate
              attributeName="y"
              from="200"
              to="0"
              dur="1s"
              fill="freeze"
            />
          </rect>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedHeart;
