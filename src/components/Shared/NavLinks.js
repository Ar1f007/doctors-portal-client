import { useId } from 'react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Appointment', path: '/appointment' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Contact Us', path: '/contact-us' },
];

export const NavLinks = ({ user }) => {
  const id = useId();
  return (
    <>
      {user && (
        <li key={`${id}-dashboard`}>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
      {navigation.map((link) => (
        <li key={`${id}-${link.name}`}>
          <NavLink to={link.path}>{link.name}</NavLink>
        </li>
      ))}
    </>
  );
};
