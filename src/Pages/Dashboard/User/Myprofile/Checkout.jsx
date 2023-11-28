import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Checkout = ({ amount, setShowCheckoutForm }) => {
  const [secrete, setSecrete] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire(error.message);
    }

    if (paymentMethod) {
      const { paymentIntent, error: paymentError } =
        await stripe.confirmCardPayment(secrete, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymus",
              email: user?.email || "anonymus email",
            },
          },
        });

      if (paymentError) {
        Swal.fire("something went wrong !!! Payment eror");
      } else {
        axios
          .patch(`/update-user-subscribe`, {
            status: "Subscribed",
            email: user?.email,
          })
          .then((res) => {
            res.data.modifiedCount > 0 &&
              Swal.fire(`payment successfull trxID : ${paymentIntent.id}`);

            setShowCheckoutForm();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    axios
      .post("/create-payment-intents", { price: parseInt(100) })
      .then((res) => {
        setSecrete(res.data?.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <form onSubmit={handlePayment}>
      <div className="bg-gray-200 p-6 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-neutral mt-3 w-full"
        disabled={!stripe || !secrete}
      >
        Pay {amount}$
      </button>
    </form>
  );
};

Checkout.propTypes = {
  amount: PropTypes.number,
  setShowCheckoutForm: PropTypes.func,
};
export default Checkout;
