import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSunglasses } from "../services/sunglassesService";
import { getAllStyles } from "../services/stylesService";

export const AddSunglasses = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [stylesId, setStylesId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [allStyles, setAllStyles] = useState([]);

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("shade_user"));

  useEffect(() => {
    getAllStyles().then((stylesArray) => {
      setAllStyles(stylesArray);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSunglasses = {
      userId: currentUser.id,
      name: name,
      brand: brand,
      stylesId: stylesId,
      imageUrl: imageUrl,
      notes: notes,
    };

    createSunglasses(newSunglasses).then(() => {
      navigate("/collection");
    });
  };

  return (
    <div className="form-container">
      <form className="sunglasses-form" onSubmit={handleSubmit}>
        <h2>Add New Sunglasses</h2>

        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Enter sunglasses name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              id="brand"
              type="text"
              className="form-control"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="style">Style *</label>
            <select
              id="style"
              className="form-control"
              value={stylesId}
              onChange={(e) => setStylesId(e.target.value)}
              required
            >
              <option value="">Select a style...</option>
              {allStyles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              id="imageUrl"
              type="url"
              className="form-control"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className="form-control"
              placeholder="Add any notes about these sunglasses..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
            />
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="button-=primary">
            Save Sunglasses
          </button>
          <button
            type="button"
            className="button-secondary"
            onClick={() => navigate("/collection")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
