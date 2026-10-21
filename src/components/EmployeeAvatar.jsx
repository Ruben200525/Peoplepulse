function EmployeeAvatar({ name }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="employee-avatar" aria-label={name}>
      {initials}
    </div>
  );
}

export default EmployeeAvatar;