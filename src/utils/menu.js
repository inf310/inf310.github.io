import React from 'react';

import { NavLink } from 'react-router-dom';

const topics = [
  { link: 'about-the-course', text: 'About the course' },
  { link: 'reading-materials', text: 'Additional reading materials' },
  { link: 'web-dev-overview', text: 'Overview of web development' },
  { link: 'react-basics', text: 'Intro to React' },
  { link: 'express-basics', text: 'Intro to Express' },
];

const locationMatches = link =>
  (_, location) => location.pathname === `/${link}/`;

const MenuButton = ({ toggle }) => (
  <span
    role="img"
    aria-label="menu"
    className="menu_button"
    onClick={toggle}>
      <img alt="js logo" width="50px" src="/fullstack-js/images/js-icon.png" />
      <span class="menu_title">INF310b: React and Express</span>
  </span>
);

const Menu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = React.useCallback(() => setMenuOpen(!menuOpen), [menuOpen]);
  const hideMenu = React.useCallback(() => setMenuOpen(false), []);
  const menuRef = React.useRef();
  React.useEffect(() => {
    const hideMenuOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.body.addEventListener('click', hideMenuOnOutsideClick);
    return () => { document.body.removeEventListener('click', hideMenuOnOutsideClick); }
  }, []);
  return (
    <aside className="menu" ref={menuRef}>
      <MenuButton toggle={toggleMenu} />
      { menuOpen &&
      <ul className="menu_list">
      {topics.map(({ link, text }) => (
        <li key={link}>
        <NavLink
          to={`/${link}/`}
          isActive={locationMatches(link)}
          onClick={hideMenu}
          activeClassName="menu_active_item">
            {text}
        </NavLink>
        </li>
      ))}
      </ul>}
    </aside>);
}

export default Menu;
