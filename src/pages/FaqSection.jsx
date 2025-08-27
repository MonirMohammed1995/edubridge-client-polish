import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a tutor?",
    answer:
      "Simply create an account, browse tutors by category or language, and click on the 'Book Session' button. You’ll be able to schedule a time that works best for you.",
  },
  {
    question: "Can I cancel or reschedule a session?",
    answer:
      "Yes, you can easily cancel or reschedule sessions from your dashboard. Please note that cancellations must be made at least 24 hours in advance.",
  },
  {
    question: "Do you offer group classes?",
    answer:
      "Yes! We provide both 1-on-1 tutoring and group learning options depending on the tutor’s availability.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit/debit cards via Stripe for secure payments. Subscription-based plans are also available.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a free trial session with selected tutors so you can experience our platform before committing to a plan.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            ❓ Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
            Find answers to common questions about our tutor booking platform
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
              >
                <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                </motion.span>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
