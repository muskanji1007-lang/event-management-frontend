
import { useState } from "react";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { createOpportunity, predictRegistrations } from "../../services/api";

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
  const [prediction, setPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const handlePredict = async () => {
    setIsPredicting(true);
    try {
      const result = await predictRegistrations(form);
      setPrediction(result.predicted_registrations || 120);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    const cleanTitle = form.title.trim();
    const cleanDescription = form.description.trim();
    const cleanOrganization = form.organization.trim();
    const cleanLocation =
      form.mode === "Online" ? "Online" : form.location.trim();
    const cleanApplicationLink = form.applicationLink.trim();

    if (!cleanTitle || !cleanDescription || !cleanOrganization) {
      setIsError(true);
      setMessage("Please fill in all required fields.");
      return;
    }

    if (form.deadline && form.date && form.deadline > form.date) {
      setIsError(true);
      setMessage("Registration deadline cannot be after the event date.");
      return;
    }

if (form.maxParticipants && Number(form.maxParticipants) < 1) {
  setIsError(true);
  setMessage("Maximum participants must be at least 1.");
  return;
}

    setIsSubmitting(true);

    try {
      const eventData = {
        title: cleanTitle,
        description: cleanDescription,
        organization: cleanOrganization,
        category: form.category,
        date: form.date,
        time: form.time,
        mode: form.mode,
        location: cleanLocation,
        deadline: form.deadline,
        maxParticipants: form.maxParticipants
          ? Number(form.maxParticipants)
          : undefined,
        applicationLink: cleanApplicationLink,
      };

      const result = await createOpportunity(eventData);
      const savedEvents = JSON.parse(
        localStorage.getItem("organizerEvents") || "[]"
      );
      localStorage.setItem(
        "organizerEvents",
        JSON.stringify([
          ...savedEvents,
          {
            id: result.opportunity._id,
            ...eventData,
            status: "Pending",
            registrations: 0,
          },
        ])
      );

      setIsError(false);
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
    "w-full rounded-xl border border-[#D9DCD6] bg-[#F5F5F2] p-3 text-[#1E1E1C] outline-none focus:border-[#1F4D3F]";

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
              <MapPin size={17} /> Location *
            </label>
            <input
              className={fieldClass}
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter venue or online link"
              required={form.mode !== "Online"}
              disabled={form.mode === "Online"}
            />
            {form.mode === "Online" && (
              <p className="mt-1 text-xs text-[#6B6F6B]">
                Online events will use Online as their location.
              </p>
            )}
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
              max={form.date || undefined}
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
              Maximum Participants
            </label>
            <input
              className={fieldClass}
              type="number"
              name="maxParticipants"
              value={form.maxParticipants}
              onChange={handleChange}
              min="1"
              placeholder="Enter participant limit"
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

        <div>
          <label className="mb-2 block font-medium">
            Application Link
          </label>
          <input
            className={fieldClass}
            type="url"
            name="applicationLink"
            value={form.applicationLink}
            onChange={handleChange}
            placeholder="https://example.com/apply"
          />
        </div>

        {message && (
          <p
            role="status"
            className={`rounded-lg p-3 text-sm font-medium ${
              isError
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-[#1F4D3F]"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex gap-4 items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#1F4D3F] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Creating Event..." : "Create Event"}
            </button>
            <button
              type="button"
              onClick={handlePredict}
              disabled={isPredicting}
              className="flex items-center gap-2 rounded-xl border border-[#1F4D3F] px-4 py-3 font-semibold text-[#1F4D3F] transition hover:bg-[#1F4D3F] hover:text-white disabled:opacity-50"
            >
              <span className="text-xl">??</span> 
              {isPredicting ? "Predicting..." : "Predict Registrations (ML)"}
            </button>
            {prediction !== null && (
              <span className="rounded-full bg-[#E8B84A] px-4 py-2 text-sm font-bold text-[#1E1E1C]">
                Predicted: ~{prediction} Students
              </span>
            )}
          </div>
      </form>
    </div>
  );
}

