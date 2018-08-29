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
  lastPage,
  loading,
  nextPage,
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
      location,
      photos,
      species,
      sounds,
      taxonName,
      uri,
      userName,
    } = observation;
    if (taxonName && sounds[0].file_url !== null) {
      return (
        <Observation key={id}>
          {value !== '' ? <Text>Filter: {value}</Text> : null}
          <Title>{taxonName}</Title>
          <Text>Heard by user {userName} on {date}</Text>
          <Text>Near {location}</Text>
          <Text>Common name: {species === taxonName ? 'none' : species}</Text>
          <a href={uri}>
            <img src={photos.length > 0 ? photos[0].url : noImage} alt="user" width="100px" />
          </a>
          <Button onClick={onClick} value={id}>Play sound</Button>
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
      <Button onClick={lastPage}>Last Page</Button>
      <Button onClick={nextPage}>Next Page</Button>
      {content}
    </div>
  );
};

List.propTypes = {
  lastPage: PropTypes.func,
  loading: PropTypes.bool,
  nextPage: PropTypes.func,
  observations: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  value: PropTypes.string,
};

List.defaultProps = {
  lastPage: () => null,
  loading: false,
  nextPage: () => null,
  observations: [],
  onClick: () => null,
  value: '',
};

export default List;
