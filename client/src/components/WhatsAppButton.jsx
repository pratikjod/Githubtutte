import API from "../services/api";

const sendInvoice = async () => {
  try {
    await API.post("/api/bills/create", {
      customerName,
      phone,
      items: cart,
      totalAmount: total,
    });

    const message = `
Fruit Juice Shop

Customer: ${customerName}

${cart
  .map(
    (item) =>
      `${item.name} x ${item.quantity}`
  )
  .join("\n")}

Total: ₹${total}
`;

    const whatsappUrl =
      `https://wa.me/91${phone}?text=` +
      encodeURIComponent(message);

    window.open(
      whatsappUrl,
      "_blank"
    );

  } catch (error) {
    console.error(error);
    alert("Failed To Save Bill");
  }
};