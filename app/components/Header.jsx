import React from 'react';

import { Title } from '../styles';

const Header = ({ handleChange, handleSubmit, value }) => (
  <div>
    <Title>Hear the sounds of nature</Title>
    <div>
      <form onSubmit={handleSubmit}>
        <select value={value} onChange={handleChange}>
          <option>Select filter:</option>
          <option value="location">Location</option>
          <option value="sound">Sound</option>
          <option value="native">Native</option>
          <option value="popular">Popular</option>
          <option value="recent">Recent</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  </div>
);

export default Header;
