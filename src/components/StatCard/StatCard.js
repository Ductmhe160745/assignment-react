import "./StatCard.css";

function StatCard({ total, title }) {
  return (
    <div className="stat-cards-item">
      <p className="stat-cards-info__num">
        <strong>{total}</strong>
      </p>
      <p className="stat-cards-info__title">{title} </p>
    </div>
  );
}

export default StatCard;
