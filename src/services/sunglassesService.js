export const getAllSunglasses = () => {
  return fetch("http://localhost:8088/sunglasses?_expand=styles").then((res) =>
    res.json()
  );
};

export const getSunglassesByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/sunglasses?userId=${userId}&_expand=styles`
  ).then((res) => res.json());
};

export const getSunglassesById = (id) => {
  return fetch(
    `http://localhost:8088/sunglasses?userId=${id}&_expand=styles`
  ).then((res) => res.json());
};

export const createSunglasses = (sunglasses) => {
  return fetch("http://localhost:8088/sunglasses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sunglasses),
  }).then((res) => res.json());
};

export const updateSunglasses = (id, sunglasses) => {
  return fetch(`http://localhost:8088/sunglasses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sunglasses),
  }).then((res) => res.json());
};

export const deleteSunglasses = (id) => {
  return fetch(`http://localhost:8088/sunglasses/${id}`, {
    method: "DELETE",
  });
};
