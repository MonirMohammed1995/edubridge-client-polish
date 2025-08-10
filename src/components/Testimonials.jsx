import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sarah Lopez",
    language: "Spanish Learner",
    comment: "This platform helped me become fluent in just 4 months! The tutors are super friendly and flexible.",
    img: "https://i.postimg.cc/jS1sBpJJ/images.jpg",
  },
  {
    name: "Kenji Takahashi",
    language: "English Learner",
    comment: "Excellent tutoring experience! Booking and communication was seamless.",
    img: "https://i.postimg.cc/T1Qx0F61/1517277249021.jpg",
  },
  {
    name: "Ayesha Rahman",
    language: "French Learner",
    comment: "Highly recommended! Affordable and the review system is very helpful to choose tutors.",
    img: "https://i.postimg.cc/nrS5CJx4/1628160790233.jpg",
  },
  {
    name: "Liam Patel",
    language: "German Learner",
    comment: "The platform's user interface is clean and tutors are excellent. Love the review and rating system.",
    img: "https://i.postimg.cc/9QGFNLyK/download-1.jpg",
  },
  {
    name: "Mina Chen",
    language: "Japanese Learner",
    comment: "A wonderful experience with native speakers. Flexible schedules and affordable pricing!",
    img: "https://i.postimg.cc/mrB2x7wD/download.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 relative overflow-hidden">
      {/* Background Accent Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">
          What Our <span className="text-blue-700">Learners</span> Say
        </h2>
        <p className="mb-12 text-gray-700 text-lg max-w-2xl mx-auto">
          Hear directly from our global community about how <strong>Language Exchange</strong> has helped them achieve their goals.
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Autoplay]}
          className="pb-16"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                <div className="flex items-center gap-5 mb-6">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500/50 hover:ring-blue-500 transition-all duration-300"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-gray-900">{t.name}</h4>
                    <span className="text-sm text-blue-600 font-medium">{t.language}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed relative pl-6">
                  <FaQuoteLeft className="absolute left-0 top-0 text-blue-500 opacity-60" />
                  {t.comment}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
