import React, { useEffect } from "react";
import { useRef } from "react";
import { useGlobalContext } from "../context";
import { DebounceInput } from "react-debounce-input";


const SearchForm = () => {
    const {setSearchQuery} = useGlobalContext();
    const searchValue = useRef('')


    useEffect(() => {
        searchValue.current.focus
        console.log(searchValue.current)
    }, [])

    const searchCocktail = () => {
        
        setSearchQuery(searchValue.current.state.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favourite cocktail</label>
          <DebounceInput
          minLength={2}
          debounceTimeout={1200}
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
