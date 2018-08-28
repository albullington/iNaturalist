import React from 'react';

import noImage from '../images/noimage.jpg';

const List = ({ observations }) => {
  const list = observations.map((observation) => {
    const {
      date,
      id,
      photos,
      taxonName,
      userName,
    } = observation;
    if (taxonName) {
      return (
        <li key={id}>
          <h4>{taxonName}</h4>
          <span>Seen by: {userName}</span>
          <span>On: {date}</span>
          <img src={photos.length > 0 ? photos[0].url : noImage} alt="user" width="100px" />
        </li>
      );
    }
  });

  return (
    <div>
      <ul>{list}</ul>
    </div>
  );
};

export default List;
