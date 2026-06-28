import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../App.css";

function History() {
  const [bills, setBills] = useState([]);

  const getBills = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bills`
      );

      if (res.data.success) {
        setBills(res.data.bills);
      }
    } catch (error) {
      console.log(error);
      alert("Failed To Load History");
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  return (
    <>
      <Navbar />

      <div className="history-container">
        <h1>Billing History</h1>

        {bills.length === 0 ? (
          <h2>No Bills Found</h2>
        ) : (
          bills.map((bill) => (
            <div
              className="history-card"
              key={bill._id}
            >
              <h2>👤 {bill.customerName}</h2>

              <p>📞 Phone: {bill.phone}</p>

              <p>
                💰 Total: ₹
                {bill.totalAmount}
              </p>

              <p>
                🧾 Bill No: {bill._id}
              </p>

              <p>
                🗓 Date:{" "}
                {new Date(
                  bill.createdAt
                ).toLocaleString()}
              </p>

              <hr />

              <h3>Products</h3>

              {bill.items.map((item, index) => (
                <p key={index}>
                  🍹 {item.name} ×{" "}
                  {item.quantity}
                </p>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default History;