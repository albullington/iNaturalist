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

const List = ({ loading, observations, onClick, value }) => {
  let content;
  let filter;

  const list = observations.map((observation) => {
    const {
      date,
      id,
      photos,
      sounds,
      taxonName,
      userName,
    } = observation;
    if (taxonName && sounds.length > 0) {
      return (
        <Observation key={id}>
          <Title>{taxonName}</Title>
          <Text>Seen by: {userName}</Text>
          <Text>On: {date}</Text>
          <img src={photos.length > 0 ? photos[0].url : noImage} alt="user" width="100px" />
          <button onClick={onClick} value={id}>Play sound</button>
        </Observation>
      );
    }
  });

  if (loading) {
    filter = 'Loading';
    content = <img src={loadingIcon} alt="loading" style={imgStyle} />;
  } else {
    filter = value + ' observations';
    content = <UnstyledList>{list}</UnstyledList>;
  }

  return (
    <div>
      <Title>{filter}</Title>
      {content}
    </div>
  );
};

export default List;
