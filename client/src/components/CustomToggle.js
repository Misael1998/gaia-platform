import React from "react";
import { TiChevronRight } from "react-icons/ti";
export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    className="d-inline-block border-bottom border-top list-group-item-action p-4 "
    onClick={onClick}
    ref={ref}
  >
    <div className="side-icon drop-nav">
      {children}
      <span className="ml-2">
        <TiChevronRight size={26} />
      </span>
    </div>
  </div>
));
