import React from "react";
import styled from "styled-components";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAddItem, cartItemAdded, cartAddItemError } from "../actions";

const StoreItem = ({ item }) => {
<<<<<<< HEAD
  const dispatch = useDispatch();
  return (
    <Wrapper to={`/product/${item.id}`}>
      <Image src={item.imageSrc} alt={item.name} />
      <Name>
        {item.name.length > 50
          ? item.name.substr(0, item.name.substr(0, 55).lastIndexOf(" ")) +
            " ..."
          : item.name}
      </Name>
      <Price>{item.price}</Price>
      <Button
        onClick={(event) => {
          event.preventDefault();
          dispatch(cartItemAdded(item));
        }}
      >
        <MdAddShoppingCart size={25} />
      </Button>
=======
  return (
    <Wrapper>
      <Image src={item.imageSrc} alt={item.name} />
      <Price>{item.price}</Price>
      <Name>{item.name}</Name>
      <Button>CART</Button>
>>>>>>> 22dfd473928acc39ac7b36ff8ae6c1713168b7da
    </Wrapper>
  );
};

<<<<<<< HEAD
const Wrapper = styled(Link)`
  margin: 20px 12px;
  padding: 15px;
  width: 350px;
  height: 350px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
const Price = styled.p`
  font-weight: bold;
  font-size: large;
  color: black;
`;

const Image = styled.img`
  height: 180px;

  align-self: center;
`;

const Button = styled.button`
  display: inline-block;
  width: 50px;
  height: 40px;
  border-radius: 8px;
  margin-left: auto;
  border: 0.5px solid #5f6368;
  &:hover {
    cursor: pointer;
    background-color: #5f6368;
  }
`;

const Name = styled.p`
  margin: 10px 0;
  color: #5f6368;
`;
=======
const Wrapper = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 8px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Price = styled.p``;

const Image = styled.img``;

const Button = styled.button``;

const Name = styled.p``;
>>>>>>> 22dfd473928acc39ac7b36ff8ae6c1713168b7da

export default StoreItem;
