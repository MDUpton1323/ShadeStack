import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSunglassesById,
  deleteSunglasses,
} from "../services/sunglassesService";
import "./DetailView.css";

export const DetailView = () => {
  const [sunglasses, setSunglasses] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("shade_user"));

  useEffect(() => {
    getSunglassesById(id).then((sunglassesData) => {
      setSunglasses(sunglassesData);
    });
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pair?"
    );
    if (confirmDelete) {
      await deleteSunglasses(id);
      navigate("/collection");
    }
  };

  if (!sunglasses) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="detail-image">
          {sunglasses.imageUrl ? (
            <img src={sunglasses.imageUrl} alt={sunglasses.name} />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <div className="detail-content">
          <h1>{sunglasses.name}</h1>

          <div className="detail-info">
            <div className="info-row">
              <span className="info-label">Brand:</span>
              <span className="info-value">{sunglasses.brand || "N/A"}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Style:</span>
              <span className="info-value">
                {sunglasses.styles?.name || "N/A"}
              </span>
            </div>

            {sunglasses.notes && (
              <div className="info-row notes">
                <span className="info-label">Notes:</span>
                <p className="info-value">{sunglasses.notes}</p>
              </div>
            )}
          </div>

          <div className="detail-actions">
            <button
              className="button-edit"
              onClick={() => navigate(`/sunglasses/${id}/edit`)}
            >
              Edit Sunglasses
            </button>
            <button className="button-delete" onClick={handleDelete}>
              Delete Sunglasses
            </button>
            <button
              className="button-secondary"
              onClick={() => navigate("/collection")}
            >
              Back to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
