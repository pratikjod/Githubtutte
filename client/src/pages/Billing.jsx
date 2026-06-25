import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Billing() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const sendInvoice = async () => {
    try {
      if (cart.length === 0) {
        alert("No Products Selected");
        return;
      }

      if (!customerName.trim()) {
        alert("Enter Customer Name");
        return;
      }

      const cleanPhone = phone.replace(/\D/g, "");

      if (!cleanPhone || cleanPhone.length !== 10) {
        alert("Enter valid 10 digit WhatsApp Number");
        return;
      }

      const billData = {
        customerName: customerName.trim(),
        phone: cleanPhone,
        items: cart,
        totalAmount: total,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bills/save`,
        billData
      );

      if (!response.data.success) {
        alert("Invoice Save Failed");
        console.log(response.data);
        return;
      }

      const mongoId = response.data.billId;

      const invoiceLink =
        `https://githubtutte-peach.vercel.app/#/invoice/${mongoId}`;

      const message =
`Your Invoice is Ready

Please access your invoice using the link below:

${invoiceLink}

Thank you for choosing Virudavan Fruit Juice`;

      window.open(
        `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      localStorage.removeItem("cart");

      alert("Invoice Sent Successfully");

      navigate("/history");
    } catch (error) {
      console.log(error);
      alert("Failed To Save Invoice");
    }
  };

  return (
    <div className="billing-container">
      <h1>Billing Page</h1>

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) =>
          setCustomerName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="WhatsApp Number"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <div className="order-summary">
        <h2>Order Summary</h2>

        {cart.length === 0 ? (
          <p>No Products Added</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="order-item"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))
        )}

        <h2>Total: ₹{total}</h2>

        <button
          className="whatsapp-btn"
          onClick={sendInvoice}
        >
          Send Invoice
        </button>

        <button
          className="home-btn"
          onClick={() =>
            navigate("/home")
          }
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}

export default Billing;