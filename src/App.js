import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Recipes from "./components/Recipes";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiGithub } from "react-icons/fi";
import {BsSearch} from "react-icons/bs"

const App = () => {
  const APP_ID = "80181c05";
  const APP_KEY = " 4972baa4af5e0141da5081ad04e0e758";

  //States
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  //useEffect

  const getRecipes = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setLoading(false);
  }, [query]);

  useEffect(() => {
    getRecipes();
  }, [query, getRecipes]);

  //function
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();

    if(search === ""){
      window.alert("Empty");
      return;
    }
      setQuery(search);
      setSearch("");
    
  };

  return (
    <>
     <div className="container-fluid empty">
      {recipes.length === 0 && !loading && (
          <h1>Search for food...</h1>
      )}
      {loading && (
        <div class="spinner-border spinner-border-xl" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      </div>
      <div className="container mx-auto">
        <div className="row justify-content-center mt-4 ">
          <button
            onClick={() => {
              setQuery("");
              setSearch("");
              setRecipes([]);
            }}
            className="btn btn-primary mr-2 d-flex align-items-center"
          >
            <RiDeleteBin7Line className="mr-2" />
            Clear
          </button>
          <button type="button" class="btn btn-light">
            <a className="" href="https://github.com/alistein">
              <FiGithub className="mr-2" />
              Github
            </a>
          </button>
        </div>
        <form onSubmit={getSearch} className="form-inline mt-4">
          <div class="d-flex flex-row mx-auto mr-1">
            <input
              style={{ width: "300px" }}
              className="form-control mr-3 "
              type="text"
              value={search}
              onChange={updateSearch}
              placeholder="Search some food..."
            />
            <button className="btn btn-outline-success" type="submit">
              <BsSearch className="mx-1"/>
            </button>
          </div>
        </form>
        <div className="">
          <div className="row">
          {recipes.map((recipe) => (
            <Recipes
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
          </div>
          </div>
        </div>
    </>
  );
};

export default App;
