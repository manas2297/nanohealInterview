import React from "react";
import { Card, Image } from "antd";
import "./cards.css";
import { getDateFromUnix } from "../../utils/common";

const Cards = ({ data, key }) => {
  const CardImage = (
    <Image
      src={data.media.image_url_thumb || "https://via.placeholder.com/150"}
      height="150"
      width="150"
    />
  );
  const CardTitle = (
    <div className="card__data-title">
      <h3>{data.title}</h3>
    </div>
  );
  const CardDescription = (
    <div className="card__data-description">
      <p>{data.description || "No description available"}</p>
      <small>
        Date of theft: {getDateFromUnix(data.occurred_at)} - {data.address}
      </small>
      <br />
      <small>Reported At: {getDateFromUnix(data.updated_at)}</small>
    </div>
  );
  return (
    <div className="cards">
      <Card className="Case-cards" style={{ padding: "0.3em 0em" }} hoverable>
        <div className="cards__content">
          {CardImage}
          <div className="cards__data">
            {CardTitle}
            {CardDescription}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Cards;
