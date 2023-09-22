import React, { useState, useEffect } from 'react';
import Header from "../AppHeader/Header";

const Login_page = () => {
  const [checkedFields, setCheckedFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
const [data,setData]=useState([]);
  useEffect(() => {
    // Fetch data from the backend where checkbox is 1
    fetch('http://localhost:8082/api/getCheckboxStatusLogin/1') // Change the endpoint as needed
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
    <Header/>
      <h1>
        <center>
          <b>Login Here</b>
        </center>
      </h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <ul>
            {data.map((item) => (
              <li key={item.userID}>
                <p>{item.label}: {item.inputType}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login_page;
