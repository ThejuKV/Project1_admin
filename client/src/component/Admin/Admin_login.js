import React, { useState } from 'react';
import './Admin.css';

const Admin_login = () => {
  const [selectedlabel, setSelectedlabel] = useState('');
  const [selectedFieldName, setSelectedFieldName] = useState('');

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
             <option value="checkbox">Checkbox</option>
             <option value="number">Number</option>
             <option value="datetime">DateTime</option>
             <option value="telephone">Telephone</option>
             <option value="submit">Submit</option>
             <option value="button">Button</option>
             <option value="password">Password</option>
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin_login;






