import React from 'react';

import noImage from '../images/noimage.jpg';
import loadingIcon from '../images/loading.gif';

import { Text, Title, Observation, UnstyledList } from '../styles';

const imgStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
};

const List = ({ loading, observations }) => {
  let content;

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

  if (loading) {
    content = <img src={loadingIcon} alt="loading" style={imgStyle} />;
  } else {
    content = <UnstyledList>{list}</UnstyledList>;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default List;
