import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { donation } from '../../data';

const DonationBtn = () => {
  return (
    <NavLink to="/donate" className="btn btn-accent capitalize rounded-xl">
      {donation.icon}
      {donation.btnTitle}
    </NavLink>
  );
};

export default DonationBtn;
