import React from 'react';
import PropTypes from 'prop-types';

import { Title } from '../styles';

const Header = ({ handleChange, value }) => (
  <div>
    <Title>Hear the sounds of nature</Title>
    <div>
      <form>
        <select value={value} onChange={handleChange}>
          <option>Select filter:</option>
          <option value="native">Native</option>
          <option value="popular">Popular</option>
          <option value="quality">Quality</option>
          <option value="sound">Sound</option>
          <option value="threatened">Threatened</option>
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
