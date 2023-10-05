import React, { useState, useEffect } from "react";
import "./Images.css";
import { Link } from "react-router-dom";
import Header from "../AppHeader/Header";

const Images = () => {
  const [selectedImageType, setSelectedImageType] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedDisplayPage, setSelectedDisplayPage] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [InputData, setInputData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkboxStatus, setCheckboxStatus] = useState({});

  // handle submit
  const handleSubmitUrl = async (e) => {
    e.preventDefault();

    // const data = {
    //   ImageType:selectedImageType,
    //   Url: selectedImageUrl,
    //   ImagePlace: selectedPlace,
    //   DisplayPage: selectedDisplayPage
    // };
    //

    const formData = new FormData();
    formData.append("ImageType", selectedImageType);
    formData.append("image", selectedImageUrl);
    formData.append("ImagePlace", selectedPlace);
    formData.append("DisplayPage", selectedDisplayPage);

    console.log("Data to be sent to the backend:", formData);

    try {
      const response = await fetch("http://localhost:8086/api/postdataImage", {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();

        alert("Image submitted successfully");
        setSelectedImageType("");
        setSelectedImageUrl("");
        setSelectedDisplayPage("");
        setSelectedPlace("");

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data");
    }
  };

  //To handle the delete button
  const handleDelete = async (ImageId, ImageType) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the "${ImageType}" image?`
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8086/api/deleteImage/${ImageId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 204) {
          setInputData((prevData) =>
            prevData.filter((item) => item.ImageId !== ImageId)
          );
        } else {
          alert("Error deleting data");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting data");
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:8086/api/getImages")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        setInputData(data);

        //checkbox function
        const initialCheckboxStatus = {};
        data.forEach((item) => {
          initialCheckboxStatus[item.ImageId] = item.checkbox === 1; // Assuming 1 is checked and 0 is unchecked
        });
        setCheckboxStatus(initialCheckboxStatus);

        data.forEach((item) => {
          fetch(
            `http://localhost:8086/api/getCheckboxStatusImages/${item.ImageId}`
          )
            .then((response) => response.json())
            .then((result) => {
              const updatedCheckboxStatus = { ...checkboxStatus };
              updatedCheckboxStatus[item.ImageId] = result.checkbox === 1;
              setCheckboxStatus(updatedCheckboxStatus);
            })
            .catch((error) => {
              console.error("Error fetching checkbox status:", error);
            });
        });
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  //Handle the checkbox
  const handleCheckboxClick = async (ImageId) => {
    const newCheckboxStatus = {
      ...checkboxStatus,
      [ImageId]: !checkboxStatus[ImageId],
    };

    setCheckboxStatus(newCheckboxStatus);

    try {
      const response = await fetch(
        `http://localhost:8086/api/updateCheckboxImages/${ImageId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checkbox: newCheckboxStatus[ImageId] ? 1 : 0,
          }),
        }
      );

      if (response.status !== 200) {
        alert("Error updating checkbox status");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating checkbox status");
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
        <form
          onSubmit={handleSubmitUrl}
          className="form-horizontal"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label>Select the type:</label>
            <select
              id="image-type"
              name="image-type"
              onChange={(e) => setSelectedImageType(e.target.value)}
              // value={selectedImageType}
            >
              <option value="" disabled>
                Select the Type
              </option>
              <option value="Logo-image">Logo</option>
              <option value="Background-image">Background</option>
            </select>
          </div>
          <div>
            <label>Upload file:</label>
            <input
              type="file"

              onChange={(e) => setSelectedImageUrl(e.target.files[0])}
              required
              // (e) => setSelectedImageUrl(e.target.value)
            />
          </div>
          <div>
            <label>Select the place of logo:</label>
            <select
              id="logo-place"
              name="logo-place"
              onChange={(e) => setSelectedPlace(e.target.value)}
              value={selectedPlace}
            >
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
              value={selectedDisplayPage}
            >
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

      {/* To display */}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="displaydata">
          {InputData.map((item) => (
            <ul>
              <div key={item.id}>
                <input
                  type="checkbox"
                  className="checkbox-enlarge"
                  checked={checkboxStatus[item.ImageId]}
                  onChange={() => handleCheckboxClick(item.ImageId)}
                />
                <li>
                  <b>ImageType:</b> {item.ImageType}
                </li>
                <li>
                  <b>Url:</b> {item.Url}
                </li>
                <li>
                  <b>Place:</b> {item.ImagePlace}
                </li>
                <li>
                  <b>Displaying Page:</b> {item.DisplayPage}
                </li>
                <div>
                  <button
                    className="delete-btn"
                    data-userid={item.ImageId}
                    onClick={() => handleDelete(item.ImageId, item.ImageType)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </ul>
          ))}
        </div>
      )}

      <div className="preview-page">
        <Link to="/ImagePreview">
          <button className="preview-btn">Preview</button>
        </Link>
      </div>
    </div>
  );
};

export default Images;
