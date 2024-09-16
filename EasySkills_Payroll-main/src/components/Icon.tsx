import clsx from "clsx";
import React from "react";
import { ReactSVG } from "react-svg";

type IconProps = {
  name: string;
  color?: string;
  hoverColor?: string;
  width?: string;
  height?: string;
  isHovered?: boolean;
  stroke?: string;
  strokeWidth?: string;
  rotate?: number;
  id?: string;
};

const Icon: React.FC<IconProps> = ({
  name,
  color = "#B0B0B0",
  hoverColor = "#FEA500",
  height = "12px",
  width = "12px",
  isHovered = false,
  stroke = "",
  strokeWidth = "",
  rotate = 0,
  id,
}) => {
  return (
    <ReactSVG
      //@ts-ignore
      data-testid={id}
      src={`/assets/${name}.svg`}
      beforeInjection={(svg) => {
        svg.setAttribute(
          "style",
          `
          width: ${width};
          height: ${height};
          stroke: ${stroke};
          stroke-width: ${strokeWidth};
          transform: rotate(${rotate}deg);
        `,
        );
        svg.classList.remove(svg.classList[0]);
        svg.setAttribute("class", clsx("flex", "items-center", "justify-center", "cursor-pointer"));

        const paths = svg.querySelectorAll("path");
        paths.forEach((path) => {
          path.setAttribute("fill", isHovered ? hoverColor : color);
        });
      }}
    />
  );
};

export default Icon;
