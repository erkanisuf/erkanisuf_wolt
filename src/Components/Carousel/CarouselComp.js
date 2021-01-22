import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./Carousel.css";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Moment from "moment"; // Import Moment for sorting by Date
import { getDistance } from "geolib"; // For Distance LIbary

////////////////////

function CarouselComp({ data, allRestaurants }) {
  const { title } = data;
  const restaurants = allRestaurants;
  const [renderData, setRenderData] = useState(allRestaurants);

  useEffect(() => {
    // Sorts by Popularity From Highest to Lowest
    const sortbyPopular = () => {
      const copyArr = [...restaurants];

      const result = copyArr
        .sort((a, b) => {
          return a.popularity - b.popularity;
        })
        .reverse();
      setRenderData(result);
    };

    // Sorts by Date Newest to Oldest launch date
    const sortbyDate = () => {
      const copyArr = [...restaurants].sort(
        (a, b) =>
          new Moment(b.launch_date).format("YYYYMMDD") -
          new Moment(a.launch_date).format("YYYYMMDD")
      );
      setRenderData(copyArr);
    };
    // Sorts by Distance closes to farest (using dummy data as my adress , since i dont have access to GPS etc.)
    const sortbyDistance = () => {
      const copyArr = [...restaurants];

      const result = copyArr.sort((a, b) => {
        const ab = getDistance(
          { latitude: 60.17626, longitude: 24.938082 }, //my Location dummy data
          { latitude: a.location[1], longitude: a.location[0] }
        );
        const ba = getDistance(
          { latitude: 60.17626, longitude: 24.938082 }, //my Location dummy data
          { latitude: b.location[1], longitude: b.location[0] }
        );

        return ab - ba;
      });
      setRenderData(result);
    };

    switch (title) {
      case "Popular Restaurants":
        return sortbyPopular();
      case "New Restaurants":
        return sortbyDate();
      case "Nearby Restaurants":
        return sortbyDistance();
      default:
        return sortbyPopular();
    }
  }, [title, restaurants]);

  if (!renderData) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="Carousel">
      <h1>{data.title}</h1>
      <Carousel
        infinite
        clickToChange
        slidesPerPage={5}
        slidesPerScroll={5}
        addArrowClickHandler
        arrowLeft={<MdKeyboardArrowLeft className="arrowStyle" />}
        arrowRight={<MdKeyboardArrowRight className="arrowStyle" />}
        breakpoints={{
          //////////////// Under 500 (mobile) shows only 1 , not possible to fit 5 per view :D
          500: {
            slidesPerPage: 1,

            clickToChange: false,
            centered: false,

            animationSpeed: 2000,
            infinite: true,
          },
        }}
      >
        {renderData.map((el, index) => {
          return <Card data={el} key={index} />;
        })}
      </Carousel>
    </div>
  );
}

export default CarouselComp;
