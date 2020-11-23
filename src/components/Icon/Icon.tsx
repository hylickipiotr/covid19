import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IIcon extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconProp;
}

const Icon: React.FC<IIcon> = ({ icon, ...props }) => (
  <i {...props}>
    <FontAwesomeIcon icon={icon} />
  </i>
);

export default Icon;
