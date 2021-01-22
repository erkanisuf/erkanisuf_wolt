import React, { useState, useEffect } from "react";
import "./App.css";
import CarouselComp from "./Components/Carousel/CarouselComp";
import jsonData from "./Data/data.json";
import Layout from "./Layout/Layout";
function App() {
  const data = jsonData.sections; // Import JSON Data Local File.
  const [listRestourants, setListRestourants] = useState([]);
  useEffect(() => {
    const combineRestaurants = [
      ...data[0].restaurants,
      ...data[1].restaurants,
      ...data[2].restaurants,
    ];
    function removeDupe(param) {
      return param.filter((item, index, arr) => {
        const result = arr.map((item) => item.name);
        return index === result.indexOf(item.name);
      });
    }
    const allRestaurants = removeDupe(combineRestaurants);
    setListRestourants(allRestaurants);
  }, [data]);

  return (
    <div className="App">
      <Layout>
        {data.map((el, index) => {
          return (
            <CarouselComp
              data={el}
              key={index}
              allRestaurants={listRestourants}
            />
          );
        })}
      </Layout>
    </div>
  );
}

export default App;
