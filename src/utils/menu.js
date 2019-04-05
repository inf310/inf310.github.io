import React from 'react';

import { NavLink } from 'react-router-dom';

const topics = [
  { link: 'about-the-course', text: 'About the course' },
  { link: 'reading-materials', text: 'Additinal reading materials' },
  { divider: true, text: 'Week 1' },
  { link: 'web-dev-overview', text: 'Overview of web development' },
  { link: 'react-intro', text: 'Intro to React' },
  { link: 'express-intro', text: 'Intro to Express' },
  { divider: true, text: 'Week 2' },
  { link: 'npm', text: 'Intro to npm' },
  { link: 'express-and-files', text: 'Express and files' },
  { link: 'react-forms', text: 'React refs' },
  { divider: true, text: 'Week 3' },
  { link: 'react-context', text: 'React context' },
  { link: 'making-requests', text: 'Making requests' },
  { link: 'connecting-react-and-express', text: 'Going fullstack' },
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
      <span className="menu_title">INF310b: React and Express</span>
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
      {topics.map(({ link, text, divider }) => (
        divider
        ? <li key={text} className="menu_divider">{text}</li>
        : <li key={link}>
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
