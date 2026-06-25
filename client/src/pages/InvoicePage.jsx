import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function InvoicePage() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_URL}/api/bills/${id}`)
    .then((res) => {
      console.log("API Response:", res.data);

      if (
        res.data.success
      ) {
        setBill(res.data.bill);
      }
    })
    .catch((err) => {
      console.log("API ERROR:", err);
    });
}, [id]);

console.log("Current Bill State:", bill);
  if (!bill) {
    return (
      <h1>Loading Invoice...</h1>
    );
  }

  return (
    <div className="invoice-page">
      <div className="invoice-card">

        <h1>
           Virudavan Fruit Juice
        </h1>

        <h2>Invoice</h2>

        <p>
          Customer: {bill.customerName}
        </p>

        <p>
          Phone: {bill.phone}
        </p>

        <p>
          Date:
          {" "}
          {new Date(
            bill.createdAt
          ).toLocaleString()}
        </p>

        <hr />

        {bill.items.map(
          (item, index) => (
            <div key={index}>
              {item.name}
              {" "}×{" "}
              {item.quantity}
              {" "}=
              {" "}₹
              {item.price *
                item.quantity}
            </div>
          )
        )}

        <hr />

        <h2>
          Total: ₹
          {bill.totalAmount}
        </h2>

      </div>
    </div>
  );
}

export default InvoicePage;

