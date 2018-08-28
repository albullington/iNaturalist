import React from 'react';

import noImage from '../images/noimage.jpg';

import { Text, Title, Observation, UnstyledList } from '../styles';

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
        <Observation key={id}>
          <Title>{taxonName}</Title>
          <Text>Seen by: {userName}</Text>
          <Text>On: {date}</Text>
          <img src={photos.length > 0 ? photos[0].url : noImage} alt="user" width="100px" />
        </Observation>
      );
    }
  });

  return (
    <UnstyledList>{list}</UnstyledList>
  );
};

export default List;
