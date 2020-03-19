import React from "react";
import { Dropdown } from "react-bootstrap";
import { CustomToggle } from "../CustomToggle";
import CustomLink from './CustomLink'


const SidebarDrop = ({ name, subitems, icon }) => {

  return (
    <Dropdown drop="right">
      <Dropdown.Toggle as={CustomToggle} id="sidebarDrop">
        {icon} {name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {subitems.map(item => (

          <Dropdown.Item as={CustomLink} key={item.name} link={item.link}>
            {item.icon} {item.label}
          </Dropdown.Item>

        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SidebarDrop;
