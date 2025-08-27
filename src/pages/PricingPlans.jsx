import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Basic",
    price: "Free",
    description: "Perfect for students getting started",
    features: [
      "Access to free tutors",
      "Community support",
      "Limited sessions",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    price: "$29/mo",
    description: "For serious learners with regular sessions",
    features: [
      "Unlimited bookings",
      "Priority tutor support",
      "1-on-1 private sessions",
      "Access to premium tutors",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$99/mo",
    description: "Best for institutions and large groups",
    features: [
      "Dedicated account manager",
      "Custom learning plans",
      "Group sessions",
      "24/7 premium support",
    ],
    popular: false,
  },
];

const PricingPlans = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            💳 Flexible Pricing Plans
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
            Choose a plan that fits your learning journey
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                plan.popular
                  ? "border-blue-600 scale-105"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">{plan.description}</p>
                <p className="mt-6 text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                  {plan.price}
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full mt-8 py-3 px-4 font-medium rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    plan.popular
                      ? "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-blue-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-400"
                  }`}
                >
                  {plan.popular ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
