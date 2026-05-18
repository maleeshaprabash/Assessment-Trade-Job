"use client";

import { useState } from "react";

const CATEGORIES = ["Plumbing", "Electrical", "Roofing", "Painting"];

const FIELDS = [
  { id: "location", label: "Location", placeholder: "e.g. Glasgow, G1" },
  { id: "title", label: "Job Title", placeholder: "e.g. Leaking kitchen tap needs fixing" },
  { id: "contactName", label: "Your Name", placeholder: "e.g. James" },
  { id: "urgency", label: "Urgency", placeholder: "e.g. Flexible, This Week, Urgent" },
];

const INITIAL_FORM = {
  location: "",
  title: "",
  contactName: "",
  urgency: "",
  description: "",
};

export default function NewJob() {
  const [category, setCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, ...formData }),
    });

    if (res.ok) {
      setFormData(INITIAL_FORM);
      setCategory("");
      alert("Job posted successfully!");
    } else {
      alert("Failed to post job. Please try again.");
    }
  };

  return (
    <div className="min-w-md mx-auto px-6 py-10 font-mono text-sm">
      <h1 className="text-xl font-bold mb-8 capitalize">Post a New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label className="block mb-1 text-gray-600">Trade Type</label>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full flex justify-between items-center border rounded px-3 py-2 bg-white"
          >
            <span className={category ? "text-black" : "text-gray-400"}>
              {category || "Select category"}
            </span>
            <span>▾</span>
          </button>

          {dropdownOpen && (
            <ul className="absolute z-10 w-full mt-1 border rounded shadow-md bg-white">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat}
                  onClick={() => { setCategory(cat); setDropdownOpen(false); }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        {FIELDS.map(({ id, label, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block mb-1 text-gray-600">{label}</label>
            <input
              id={id}
              type="text"
              placeholder={placeholder}
              value={formData[id as keyof typeof formData]}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        ))}

        <div>
          <label htmlFor="description" className="block mb-1 text-gray-600">Description</label>
          <textarea
            id="description"
            rows={5}
            placeholder="Describe the problem — size of job, access, urgency, etc."
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full border py-2 rounded hover:bg-gray-50 transition-colors"
        >
          ➤ Post Job Request
        </button>
      </form>
    </div>
  );
}