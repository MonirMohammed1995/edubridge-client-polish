import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';

const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic',
  'Japanese', 'Hindi', 'Bengali', 'Korean', 'Italian', 'Russian'
];

// Input, Select, TextArea components unchanged except minor styling tweaks below for consistency

const Input = ({ label, name, value, onChange, placeholder, type = 'text', disabled, required, error }) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={name}
      className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none"
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      aria-invalid={error ? 'true' : 'false'}
      className={`w-full px-4 py-3 rounded-lg border
        border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition
        disabled:cursor-not-allowed disabled:opacity-60
        ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 select-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const Select = ({ label, name, value, onChange, options, required, error }) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={name}
      className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      aria-invalid={error ? 'true' : 'false'}
      className={`w-full px-4 py-3 rounded-lg border
        border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition
        ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 select-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const TextArea = ({ label, name, value, onChange, placeholder, rows = 5, required, error }) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={name}
      className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      placeholder={placeholder}
      aria-invalid={error ? 'true' : 'false'}
      className={`w-full px-4 py-3 rounded-lg border
        border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition resize-none
        ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 select-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const AddTutor = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    tutorName: '',
    tutorEmail: '',
    image: '',
    language: '',
    price: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.tutorName.trim()) newErrors.tutorName = 'Tutor name is required.';
    if (!formData.tutorEmail.trim()) newErrors.tutorEmail = 'Tutor email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.tutorEmail)) newErrors.tutorEmail = 'Invalid email format.';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required.';
    if (!formData.language) newErrors.language = 'Please select a language.';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = 'Price must be a positive number.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire('⚠️ Validation Error', 'Please fix the errors in the form.', 'warning');
      return;
    }

    const newTutor = {
      name: user?.displayName,
      userEmail: user?.email,
      tutorName: formData.tutorName.trim(),
      tutorEmail: formData.tutorEmail.trim(),
      image: formData.image.trim(),
      language: formData.language,
      price: parseFloat(formData.price),
      description: formData.description.trim(),
      review: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tutors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTutor),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('✅ Success!', 'Tutor added successfully!', 'success');
        setFormData({
          tutorName: '',
          tutorEmail: '',
          image: '',
          language: '',
          price: '',
          description: '',
        });
        setErrors({});
      } else {
        Swal.fire('❌ Error', data?.message || 'Failed to add tutor', 'error');
      }
    } catch (error) {
      Swal.fire('❌ Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-16
        bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <Helmet>
        <title>Add Tutor</title>
      </Helmet>

      <section
        className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12
          border border-gray-300 dark:border-gray-700"
        aria-label="Add a new tutor form"
      >
        <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100 tracking-tight">
          Add a New Tutor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10" noValidate>
          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Your Name" value={user?.displayName || ''} disabled />
            <Input label="Your Email" value={user?.email || ''} disabled />
          </div>

          {/* Tutor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Tutor Name"
              name="tutorName"
              placeholder="Full Name"
              value={formData.tutorName}
              onChange={handleChange}
              required
              error={errors.tutorName}
            />
            <Input
              label="Tutor Email"
              name="tutorEmail"
              type="email"
              placeholder="example@tutor.com"
              value={formData.tutorEmail}
              onChange={handleChange}
              required
              error={errors.tutorEmail}
            />
          </div>

          {/* Image + Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Tutor Image URL"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              required
              error={errors.image}
            />
            <Select
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              options={LANGUAGES}
              required
              error={errors.language}
            />
          </div>

          {/* Price */}
          <Input
            label="Price ($)"
            name="price"
            type="number"
            placeholder="e.g. 30"
            value={formData.price}
            onChange={handleChange}
            required
            error={errors.price}
          />

          {/* Description */}
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Write a short description about the tutor..."
            error={errors.description}
          />

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-indigo-600 hover:bg-indigo-700
                text-white font-semibold px-20 py-4 rounded-full
                shadow-lg hover:shadow-xl transition focus:outline-none focus:ring-4
                focus:ring-indigo-500"
            >
              Submit Tutor
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddTutor;
