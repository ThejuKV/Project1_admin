import React, { useState, useEffect } from 'react';
import './style1.css';

const User_register = () => {
    const [checkedFields, setCheckedFields] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({});


    const handleInputChange = (label, value) => {
      setData({ ...data, [label]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      console.log('Data to be sent to the backend:', data);
  
      try {
        const response = await fetch('http://localhost:8085/api/saveData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.status === 200) {
          alert('Data submitted successfully');
          // setInputData((prevData) => [...prevData, data]);
        } else {
          alert('Error submitting data');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting data');
      }
    };

    
  
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
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <form onSubmit={handleSubmit}>
          <div className="displaydata">
            {checkedFields.map((item) => (
              <div key={item.id}>
              <label htmlFor={item.Label}>{item.label}:</label>
      {item.inputType === 'date' ? (
        <input
          type="date"
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
          
        />
      ) : item.inputType === 'text' ? (
        <input
          type="text"
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
          
        />
      ) : item.inputType === 'number' ? (
        <input
      
          type="number"
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
          
        />
      ): item.inputType === 'tel' ? (
        <input
          type="tel"
          pattern="[0-9]{3}"
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
          
        />
      ): item.inputType === 'datetime' ? (
        <input
          type="datetime"
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
        />
      )  : item.inputType === 'password' ? (
        <input
          type="password"
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
        />
      ) : item.inputType === 'time' ? (
        <input
          type="time"
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
        />
      ): item.inputType === 'week' ? (
        <input
          type="week"
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
        />
      ): item.inputType === 'file' ? (
        <input
          type="file"
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
        />
      ) : (
        <input
          type={item.inputType}
          id={item.Label}
          name={item.Label}
          onChange={(e) => handleInputChange(item.label, e.target.value)}
          value={data[item.label] || ''}
        />
      )}
      </div>
      ))}
          <div>
              <button className='submit-btn' type="submit">Submit</button>
            </div>
          </div>
          </form>
        )}
      </div>
    );
  };
  
  export default User_register;