import React from "react";
import { Blurhash } from "react-blurhash";
import "./Card.css";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { getDistance } from "geolib"; // For Distance LIbary
/////////////////////
const Card = ({ data }) => {
  const myDistance = getDistance(
    { latitude: 60.17626, longitude: 24.938082 }, // my position this is just dummy data
    { latitude: data.location[1], longitude: data.location[0] } // restourant position
  );

  return (
    <div className="card">
      <div>
        <Blurhash
          hash={data.blurhash}
          width={230}
          height={150}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>

      <div className="TitleBox">{data.name}</div>
      <div className="cardText">
        <div className="StatusText">
          <div>
            {data.online ? (
              <span>
                <RiEyeFill style={{ color: "green", margin: "0 5px" }} />
                Open
              </span>
            ) : (
              <span>
                <RiEyeOffFill style={{ color: "red", margin: " 0 5px" }} />
                Closed
              </span>
            )}
          </div>
          <div> {(myDistance / 1000).toFixed(1)}km</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
