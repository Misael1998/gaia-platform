import React from "react";
import { Dropdown } from "react-bootstrap";
import { CustomToggle } from "../CustomToggle";
import CustomLink from './CustomLink'


const SidebarDrop = ({ name, subitems, icon }) => {

  return (
    <Dropdown drop="right">
      <Dropdown.Toggle as={CustomToggle} id="sidebarDrop">
        {icon}
        <span className='nav-text'>
          {name}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {subitems.map(item => (

          <Dropdown.Item as={CustomLink} key={item.name} link={item.link}>
            {item.icon}
            <span className='nav-text'>
              {item.label}
            </span>
          </Dropdown.Item>

        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SidebarDrop;
