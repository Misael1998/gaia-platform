import React from "react";
import { Link } from 'react-router-dom'

const CustomLink = React.forwardRef(({ children, link }, ref) => (
    <Link
        className="d-inline-block list-group-item-action pt-2 pb-2 pl-3 pr-3 border-bottom"
        to={link}
    >
        {children}
    </Link>
));


export default CustomLink
