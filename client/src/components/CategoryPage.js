import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  requestCategory,
  receiveCategory,
  receiveCategoryError,
} from "../actions";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import StoreItem from "./StoreItem";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";

import useDocumentTitle from "../hooks/useDocumentTitle.hook";
import { capitalize } from "../utils/utils";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category.category);
  const categoryId = useParams().categoryId;

  const [bodyLocationFilters, setBodyLocationFilters] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [stockFilter, setStockFilter] = useState(false);
  const [topPickFilter, setTopPickFilter] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(categoryData);

  useDocumentTitle(`Dream Store - ${capitalize(categoryId)}`, "Dream Store");

  useEffect(() => {
    dispatch(requestCategory());

    fetch(`/products/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => data.category)
      .then((category) => dispatch(receiveCategory(category)))
      .catch((err) => dispatch(receiveCategoryError()));
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryData) {
      let newFilteredCategories = [...categoryData];

      if (bodyLocationFilters.length > 0 || brandFilters.length > 0) {
        newFilteredCategories = newFilteredCategories.filter((data) => {
          if (bodyLocationFilters.length === 0) {
            return brandFilters.includes(String(data.companyId));
          } else if (brandFilters.length === 0) {
            return bodyLocationFilters.includes(data.body_location);
          } else {
            return (
              brandFilters.includes(String(data.companyId)) &&
              bodyLocationFilters.includes(data.body_location)
            );
          }
        });
      }

      if (stockFilter) {
        newFilteredCategories = newFilteredCategories.filter(data => data.numInStock > 0);
      }

      if (topPickFilter) {
        newFilteredCategories = newFilteredCategories.filter(data =>
          data.numInStock > 0 && data.numInStock < 5
        );
      }

      setFilteredCategories(newFilteredCategories);
    }
  }, [bodyLocationFilters, brandFilters, stockFilter, topPickFilter, categoryData]);

  return (
    <Div>
      <Sidebar
        bodyLocationFilters={bodyLocationFilters}
        setBodyLocationFilters={setBodyLocationFilters}
        brandFilters={brandFilters}
        setBrandFilters={setBrandFilters}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        topPickFilter={topPickFilter}
        setTopPickFilter={setTopPickFilter}
        category={categoryId}
      />
      <Wrapper>
        <Header>
          <span>
            {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
          </span>
        </Header>
        {filteredCategories == null ? (
          <Spinner />
        ) : (
          <>
            {filteredCategories.map((category) => {
              return <StoreItem item={category} key={category.id} />;
            })}
          </>
        )}
      </Wrapper>
    </Div>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const Div = styled.div`
  display: flex;
`;
const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: x-large;
  margin-top: 8px;
  font-weight: bold;
`;

export default CategoryPage;
