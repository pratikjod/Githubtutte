function ProductCard({ item, addToCart }) {
  return (
    <div className="card">
      <img
        src={item.image}
        alt={item.name}
        width="100%"
        height="180px"
        style={{ objectFit: "cover", borderRadius: "10px" }}
      />

      <h2>{item.name}</h2>

      <p>₹{item.price}</p>

      <button
  onClick={() => addToCart(product)}
>
  Add
</button>
      
    </div>
  );
}

export default ProductCard;