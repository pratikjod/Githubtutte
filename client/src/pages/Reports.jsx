import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Reports() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bills`)
      .then((res) => {
        if (res.data.success) {
          setBills(res.data.bills);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const now = new Date();

  const isThisWeek = (date) => {
    const billDate = new Date(date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    return billDate >= sevenDaysAgo && billDate <= now;
  };

  const isThisMonth = (date) => {
    const billDate = new Date(date);
    return (
      billDate.getMonth() === now.getMonth() &&
      billDate.getFullYear() === now.getFullYear()
    );
  };

  const calculateReport = (filteredBills) => {
    let sales = 0;
    let profit = 0;
    let totalOrders = filteredBills.length;
    const productCount = {};

    filteredBills.forEach((bill) => {
      sales += bill.totalAmount || 0;

      bill.items.forEach((item) => {
        const quantity = item.quantity || 1;
        const price = item.price || 0;
        const costPrice = item.costPrice || price * 0.6;

        profit += (price - costPrice) * quantity;

        productCount[item.name] =
          (productCount[item.name] || 0) + quantity;
      });
    });

    let bestProduct = "No Data";
    let maxQty = 0;

    Object.entries(productCount).forEach(([name, qty]) => {
      if (qty > maxQty) {
        bestProduct = name;
        maxQty = qty;
      }
    });

    return {
      sales,
      profit,
      totalOrders,
      bestProduct,
      maxQty,
    };
  };

  const weeklyBills = bills.filter((bill) =>
    isThisWeek(bill.createdAt)
  );

  const monthlyBills = bills.filter((bill) =>
    isThisMonth(bill.createdAt)
  );

  const weekly = calculateReport(weeklyBills);
  const monthly = calculateReport(monthlyBills);

  return (
    <div className="reports-page">
      <h1>Reports Dashboard</h1>

      <div className="report-grid">
        <div className="report-card">
          <h2>Weekly Report</h2>
          <p>Total Orders: {weekly.totalOrders}</p>
          <p>Weekly Sales: ₹{weekly.sales.toFixed(2)}</p>
          <p>Weekly Profit: ₹{weekly.profit.toFixed(2)}</p>
          <p>Best Product: {weekly.bestProduct}</p>
          <p>Sold Qty: {weekly.maxQty}</p>
        </div>

        <div className="report-card">
          <h2>Monthly Report</h2>
          <p>Total Orders: {monthly.totalOrders}</p>
          <p>Monthly Sales: ₹{monthly.sales.toFixed(2)}</p>
          <p>Monthly Profit: ₹{monthly.profit.toFixed(2)}</p>
          <p>Best Product: {monthly.bestProduct}</p>
          <p>Sold Qty: {monthly.maxQty}</p>
        </div>
      </div>
    </div>
  );
}

export default Reports;