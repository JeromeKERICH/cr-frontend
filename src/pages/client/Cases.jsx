import { useEffect, useState } from "react";
import { getMyBookings } from "../../services/booking.service";

export default function Cases() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBookings().then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="font-bold mb-4">My Appointments</h1>

      {bookings.map((b) => (
        <div key={b._id} className="border p-3 mb-2">
          <p><b>Date:</b> {new Date(b.date).toLocaleString()}</p>
          <p><b>Platform:</b> {b.meetingType}</p>
          <a
            href={b.meetingLink}
            target="_blank"
            className="text-blue-600 underline"
          >
            Join Meeting
          </a>
        </div>
      ))}
    </div>
  );
}
