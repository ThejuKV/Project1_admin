import React, { useState,useEffect } from 'react';
import './Admin.css';

const inputTypes = [
  // { type: 'button', label: 'Button' },
  // { type: 'checkbox', label: 'Checkbox' },
  { type: 'text', label: 'Text' },
  { type: 'date', label: 'Date' },
  { type: 'number', label: 'Number' },
  { type: 'email', label: 'Email' },
  { type: 'tel', label: 'Telephone' },
  // { type: 'submit', label: 'Submit' },
  { type: 'password', label: 'Password' },
  { type: 'week', label: 'Week' },
  { type: 'time', label: 'Time' },
  { type: 'file', label: 'File' },
  { type: 'datetime', label: 'DateTime' }
];


const Admin_login = () => {
  const [selectedlabel, setSelectedlabel] = useState('');
  const [selectedFieldName, setSelectedFieldName] = useState('');
  const [data, setData] = useState([]);
  const [InputData, setInputData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      label: selectedlabel,
      field: selectedFieldName,
    };
    
    console.log('Data to be sent to the backend:', data);

    try {
      const response = await fetch('http://localhost:8082/api/postdatalogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        alert('Data submitted successfully');
        setSelectedlabel('');
        setSelectedFieldName('');
      } else {
        alert('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting data');
    }
  };

  useEffect(() => {
    // Fetch data from the backend 
    fetch('http://localhost:8082/api/getfields')
      .then((response) => response.json())
      .then((data) => {
        setData(data); 
        setIsLoading(false); 
        console.log(data);
        setInputData(data);
      })
      .catch((error) => {
        setError(error); // Set error state if there's an error
        setIsLoading(false); // Set loading state to false
      });
  }, []);



  return (
    <div>
      <h1>
        <center>
          <b>LOGIN</b>
        </center>
      </h1>
      <div className="container">
        <form onSubmit={handleSubmit} className="form-horizontal">
          <div className="form-group">
            <label>Label:</label>
            <input
              type="text"
              id="fieldName"
              name="fieldName"
              placeholder="Enter the field name"
              value={selectedlabel}
              onChange={(e) => setSelectedlabel(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Select an Input Field:</label>
            <select
              id="inputField"
              name="inputField"
              onChange={(e) => setSelectedFieldName(e.target.value)}
              value={selectedFieldName}
            >
              <option value="" disabled>
                Select an input field
              </option>
              <option value="text">Text</option>
             <option value="email">Email</option>
             <option value="date">Date</option>
             {/* <option value="checkbox">Checkbox</option> */}
             <option value="number">Number</option>
             <option value="week">Week</option>
             <option value="time">Time</option>
             <option value="file">File</option>
             <option value="datetime">DateTime</option>
             <option value="tel">Telephone</option>
             {/* <option value="submit">Submit</option>
             <option value="button">Button</option> */}
             <option value="password">Password</option>
            </select>
          </div>
          <div>
            <button className='submit-btn' type="submit">Submit</button>
          </div>
        </form>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
    <div className='displaydata'>
      
        {InputData.map((item) => (
  <div  key={item.id}>
    <input type="checkbox" className='checkbox-enlarge'/>
    <label htmlFor={item.Label}>{item.label}:</label>
    {item.inputType === 'date' ? (
      <input
        type="date"
        id={item.Label}
        name={item.Label}
        value={item.label} // Set the input value
      />
    ) : item.inputType === 'text' ? (
      <input
        type="text"
        id={item.Label}
        name={item.Label}
         // Set the input value
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
    ) : item.inputType === 'password' ? (
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
    )  
    : (
      <input
        type={item.inputType}
        id={item.Label}
        name={item.Label}
        value={item.label} // Set the input value
      />
    )}
    <div >
    <button className="delete-btn" type='submit'>Delete</button>
    </div>
  </div>
))}

    </div>
      )}</div>
      
    
  );
};

export default Admin_login;
 






