import React from 'react';
import { useState} from "react";
import './Images.css'; 
import { Link } from "react-router-dom";
import Header from "../AppHeader/Header";

const Images = () => {
    const [selectedImageType,setSelectedImageType]=useState("");
    const [selectedImageUrl,setSelectedImageUrl]=useState("");
    const [selectedDisplayPage,setSelectedDisplayPage]=useState("");
    const [selectedPlace,setSelectedPlace]=useState("");
    // const [checkboxStatus, setCheckboxStatus] = useState({});


// handle submit 
const handleSubmitUrl = async (e) => {
    e.preventDefault();

    const data = {
      ImageType:selectedImageType,
      Url: selectedImageUrl,
      ImagePlace: selectedPlace,
      DisplayPage: selectedDisplayPage
    };
// 
    console.log("Data to be sent to the backend:", data);

    try {
      const response = await fetch(
        "http://localhost:8086/api/postdataImage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        alert("Data submitted successfully");
        setSelectedImageType("");
        setSelectedImageUrl("");
        setSelectedDisplayPage("");
        setSelectedPlace("");
      } else {
        alert("Error submitting data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data");
    }
  };


  return (
    <div>
      <Header />
      <h1>
        <center>
          <b>Image</b>
        </center>
      </h1>
      <div className="container">
         <form onSubmit={handleSubmitUrl} className="form-horizontal">
         <div className="form-group">
            <label>Select the type:</label>
            <select
              id="image-type"
              name="image-type"
              onChange={(e) => setSelectedImageType(e.target.value)}
              value={selectedImageType}
            >
              <option value="" disabled>
                Select the Type
              </option>
              <option value="logo">Logo</option>
              <option value="background-image">Background</option>

              
            </select>
          </div>
          <div>
            <label>Link:</label>
            <input
              type="file"
              id="image-url"
              name="image-url"
              placeholder="Enter the url"
              value={selectedImageUrl}
              onChange={(e) => setSelectedImageUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Select the place of logo:</label>
            <select
              id="logo-place"
              name="logo-place"
              onChange={(e) => setSelectedPlace(e.target.value)}
              value={selectedPlace} >
              <option value="" disabled>
                Select the logo place
              </option>
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="center">Center</option>
              
            </select>
          </div>
          <div>
            <label>Select the display page:</label>
            <select
              id="display-page"
              name="display-page"
              onChange={(e) => setSelectedDisplayPage(e.target.value)}
              value={selectedDisplayPage} >
              <option value="" disabled>
                Select the Display page
              </option>
              <option value="login">Login</option>
              <option value="register">Register</option>
              <option value="webcast">Webcast</option>
              
            </select>
          </div>
        
          <div>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </div>
          </form>
        </div>
        <div className="preview-page">
        <Link to="">
          <button className="preview-btn">Preview</button>
        </Link>
      </div>
    </div>
  );
}

export default Images;