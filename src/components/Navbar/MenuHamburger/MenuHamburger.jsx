import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import styles from "./MenuHamburger.module.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className={styles.hamburgerMenu}>
      {isOpen ? (
        <CloseIcon onClick={toggleMenu} className={styles.hamburgerIcon} />
      ) : (
        <MenuIcon onClick={toggleMenu} className={styles.hamburgerIcon} />
      )}
      <nav className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <a href="#home" onClick={toggleSubMenu}>
              Home
            </a>
            {isSubMenuOpen && (
              <ul className={styles.subMenu}>
                <li>
                  <a href="#dashboard">Dashboard</a>
                </li>
                <li>
                  <a href="#profile">Profile</a>
                </li>
                <li>
                  <a href="#settings">Settings</a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
