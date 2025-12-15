import { Routes, Route } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { CollectionGrid } from "../pages/CollectionGrid";
import { AddSunglasses } from "../pages/AddSunglasses";
import { EditSunglasses } from "../pages/EditSunglasses";
import { DetailView } from "../pages/DetailView";

export const ApplicationViews = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/collection" element={<CollectionGrid />} />
        <Route path="/sunglasses/add" element={<AddSunglasses />} />
        <Route path="/sunglasses/:id/edit" element={<EditSunglasses />} />
        <Route path="/sunglasses/:id" element={<DetailView />} />
      </Routes>
    </>
  );
};
