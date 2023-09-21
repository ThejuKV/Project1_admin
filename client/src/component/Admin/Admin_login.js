import React, { useState,useEffect } from 'react';
import './Admin.css';
// import './Login/Login_page';
import { Link } from "react-router-dom";
import Header from "../AppHeader/Header";

const inputTypes = [
  { type: 'text', label: 'Text' },
  { type: 'date', label: 'Date' },
  { type: 'number', label: 'Number' },
  { type: 'email', label: 'Email' },
  { type: 'tel', label: 'Telephone' },
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
  const [checkboxStatus, setCheckboxStatus] = useState({});


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



//To handle the delete button
  const handleDelete = async (userID, label) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the "${label}"?`);
  
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8082/api/deleteRow/${userID}`, {
          method: 'DELETE',
        });
  
        if (response.status === 204) {
          setInputData((prevData) => prevData.filter((item) => item.userID !== userID));
        } else {
          alert('Error deleting data');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting data');
      }
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


//checkbox function
const initialCheckboxStatus = {};
data.forEach((item) => {
initialCheckboxStatus[item.userID] = item.checkbox === 1; 
  });
setCheckboxStatus(initialCheckboxStatus);

data.forEach((item) => {
  fetch(`http://localhost:8082/api/getCheckboxStatusLogin/${item.userID}`)
  .then((response) => response.json())
  .then((result) => {
    const updatedCheckboxStatus = { ...checkboxStatus };
    updatedCheckboxStatus[item.userID] = result.checkbox === 1;
    setCheckboxStatus(updatedCheckboxStatus);
    })
.catch((error) => {
  console.error('Error fetching checkbox status:', error);
   });
 });
 })
.catch((error) => {
  setError(error); 
  setIsLoading(false); 
    });
  }, 
  []);




//Handle the checkbox
const handleCheckboxClick = async (userID) => {
  const newCheckboxStatus = {
    ...checkboxStatus,
    [userID]: !checkboxStatus[userID], 
  };

  setCheckboxStatus(newCheckboxStatus);

  try {
    const response = await fetch(`http://localhost:8082/api/updateCheckboxLogin/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checkbox: newCheckboxStatus[userID] ? 1 : 0 }),
    });

    if (response.status !== 200) {
      alert('Error updating checkbox status');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while updating checkbox status');
  }
};



  //Frontend part
  return (
    <div>
    <Header/>
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
             <option value="number">Number</option>
             <option value="week">Week</option>
             <option value="time">Time</option>
             <option value="file">File</option>
             <option value="datetime">DateTime</option>
             <option value="tel">Telephone</option>
             <option value="password">Password</option>
            </select>
          </div>
          <div>
            <button className='submit-btn' type='submit'>Submit</button>
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
    <input type="checkbox" className='checkbox-enlarge' checked={checkboxStatus[item.userID]} onChange={() => handleCheckboxClick(item.userID)}/>
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
    : item.inputType === 'email' ? (
      <input
        type="email"
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
    <button className="delete-btn" data-userid={item.userID} onClick={()=> handleDelete(item.userID)}>Delete</button>
    </div>
  </div>
))}

    </div>
      )}
      <div className='preview-page'>
      <Link to="/Login_page">
        <button className="preview-btn" >Preview</button>
        </Link>
        </div>
      </div>  
  );
};

export default Admin_login;
 






