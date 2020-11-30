import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IIcon extends React.HTMLAttributes<HTMLOrSVGElement> {
  icon: IconProp;
}

const Icon: React.FC<IIcon> = ({ icon, ...props }) => (
  <FontAwesomeIcon {...props} icon={icon} fixedWidth />
);

export default Icon;
