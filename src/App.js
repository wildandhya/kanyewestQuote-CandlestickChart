/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import getQuoteAction from "../src/redux/action/quote";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.data);
  const [myQuote, setMyQuote] = useState("");
  const [favoriteData, setFavoriteData] = useState([]);
  const [displayData, setDisplayData] = useState("");
  const [isDisplayChange, setIsDisplayChange] = useState(false);

  const handleRefresh = async () => {
    await dispatch(getQuoteAction());
    await setIsDisplayChange(false);
  };

  let addToFavorite = () => {
    setFavoriteData((data) => [...data, displayData]);
  };

  useEffect(() => {
    if (isDisplayChange === false) {
      setDisplayData(quote);
    } else {
      if (myQuote === quote) {
        setDisplayData(
          <h5 style={{ color: "yellow" }}>Dont type the same quote</h5>
        );
      } else {
        setDisplayData(myQuote);
      }
    }
  }, [isDisplayChange, myQuote, quote, displayData]);

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='header'>
          <img
            src='https://images.businessoffashion.com/profiles/asset/1797/43897e2e4a6d155d72dd9df352017b546ef9e229.jpeg'
            alt='kenye west'
            style={{ width: 300 }}
          />
          <h1 className='title_header'>Kenye west Quote</h1>
        </div>
        <div className='quote_highlight'>
          <h2 className='quote_api'>
            {displayData !== null ? (
              displayData
            ) : (
              <h5 style={{ color: "green" }}>Please Get the Quote</h5>
            )}
          </h2>

          <div className='btn_quote'>
            <button onClick={handleRefresh}>Get Quote</button>
            <button onClick={addToFavorite}>Add Favorite</button>
          </div>
        </div>
        <div className='favorite_space'>
          {favoriteData
            .filter((a, b) => favoriteData.indexOf(a) === b)
            .map((value, index) => {
              return (
                <div key={index}>
                  <h3 className='favorite_text'>{value}</h3>
                </div>
              );
            })}
        </div>
        <div className='input_quote'>
          <hr />
          <h1>My Quote</h1>
          <div className='form_submit_quote'>
            <input
              placeholder='type your quote'
              type='text'
              onChange={(e) => setMyQuote(e.target.value)}
            />
            <button onClick={() => setIsDisplayChange(true)}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
