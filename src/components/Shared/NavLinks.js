import { useId } from 'react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Appointment', path: '/appointment' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Contact Us', path: '/contact-us' },
];

export const NavLinks = () => {
  const id = useId();
  return (
    <>
      {navigation.map((link) => (
        <li key={`${id}-${link.name}`}>
          <NavLink to={link.path}>{link.name}</NavLink>
        </li>
      ))}
    </>
  );
};
