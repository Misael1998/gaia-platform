import React, { useState } from "react";
import Search from "./components/Search";
import { MdCardGiftcard } from "react-icons/md"
import Title from '../Main/components/Title';
const Products = () => {
  return (
    <div className='row p-5'>
      <Title icon={<MdCardGiftcard size={40} />} title="Productos" />
      <div className="col-12">
        <Search />
      </div>
    </div>
  );
};

export default Products;
