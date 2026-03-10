import { useState } from "react";
import { createBooking } from "../../services/booking.service";
import { useNavigate } from "react-router-dom";

export default function BookConsultation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    legalMatter: "",
    meetingType: "zoom",
    date: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await createBooking(form);
    navigate("/dashboard");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Book Consultation
      </h1>

      <form onSubmit={submit} className="space-y-3">
        <input
          placeholder="Full Name"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <textarea
          placeholder="Legal matter"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, legalMatter: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, meetingType: e.target.value })}
        >
          <option value="zoom">Zoom</option>
          <option value="google_meet">Google Meet</option>
          <option value="teams">Microsoft Teams</option>
          <option value="skype">Skype</option>
        </select>

        <input
          type="datetime-local"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <button className="bg-blue-600 text-white w-full p-2">
          Book Appointment
        </button>
      </form>
    </div>
  );
}
