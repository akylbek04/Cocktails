import React, { useState, useContext, useEffect, createContext } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}${searchQuery}`);
      if (!res.ok) throw new Error("bad request");
      const data = await res.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails)
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [searchQuery, fetchData]);

  return (
    <AppContext.Provider
      value={{ loading, searchQuery, cocktails, setSearchQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
