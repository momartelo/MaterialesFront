import { Link } from "react-router-dom";
import { useResponsive } from "../../providers/ResponsiveContext";
import { useTheme } from "../../providers/ThemeProvider";
import styles from "./Footer.module.css";

const Footer = () => {
  const { isNightMode } = useTheme();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;
  const {
    isDesktopFullHD,
    isDesktopHD,
    isTabletHD,
    isTablet,
    isMobileLandscape,
    isMobile,
  } = useResponsive();

  // Determine the appropriate class names based on the device type
  const getSocialIconsClass = () => {
    if (isMobileLandscape) return styles.socialIconsMobileL;
    if (isMobile) return styles.socialIconsMobile;
    // if (isTablet) return styles.socialIconsHD;
    // if (isTabletHD) return styles.socialIconsHD;
    // if (isDesktopFullHD) return styles.socialIconsFullHD;
    // if (isDesktopHD) return styles.socialIconsHD;
    return styles.socialIcons; // Fallback
  };

  const getLineClass = () => {
    if (isMobileLandscape) return styles.lineMobileL;
    if (isMobile) return styles.lineMobile;
    return styles.line;
  };

  const getTitlesClass = () => {
    if (isMobileLandscape) return styles.containerTitlesMobileL;
    if (isMobile) return styles.containerTitlesMobile;
    return styles.containerTitles;
  };

  const getTitleClass = () => {
    if (isMobileLandscape) return styles.containerTitleMobileL;
    if (isMobile) return styles.containerTitleMobile;
    return styles.containerTitle;
  };

  const getIconFacebookClass = () => {
    if (isMobile || isMobileLandscape) return styles.iconFacebookSmall;
    if (isDesktopHD || isTablet || isTabletHD) return styles.iconFacebookMedium;
    if (isDesktopFullHD) return styles.iconFacebookLarge;
    return styles.iconFacebookMedium;
  };

  const getIconInstagramClass = () => {
    if (isMobile || isMobileLandscape) return styles.iconInstagramSmall;
    if (isDesktopHD || isTablet || isTabletHD)
      return styles.iconInstagramMedium;
    if (isDesktopFullHD) return styles.iconInstagramLarge;
    return styles.iconInstagramMedium;
  };

  const getIconYoutubeClass = () => {
    if (isMobile || isMobileLandscape) return styles.iconYoutubeSmall;
    if (isDesktopHD || isTablet || isTabletHD) return styles.iconYoutubeMedium;
    if (isDesktopFullHD) return styles.iconYoutubeLarge;
    return styles.iconYoutubeMedium;
  };

  const getIconXClass = () => {
    if (isMobile || isMobileLandscape) return styles.iconXSmall;
    if (isDesktopHD || isTablet || isTabletHD) return styles.iconXMedium;
    if (isDesktopFullHD) return styles.iconXLarge;
    return styles.iconXMedium;
  };

  const getIconLinkedinClass = () => {
    if (isMobile || isMobileLandscape) return styles.iconLinkedinSmall;
    if (isDesktopHD || isTablet || isTabletHD) return styles.iconLinkedinMedium;
    if (isDesktopFullHD) return styles.iconLinkedinLarge;
    return styles.iconLinkedinMedium;
  };

  return (
    <div className={`${styles.containerFooter} ${modeClass}`}>
      <div className={styles.containerSocialIcons}>
        <div className={getLineClass()}></div>
        <div className={getSocialIconsClass()}>
          {isNightMode ? (
            <>
              <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
                <img
                  className={getIconFacebookClass()}
                  src="/img/facebookAzul.png"
                  alt="Facebook"
                />
              </Link>
              <Link
                to={"https://www.instagram.com/ossemgp/?hl=es"}
                target="_blank"
              >
                <img
                  className={getIconInstagramClass()}
                  src="/img/instagram.png"
                  alt="Instagram"
                />
              </Link>
              <Link
                to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
                target="_blank"
              >
                <img
                  className={getIconYoutubeClass()}
                  src="/img/youtubeColor.png"
                  alt="YouTube"
                />
              </Link>
              <Link to={"https://x.com/prensaosse"} target="_blank">
                <img className={getIconXClass()} src="/img/xAzul.png" alt="X" />
              </Link>
              <Link
                to={"https://www.linkedin.com/company/ossemgp/"}
                target="_blank"
              >
                <img
                  className={getIconLinkedinClass()}
                  src="/img/linkedin.png"
                  alt="LinkedIn"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
                <img
                  className={getIconFacebookClass()}
                  src="/img/facebook.png"
                  alt="Facebook"
                />
              </Link>
              <Link
                to={"https://www.instagram.com/ossemgp/?hl=es"}
                target="_blank"
              >
                <img
                  className={getIconInstagramClass()}
                  src="/img/instagramNegro.png"
                  alt="Instagram"
                />
              </Link>
              <Link
                to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
                target="_blank"
              >
                <img
                  className={getIconYoutubeClass()}
                  src="/img/youtube.png"
                  alt="YouTube"
                />
              </Link>
              <Link to={"https://x.com/prensaosse"} target="_blank">
                <img
                  className={getIconXClass()}
                  src="/img/xTransparente.png"
                  alt="X"
                />
              </Link>
              <Link
                to={"https://www.linkedin.com/company/ossemgp/"}
                target="_blank"
              >
                <img
                  className={getIconLinkedinClass()}
                  src="/img/linkedinNegro.png"
                  alt="LinkedIn"
                />
              </Link>
            </>
          )}
        </div>
        <div className={getLineClass()}></div>
      </div>
      <div className={getTitlesClass()}>
        <div className={getTitleClass()}>
          <h2>Obras Sanitarias</h2>
        </div>
        <div className={styles.containerCopyright}>
          <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
