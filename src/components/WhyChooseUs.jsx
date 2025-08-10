import { FaChalkboardTeacher, FaClock, FaGlobe } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-6 tracking-tight">
          Why Choose <span className="text-indigo-500 dark:text-indigo-300">Language Exchange?</span>
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
          We provide the most flexible, affordable, and accessible language tutoring experience — anytime, anywhere.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[{
            Icon: FaChalkboardTeacher,
            title: "Expert Tutors",
            color: "text-indigo-600 dark:text-indigo-400",
            description:
              "Learn from verified, experienced tutors dedicated to helping you succeed in any language."
          }, {
            Icon: FaClock,
            title: "Flexible Scheduling",
            color: "text-green-600 dark:text-green-400",
            description:
              "Book sessions anytime — whether it's morning, evening, or weekends. Learn on your schedule."
          }, {
            Icon: FaGlobe,
            title: "Global Community",
            color: "text-yellow-500 dark:text-yellow-400",
            description:
              "Connect with learners and tutors worldwide. Exchange knowledge, culture, and friendships globally."
          }].map(({ Icon, title, color, description }, i) => (
            <div
              key={i}
              className="group relative rounded-3xl p-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-3xl hover:scale-105 transition-transform duration-400 ease-in-out cursor-pointer"
            >
              <Icon
                className={`${color} text-6xl mb-7 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500 ease-in-out drop-shadow-md`}
                aria-hidden="true"
              />
              <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                {title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
