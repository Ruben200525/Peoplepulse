
function StatCard({ title, value, Icon }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">
        <Icon size={22} />
      </div>

      <p>{title}</p>
      <h2>{value}</h2>

      <span className="stat-note">
        Updated just now
      </span>
    </article>
  );
}

export default StatCard;
