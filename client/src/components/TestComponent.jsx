import React from "react";
import axios from "axios";
const TestComponent = () => {
  const [name, setName] = React.useState("Test");
  React.useEffect(() => {
    axios
      .get("/api/test")
      .then((res) => {
        setName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default TestComponent;
