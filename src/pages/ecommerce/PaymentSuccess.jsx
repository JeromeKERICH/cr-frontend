import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyPayment } from "../../services/payment.service";

export default function PaymentSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const reference = params.get("reference");
    if (reference) verifyPayment(reference);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">
        Payment Successful 🎉
      </h1>
    </div>
  );
}
