import React from "react";

export const TrackedCaps = ({
  children,
  as: Tag = "span",
  tone = "cendre",
  className = "",
  ...rest
}) => {
  const toneClass =
    tone === "ink"
      ? "tracked tracked-ink"
      : tone === "sang"
        ? "tracked tracked-sang"
        : "tracked";
  return (
    <Tag className={`${toneClass} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default TrackedCaps;
