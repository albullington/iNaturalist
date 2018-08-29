import React from 'react';

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

export default Header;
