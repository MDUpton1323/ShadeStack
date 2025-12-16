import { Routes, Route } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { DetailView } from "../Pages/DetailView";
import { CollectionGrid } from "../Pages/CollectionGrid";
import { EditSunglasses } from "../Pages/EditSunglasses";
import { AddSunglasses } from "../Pages/AddSunglasses";

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
