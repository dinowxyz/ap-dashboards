import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/status-report" activeClassName="active">
        Status Report
      </NavLink>
      <NavLink to="/liquidity-overview" activeClassName="active">
        Liquidity Overview
      </NavLink>
    </nav>
  );
};

export default NavBar;
