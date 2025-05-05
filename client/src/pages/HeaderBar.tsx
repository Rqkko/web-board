import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/HeaderBar.module.css';

import logoImg from '../assets/SIIT.png';
import closeIcon from '../assets/close.png';  // Close icon
import homeIcon from '../assets/homeicon.png';
import searchIcon from '../assets/searchicon.png';
import addIcon from '../assets/addicon.png';
import peopleIcon from '../assets/peopleicon.png';
import profileIcon from '../assets/profileicon.png';

const HeaderBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();  // Hook to track the current route

  const closeMenu = () => setMenuOpen(false);

  // Function to check if the current path is active
  const getActiveClass = (path: string) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <>
      <header className={styles.header}>
        {/* Hamburger menu icon */}
        <div className={styles.menuIcon} onClick={() => setMenuOpen(true)}>
          &#9776;
        </div>

        {/* Logo, centered in the header */}
        <div className={styles.logo}>
          <img src={logoImg} alt="SIIT" />
          <h1>WebBoard</h1>
        </div>
      </header>

      {/* Sliding Menu */}
      <div className={`${styles.topDrawer} ${menuOpen ? styles.open : ''}`}>
        {/* Close icon */}
        <div className={styles.closeIcon} onClick={closeMenu}>
          <img src={closeIcon} alt="Close" className={styles.closeIconImg} />
        </div>

        {/* SIIT Logo and WebBoard Text */}
        <div className={styles.drawerLogo}>
          <img src={logoImg} alt="SIIT" className={styles.drawerLogoImg} />
          <h1 className={styles.drawerText}>WebBoard</h1>
        </div>

        {/* Menu items */}
        <ul className={styles.menuList}>
          <li onClick={closeMenu} className={getActiveClass('/search')}>
            <Link to="/search">
              <img src={homeIcon} alt="Home" className={styles.menuIconImg} />
            </Link>
          </li>
          <li onClick={closeMenu} className={getActiveClass('/dashboard')}>
            <Link to="/dashboard">
              <img src={searchIcon} alt="Search" className={styles.menuIconImg} />
            </Link>
          </li>
          <li onClick={closeMenu} className={getActiveClass('/add')}>
            <Link to="/add">
              <img src={addIcon} alt="Add" className={styles.menuIconImg} />
            </Link>
          </li>
          <li onClick={closeMenu} className={getActiveClass('/posts')}>
            <Link to="/posts">
              <img src={peopleIcon} alt="People" className={styles.menuIconImg} />
            </Link>
          </li>
          <li onClick={closeMenu} className={getActiveClass('/profile')}>
            <Link to="/profile">
              <img src={profileIcon} alt="Profile" className={styles.menuIconImg} />
            </Link>
          </li>
        </ul>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </>
  );
};

export default HeaderBar;
