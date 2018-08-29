import React from 'react';
import PropTypes from 'prop-types';

import noImage from '../images/noimage.jpg';
import loadingIcon from '../images/loading.gif';

import { Button, Text, Title, Observation, UnstyledList } from '../styles';

const imgStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
};

const List = ({
  loading,
  observations,
  onClick,
  value,
}) => {
  let content;
  let filter;

  const list = observations.map((observation) => {
    const {
      date,
      id,
      photos,
      sounds,
      taxonName,
      uri,
      userName,
    } = observation;
    if (taxonName && sounds[0].file_url !== null) {
      return (
        <Observation key={id}>
          <Title>{taxonName}</Title>
          <Text>Seen by: {userName}</Text>
          <Text>On: {date}</Text>
          <a href={uri}>
            <img src={photos.length > 0 ? photos[0].url : noImage} alt="user" width="100px" />
          </a>
          <Button onClick={onClick} value={id}>Play sound</Button>
        </Observation>
      );
    }
  });

  if (loading) {
    filter = 'Loading';
    content = <img src={loadingIcon} alt="loading" style={imgStyle} />;
  } else {
    filter = `${value} observations`;
    content = <UnstyledList>{list}</UnstyledList>;
  }

  return (
    <div>
      <Title>{filter}</Title>
      {content}
    </div>
  );
};

List.propTypes = {
  loading: PropTypes.bool,
  observations: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  value: PropTypes.string,
};

List.defaultProps = {
  loading: false,
  observations: [],
  onClick: () => null,
  value: '',
};

export default List;
