import React from "react";
import { Dropdown } from "react-bootstrap";
import { CustomToggle } from "../CustomToggle";
import { Link } from "react-router-dom";

const SidebarDrop = ({ name, subitems, icon }) => {
  console.log(subitems);
  return (
    <Dropdown drop="right">
      <Dropdown.Toggle as={CustomToggle} id="sidebarDrop">
        {icon} {name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {subitems.map(item => (
          <Link to={item.link} key={item.name}>
            <Dropdown.Item>
              {item.icon} {item.label}
            </Dropdown.Item>
          </Link>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SidebarDrop;
