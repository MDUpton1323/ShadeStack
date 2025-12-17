import { FilterBar } from "../components/filter/FilterBar";
import { getAllStyles } from "../services/stylesService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSunglassesByUserId,
  deleteSunglasses,
} from "../services/sunglassesService";
import "./CollectionGrid.css";

export const CollectionGrid = () => {
  const [sunglasses, setSunglasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allStyles, setAllStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("shade_user"));

  useEffect(() => {
    getSunglassesByUserId(currentUser.id).then((sunglassesArray) => {
      setSunglasses(sunglassesArray);
    });
  }, [currentUser.id]);

  useEffect(() => {
    getAllStyles().then((stylesArray) => {
      setAllStyles(stylesArray);
    });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pair?"
    );
    if (confirmDelete) {
      await deleteSunglasses(id);
      getSunglassesByUserId(currentUser.id).then((sunglassesArray) => {
        setSunglasses(sunglassesArray);
      });
    }
  };

  const getFilteredSunglasses = () => {
    let filtered = sunglasses;

    if (searchTerm) {
      filtered = filtered.filter(
        (shade) =>
          shade.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shade.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStyle) {
      filtered = filtered.filter((shade) => shade.stylesId === selectedStyle);
    }

    return filtered;
  };

  const filteredSunglasses = getFilteredSunglasses();

  return (
    <div className="collection-container">
      <div className="collection-header">
        <h1>My Collection ({filteredSunglasses.length})</h1>
        <button
          className="button-primary"
          onClick={() => navigate("/sunglasses/add")}
        >
          + Add Sunglasses
        </button>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        allStyles={allStyles}
      />

      <div className="sunglasses-grid">
        {filteredSunglasses.map((shade) => (
          <div key={shade.id} className="sunglasses-card">
            <div className="card-image">
              {shade.imageUrl ? (
                <img src={shade.imageUrl} alt={shade.name} />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
            <div className="card-content">
              <h3>{shade.name}</h3>
              <p className="brand">{shade.brand}</p>
              <p className="style">{shade.styles?.name}</p>
            </div>
            <div className="card-actions">
              <button
                className="button-view"
                onClick={() => navigate(`/sunglasses/${shade.id}`)}
              >
                View
              </button>
              <button
                className="button-edit"
                onClick={() => navigate(`/sunglasses/${shade.id}/edit`)}
              >
                Edit
              </button>
              <button
                className="button-delete"
                onClick={() => handleDelete(shade.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSunglasses.length === 0 && (
        <div className="empty-state">
          <p>No sunglasses found. Add your first pair!</p>
        </div>
      )}
    </div>
  );
};
