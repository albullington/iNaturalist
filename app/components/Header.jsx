import React from 'react';
import PropTypes from 'prop-types';

import { Text, HeaderTitle } from '../styles';

const Header = ({ handleChange, value }) => (
  <div>
    <HeaderTitle>Listen to the sounds of nature</HeaderTitle>
    <Text>Click on more than one sound at once to hear the cacaphony of nature!</Text>
    <Text>Alternatively, click an animal/plant image to view the original observation on iNaturalist.</Text>
    <div>
      <form>
        <select value={value} onChange={handleChange}>
          <option>Select filter:</option>
          <option value="location">Nearby Location</option>
          <option value="native">Native Species</option>
          <option value="popular">Popular Observations</option>
          <option value="quality">Research-Grade Quality</option>
          <option value="threatened">Threatened Species</option>
        </select>
      </form>
    </div>
  </div>
);

Header.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

Header.defaultProps = {
  handleChange: () => null,
  value: '',
};


export default Header;
