
import { useState } from "react";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { createOpportunity } from "../../services/api";

const initialForm = {
  title: "",
  category: "Hackathon",
  date: "",
  time: "",
  mode: "Online",
  location: "",
  deadline: "",
  maxParticipants: "",
  description: "",
  organization: "",
  applicationLink: "",
};

export default function CreateEvent() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsSubmitting(true);

    try {
      const eventData = {
        title: form.title.trim(),
        description: form.description.trim(),
        organization: form.organization.trim(),
        category: form.category,
        location:
          form.mode === "Online"
            ? "Online"
            : form.location.trim(),
        deadline: form.deadline,
        applicationLink: form.applicationLink.trim(),
      };

      const result = await createOpportunity(eventData);

      setMessage(result.message || "Event created successfully!");
      setForm(initialForm);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Unable to create event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-[#D9DCD6] bg-transparent p-3 outline-none focus:border-[#1F4D3F]";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1E1E1C]">
          Create Event
        </h1>
        <p className="mt-1 text-sm text-[#6B6F6B]">
          Add the details of your upcoming event.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-5 rounded-2xl bg-[#EEEEEB] p-5 sm:p-7"
      >
        <div>
          <label className="mb-2 block font-medium">
            Event Title *
          </label>
          <input
            className={fieldClass}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter event name"
            minLength={2}
            maxLength={200}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Category *
            </label>
            <select
              className={fieldClass}
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option>Hackathon</option>
              <option>Internship</option>
              <option>Workshop</option>
              <option>Competition</option>
              <option>Seminar</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Event Mode *
            </label>
            <select
              className={fieldClass}
              name="mode"
              value={form.mode}
              onChange={handleChange}
              required
            >
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 font-medium">
              <CalendarDays size={17} /> Event Date *
            </label>
            <input
              className={fieldClass}
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 font-medium">
              <Clock size={17} /> Event Time *
            </label>
            <input
              className={fieldClass}
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 font-medium">
              <MapPin size={17} /> Location
            </label>
            <input
              className={fieldClass}
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter venue or online link"
              required={form.mode !== "Online"}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Registration Deadline *
            </label>
            <input
              className={fieldClass}
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Organization *
            </label>
            <input
              className={fieldClass}
              name="organization"
              value={form.organization}
              onChange={handleChange}
              placeholder="Enter organization name"
              minLength={2}
              maxLength={200}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Application Link *
            </label>
            <input
              className={fieldClass}
              type="url"
              name="applicationLink"
              value={form.applicationLink}
              onChange={handleChange}
              placeholder="https://example.com/apply"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block font-medium">
              Maximum Participants *
            </label>
            <input
              className={fieldClass}
              type="number"
              name="maxParticipants"
              value={form.maxParticipants}
              onChange={handleChange}
              min="1"
              placeholder="Enter participant limit"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Event Description *
          </label>
          <textarea
            className={fieldClass}
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            minLength={10}
            maxLength={5000}
            placeholder="Describe your event..."
            required
          />
        </div>

        {message && (
          <p
            role="status"
            className={`text-sm font-medium ${
              isError ? "text-red-700" : "text-[#1F4D3F]"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-[#1F4D3F] px-6 py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}