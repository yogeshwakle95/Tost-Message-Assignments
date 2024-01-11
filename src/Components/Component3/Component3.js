import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Component3.css';

const Component3 = () => {
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCountdown(countdownSeconds);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.knowmee.co/api/v1/master/get-country-list");
        // console.log("data", response.data);
        setCountries(response.data.responseData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 1) {
        fetchData();
        clearInterval(countdownInterval);
      }

      return () => {
        clearInterval(countdownInterval);
      };
    }

    setCountdown(0);
    setCountries([]);
  }, [countdown]);

  const countriesPerPage = 5;
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="component3-container">
      <h2>Component 3</h2>
      <form onSubmit={handleFormSubmit} className="form-container">
        <label>
          Enter Countdown (seconds):
          <input
            type="number"
            value={countdownSeconds}
            onChange={(e) => setCountdownSeconds(parseInt(e.target.value, 10))}
            className="input-field"
          />
        </label>
        <button type="submit" className="submit-button">
          Start Timer
        </button>
      </form>

      {countdown > 0 && (
        <div className="countdown-container">
          <p>Countdown: {countdown} seconds</p>
          <ul className="countries-list">
            {currentCountries.map((country) => (
              <li key={country.country_id} className="country-item">
                {country.country_name}
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous Page
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentCountries.length < countriesPerPage}
              className="pagination-button"
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Component3;
