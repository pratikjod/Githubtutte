import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function History() {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);

  // Login Protection
  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/");
    }
  }, [navigate]);

  // Load Billing History
  useEffect(() => {
    const savedBills =
      JSON.parse(
        localStorage.getItem(
          "billingHistory"
        )
      ) || [];

    setBills(savedBills);
  }, []);

  // Delete All History
  const clearHistory = () => {
    const confirmDelete =
      window.confirm(
        "Delete all billing history?"
      );

    if (confirmDelete) {
      localStorage.removeItem(
        "billingHistory"
      );

      setBills([]);
    }
  };

  return (
    <>
      <Navbar />

      <div className="history-container">

        <h1>📋 Billing History</h1>

        <div className="history-buttons">

          <Link to="/home">
            <button className="history-home-btn">
              🏠 Back To Home
            </button>
          </Link>

          {bills.length > 0 && (
            <button
              className="clear-history-btn"
              onClick={clearHistory}
            >
              🗑 Clear History
            </button>
          )}

        </div>

        {bills.length === 0 ? (
          <div className="empty-history">
            <h2>No Bills Found</h2>
          </div>
        ) : (
          bills.map((bill) => (
            <div
              className="history-card"
              key={bill.id}
            >
              <h3>
                👤 {bill.customerName}
              </h3>

              <p>
                📞 Phone:
                {" "}
                {bill.phone}
              </p>

              <p>
                💰 Total:
                {" "}
                ₹{bill.totalAmount}
              </p>

              <p>
                📅 Date:
                {" "}
                {bill.date}
              </p>

              <hr />

              <h4>Products</h4>

              {bill.items.map(
                (item, index) => (
                  <p key={index}>
                    🍹 {item.name}
                    {" × "}
                    {item.quantity}
                  </p>
                )
              )}
            </div>
          ))
        )}

      </div>
    </>
  );
}

export default History;