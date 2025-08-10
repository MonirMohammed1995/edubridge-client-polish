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
        interval={5000}
        transitionTime={900}
        swipeable
        emulateTouch
        showArrows={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 left-6 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white shadow-md transition-all"
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
              className="absolute top-1/2 right-6 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white shadow-md transition-all"
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
            className={`w-3 h-3 rounded-full mx-1 transition-all ${
              isSelected
                ? 'bg-indigo-600 scale-110 shadow-lg'
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`${label} ${index + 1}`}
            aria-current={isSelected ? 'true' : 'false'}
            key={index}
          />
        )}
      >
        {bannerData.map(({ id, title, description, image }) => (
          <div key={id} className="relative group">
            <img
              src={image}
              alt={title}
              className="h-[450px] md:h-[600px] w-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent backdrop-blur-[1px]" />
            <div className="absolute top-1/2 left-6 md:left-12 transform -translate-y-1/2 max-w-lg text-left animate-fadeInUp">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                {title}
              </h2>
              <p className="mt-3 md:mt-5 text-base md:text-lg text-gray-200 max-w-md leading-relaxed drop-shadow-md">
                {description}
              </p>
              <Link
                to="/register"
                className="mt-6 inline-block px-7 py-3 bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl focus:ring-4 focus:ring-indigo-500 text-white font-medium rounded-full shadow-md transition-all duration-300"
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
