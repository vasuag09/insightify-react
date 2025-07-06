// components/UI/ErrorBlock.jsx
import "./ErrorIndicator.css";

export default function ErrorBlock({ title = "Error", message = "Something went wrong!" }) {
  return (
    <div className="error-block">
      <h3>❌ {title}</h3>
      <p>{message}</p>
    </div>
  );
}
