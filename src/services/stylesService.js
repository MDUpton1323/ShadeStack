export const getAllStyles = () => {
  return fetch("http://localhost:8088/styles").then((res) => res.json());
};
