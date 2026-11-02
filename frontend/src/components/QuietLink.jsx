import React from "react";
import { Link } from "react-router-dom";

export const QuietLink = ({
  to,
  href,
  children,
  accent = false,
  className = "",
  onClick,
  ...rest
}) => {
  const base = accent ? "quiet-link quiet-link-sang" : "quiet-link";
  const cls = `${base} font-sans text-[13px] md:text-sm ${className}`;
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} onClick={onClick} className={cls} {...rest}>
      {children}
    </Link>
  );
};

export default QuietLink;
