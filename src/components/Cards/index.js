import React from 'react'
import {Card, Image } from 'antd';
import './cards.css';
import moment from 'moment';
const {Meta} = Card;

const Cards = ({data, key}) => {
  console.log(data.id,moment.utc(data.occured_at).format("MM/DD/YYYY"))
  const CardImage = (
    <Image
      src={data.media.image_url_thumb || "https://via.placeholder.com/200" } 
      height="200"
      width="200"
      />
  )
  const CardTitle = (
    <div className="card__data-title">
      <h3>
        {data.title}
      </h3>
    </div>
  );
  const CardDescription = (
    <div className="card__data-description">
      <p>{data.description || "No description available"}</p>
    </div>
  );
  return (
    <div className="cards">
      <Card
      className="Case-cards"
      style={{width:'800px', padding:'0.3em 0em'}}
      hoverable
    >
      <div className="cards__content">
        {CardImage}
        <div className="cards__data">
          {CardTitle}
          {CardDescription}
        </div>
        
      </div>
      
      {/* <Meta
        avatar={<img src="https://files.bikeindex.org/uploads/Pu/211943/small_DSC_0340.JPG" width="220px" height="auto"/>}
        title={CardTitle}
        description={CardDescription}
      /> */}
    </Card>
    </div>
    
  )
}
export default Cards;