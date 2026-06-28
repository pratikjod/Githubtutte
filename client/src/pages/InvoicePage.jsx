import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.jpeg";
import "../App.css";


function InvoicePage() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bills/${id}`)
      .then((res) => {
        if (res.data.success) {
          setBill(res.data.bill);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!bill) {
    return <h1 className="invoice-loading">Loading Invoice...</h1>;
  }

 const subTotal = bill.totalAmount;

const sgst = +(subTotal * 0.025).toFixed(2);

const cgst = +(subTotal * 0.025).toFixed(2);

const discount = 0;

const grandTotal =
subTotal + sgst + cgst - discount;

  return (
    <div className="invoice-page">
      <div className="invoice-card">
        <div className="invoice-header">
          <img src={logo} alt="Logo" />

          <h1>Gundown Fruit Shop</h1>
          <p>Fresh Fruit Juice & Snacks</p>
          <p>Phone: 9822457369</p>
          <p>GST No.: 27ACIPI8845F1ZC</p>
        </div>

        <hr />

        <div className="invoice-info">
          <div>
            <p><b>Bill No:</b> {bill._id}</p>
            <p><b>Date:</b> {new Date(bill.createdAt).toLocaleString()}</p>
            <p><b>Customer:</b> {bill.customerName}</p>
          </div>

          <div>
            <p><b>Type:</b> Dine-In</p>
            <p><b>Mobile:</b> {bill.phone}</p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Particulars</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {bill.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-total-box">
          <p><span>Sub Total</span><b>₹{subTotal.toFixed(2)}</b></p>
          <p><span>SGST (2.5%)</span><b>₹{sgst.toFixed(2)}</b></p>
          <p><span>CGST (2.5%)</span><b>₹{cgst.toFixed(2)}</b></p>
          <p><span>Discount</span><b>₹{discount.toFixed(2)}</b></p>
          <h2><span>Grand Total</span><b>₹{grandTotal.toFixed(2)}</b></h2>
        </div>

        <div className="invoice-thanks">
          ******************************
           Thank You For Your Purchase.
            Visit Again!!
          ******************************
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;