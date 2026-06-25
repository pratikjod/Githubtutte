function BillTable({
  cart,
  increaseQty,
  decreaseQty,
}) {
  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bill-box">
      <h2>Bill Details</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "15px",
            gap: "10px",
          }}
        >
          <div>
            <h4>{item.name}</h4>

            <p>
              ₹{item.price} × {item.quantity}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              className="btn"
              style={{
                width: "40px",
                height: "40px",
              }}
              onClick={() =>
                decreaseQty(item.id)
              }
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              className="btn"
              style={{
                width: "40px",
                height: "40px",
              }}
              onClick={() =>
                increaseQty(item.id)
              }
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="total">
        Total: ₹{total}
      </div>
    </div>
  );
}

export default BillTable;