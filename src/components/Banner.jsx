import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const bannerData = [
  {
    id: 1,
    title: "Learn Anything, Anytime",
    description: "Connect with expert tutors across all subjects and levels.",
    image: "https://i.postimg.cc/FK4t4PkL/slider-1.jpg"
  },
  {
    id: 2,
    title: "Boost Your Skills",
    description: "Upgrade your knowledge with personalized guidance.",
    image: "https://i.postimg.cc/jSWNbcYt/slider-2.jpg"
  },
  {
    id: 3,
    title: "Find the Perfect Tutor",
    description: "Explore profiles, read reviews, and book instantly.",
    image: "https://i.postimg.cc/k5qncMcz/slider-3.jpg"
  },
  {
    id: 4,
    title: "Flexible Learning",
    description: "Study at your pace — anytime, anywhere.",
    image: "https://i.postimg.cc/Qxzm1HXN/slider-4.jpg"
  },
  {
    id: 5,
    title: "Start Your Journey Today",
    description: "Join EduBridge and unlock your potential.",
    image: "https://i.postimg.cc/XYMFnFj5/slider-5.jpg"
  }
];

const Banner = () => {
  return (
    <section className="relative">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={6000}
        transitionTime={1200}
        swipeable
        emulateTouch
        showArrows={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-3 bg-indigo-700 bg-opacity-60 rounded-full text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Previous Slide"
            >
              &#8592;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-3 bg-indigo-700 bg-opacity-60 rounded-full text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Next Slide"
            >
              &#8594;
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <button
            type="button"
            onClick={onClickHandler}
            className={`w-4 h-4 rounded-full mx-1 focus:outline-none ${
              isSelected
                ? 'bg-indigo-600 shadow-lg'
                : 'bg-indigo-300 hover:bg-indigo-500'
            }`}
            aria-label={`${label} ${index + 1}`}
            aria-current={isSelected ? 'true' : 'false'}
            key={index}
          />
        )}
      >
        {bannerData.map(({ id, title, description, image }) => (
          <div key={id} className="relative">
            <img
              src={image}
              alt={title}
              className="h-[450px] md:h-[600px] w-full object-cover brightness-90 transition duration-700 ease-in-out"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 max-w-xl text-left">
              <h2
                className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg"
                style={{ letterSpacing: '0.03em' }}
              >
                {title}
              </h2>
              <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed drop-shadow-md">
                {description}
              </p>
              <Link
                to="/register"
                className="mt-8 inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 text-white font-semibold rounded-lg shadow-lg transition transform hover:-translate-y-1 focus:outline-none"
                aria-label="Get Started with EduBridge"
              >
                Get Started
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
