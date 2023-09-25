import React, { useState, useEffect } from 'react';
import Header from "../AppHeader/Header";

const ImagePreview = () => {
  const [checkedFields, setCheckedFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8086/api/getCheckedFieldsImages')
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
          <b>IMAGE PREVIEW</b>
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
            <h5>{item.Url}</h5>
            </div>))}
    </div>
      )}
    </div>  
  );
    }

export default ImagePreview;
