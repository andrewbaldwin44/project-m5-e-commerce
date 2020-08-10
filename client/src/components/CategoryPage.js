import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestItems, receiveItems, receiveItemsError } from "../actions";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import StoreItem from "./StoreItem";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const categoryId = useParams().categoryId;
  React.useEffect(() => {
    dispatch(requestItems());
    fetch(`/products`)
      .then((res) => res.json())
      .then((data) => data.items)
      .then((items) => dispatch(receiveItems(items)))
      .catch((err) => dispatch(receiveItemsError()));
    // eslint-disable-next-line
  }, []);
  return (
    <Wrapper>
      {items === null ? (
        <div>loading...</div>
      ) : (
        <>
          {items.map((item) => {
            return <StoreItem item={item} key={item.id} />;
          })}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default CategoryPage;
