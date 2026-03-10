import { initPayment } from "../../services/payment.service";

export default function PayButton({ amount, purpose }) {
  const pay = async () => {
    const res = await initPayment({ amount, purpose });
    window.location.href = res.data.authorization_url;
  };

  return (
    <button
      onClick={pay}
      className="bg-green-600 text-white px-4 py-2"
    >
      Pay KES {amount}
    </button>
  );
}
