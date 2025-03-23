import { useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import Auth from '../../../utils/auth';
import { header } from '../../../data';
import { QUERY_SINGLE_USER } from '../../../utils/queries';

const NavMenu = ({ userId, bg }) => {
  // const { loading, data } = useQuery(QUERY_SINGLE_USER, {
  //   variables: { userId: userId }
  // });

  //const user = data?.user;

  //const logout = (event) => {
  //event.preventDefault();
  //Auth.logout();
  //};

  return (
    <div
      className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
      id="navbar-sticky"
    >
      <ul
        className={`${bg ? 'lg:bg-base-200' : 'lg:bg-base-100'} bg-base-300 capitalize flex flex-col p-4 lg:p-0 mt-4 font-medium border rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0`}
      >
        {header.navigation.map((navItem, index) => (
          <li
            key={index}
            className="block py-2 px-3 rounded hover:text-orange-700 lg:p-0"
          >
            <NavLink to={navItem.href} className={navItem.isHidden && 'hidden'}>
              {navItem.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;
