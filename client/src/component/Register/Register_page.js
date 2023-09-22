import React, { useState, useEffect } from 'react';
import Header from "../AppHeader/Header";

const Register_page = () => {
  const [checkedFields, setCheckedFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8084/api/getCheckedFieldsRegister')
      .then((response) => response.json())
      .then((data) => {
        setCheckedFields(data);
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
          {/* <b>Register Page</b> */}
        </center>
      </h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="displaydata">
          {checkedFields.map((item) => (
            <div key={item.id}>
            <label htmlFor={item.Label}>{item.label}:</label>
    {item.inputType === 'date' ? (
      <input
        type="date"
        id={item.Label}
        name={item.Label}
        
      />
    ) : item.inputType === 'text' ? (
      <input
        type="text"
        id={item.Label}
        name={item.Label}
        
      />
    ) : item.inputType === 'number' ? (
      <input
    
        type="number"
        id={item.Label}
        name={item.Label}
         // Set the input value
      />
    ): item.inputType === 'tel' ? (
      <input
        type="tel"
        pattern="[0-9]{3}"
        id={item.Label}
        name={item.Label}
         // Set the input value
      />
    ): item.inputType === 'datetime' ? (
      <input
        type="datetime"
        id={item.Label}
        name={item.Label}
         // Set the input value
      />
    )  : item.inputType === 'password' ? (
      <input
        type="password"
        id={item.Label}
        name={item.Label}
         // Set the input value
      />
    ) : item.inputType === 'time' ? (
      <input
        type="time"
        id={item.Label}
        name={item.Label}
         // Set the input value
      />
    ): item.inputType === 'week' ? (
      <input
        type="week"
        id={item.Label}
        name={item.Label}
         // Set the input value
      />
    ): item.inputType === 'file' ? (
      <input
        type="file"
        id={item.Label}
        name={item.Label}
         // Set the input value
      />
    ) : (
      <input
        type={item.inputType}
        id={item.Label}
        name={item.Label}
        
      />
    )}
    </div>
    ))}
        <div>
            <button className='submit-btn' type="submit">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register_page;
