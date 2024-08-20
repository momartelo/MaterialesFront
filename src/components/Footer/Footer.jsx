import { Link } from "react-router-dom";
import { useResponsive } from "../../providers/ResponsiveContext";
import { useTheme } from "../../providers/ThemeProvider";
import styles from "./Footer.module.css";

const Footer = () => {
  const { isNightMode } = useTheme();
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
    <div className={styles.containerFooter}>
      <div className={styles.containerSocialIcons}>
        <div className={getLineClass()}></div>
        <div className={getSocialIconsClass()}>
          <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
            <img
              className={getIconFacebookClass()}
              src="../../../public/img/facebook.png"
              alt="Facebook"
            />
          </Link>
          <Link to={"https://www.instagram.com/ossemgp/?hl=es"} target="_blank">
            <img
              className={getIconInstagramClass()}
              src="../../../public/img/instagramNegro.png"
              alt="Instagram"
            />
          </Link>
          <Link
            to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
            target="_blank"
          >
            <img
              className={getIconYoutubeClass()}
              src="../../../public/img/youtube.png"
              alt="YouTube"
            />
          </Link>
          <Link to={"https://x.com/prensaosse"} target="_blank">
            <img
              className={getIconXClass()}
              src="../../../public/img/xTransparente.png"
              alt="X"
            />
          </Link>
          <Link
            to={"https://www.linkedin.com/company/ossemgp/"}
            target="_blank"
          >
            <img
              className={getIconLinkedinClass()}
              src="../../../public/img/linkedinNegro.png"
              alt="LinkedIn"
            />
          </Link>
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

// import { Link } from "react-router-dom";
// import { useResponsive } from "../../providers/ResponsiveContext";
// import { useTheme } from "../../providers/ThemeProvider";
// import styles from "./Footer.module.css";

// const Footer = () => {
//   const { isNightMode } = useTheme();
//   const {
//     isDesktopHD,
//     isDesktopFullHD,
//     isTabletHD,
//     isTablet,
//     isMobileLandscape,
//     isMobile,
//   } = useResponsive();
//   return (
//     <>
//       {isDesktopFullHD && (
//         <div className={styles.containerFooter}>
//           <div className={styles.containerSocialIcons}>
//             <div className={styles.line}></div>
//             <div className={styles.socialIcons}>
//               <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
//                 <img
//                   className={styles.iconFacebookFullHD}
//                   src="../../../public/img/facebook.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.instagram.com/ossemgp/?hl=es"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconInstagramFullHD}
//                   src="../../../public/img/instagramNegro.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconYoutubeFullHD}
//                   src="../../../public/img/youtube.png"
//                   alt=""
//                 />
//               </Link>
//               <Link to={"https://x.com/prensaosse"} target="_blank">
//                 <img
//                   className={styles.iconXFullHD}
//                   src="../../../public/img/xTransparente.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.linkedin.com/company/ossemgp/"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconLinkedinFullHD}
//                   src="../../../public/img/linkedinNegro.png"
//                   alt=""
//                 />
//               </Link>
//             </div>
//             <div className={styles.line}></div>
//           </div>
//           <div className={styles.containerTitles}>
//             <div className={styles.containerTitle}>
//               <h2>Obras Sanitarias</h2>
//             </div>
//             <div className={styles.containerCopyright}>
//               <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
//             </div>
//           </div>
//           <div className={styles.containerPolitics}>
//             {/* <Link>
//               <p>Informacion legal</p>
//             </Link>
//             <div className={styles.separateFull}></div>
//             <Link>
//               <p>Politica de privacidad</p>
//             </Link> */}
//           </div>
//         </div>
//       )}
//       {isDesktopHD && (
//         <div className={styles.containerFooter}>
//           <div className={styles.containerSocialIcons}>
//             <div className={styles.line}></div>
//             <div className={styles.socialIcons}>
//               <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
//                 <img
//                   className={styles.iconFacebookHD}
//                   src="../../../public/img/facebook.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.instagram.com/ossemgp/?hl=es"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconInstagramHD}
//                   src="../../../public/img/instagramNegro.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconYoutubeHD}
//                   src="../../../public/img/youtube.png"
//                   alt=""
//                 />
//               </Link>
//               <Link to={"https://x.com/prensaosse"} target="_blank">
//                 <img
//                   className={styles.iconXHD}
//                   src="../../../public/img/xTransparente.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.linkedin.com/company/ossemgp/"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconLinkedinHD}
//                   src="../../../public/img/linkedinNegro.png"
//                   alt=""
//                 />
//               </Link>
//             </div>
//             <div className={styles.line}></div>
//           </div>
//           <div className={styles.containerTitles}>
//             <div className={styles.containerTitle}>
//               <h2>Obras Sanitarias</h2>
//             </div>
//             <div className={styles.containerCopyright}>
//               <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
//             </div>
//           </div>
//           <div className={styles.containerPolitics}>
//             {/* <Link>
//               <p>Informacion legal</p>
//             </Link>
//             <div className={styles.separate}></div>
//             <Link>
//               <p>Politica de privacidad</p>
//             </Link> */}
//           </div>
//         </div>
//       )}
//       {isTabletHD && (
//         <div className={styles.containerFooter}>
//           <div className={styles.containerSocialIcons}>
//             <div className={styles.line}></div>
//             <div className={styles.socialIcons}>
//               <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
//                 <img
//                   className={styles.iconFacebookHD}
//                   src="../../../public/img/facebook.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.instagram.com/ossemgp/?hl=es"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconInstagramHD}
//                   src="../../../public/img/instagramNegro.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconYoutubeHD}
//                   src="../../../public/img/youtube.png"
//                   alt=""
//                 />
//               </Link>
//               <Link to={"https://x.com/prensaosse"} target="_blank">
//                 <img
//                   className={styles.iconXHD}
//                   src="../../../public/img/xTransparente.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.linkedin.com/company/ossemgp/"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconLinkedinHD}
//                   src="../../../public/img/linkedinNegro.png"
//                   alt=""
//                 />
//               </Link>
//             </div>
//             <div className={styles.line}></div>
//           </div>
//           <div className={styles.containerTitles}>
//             <div className={styles.containerTitle}>
//               <h2>Obras Sanitarias</h2>
//             </div>
//             <div className={styles.containerCopyright}>
//               <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
//             </div>
//           </div>
//           <div className={styles.containerPolitics}>
//             {/* <Link>
//               <p>Informacion legal</p>
//             </Link>
//             <div className={styles.separate}></div>
//             <Link>
//               <p>Politica de privacidad</p>
//             </Link> */}
//           </div>
//         </div>
//       )}
//       {isTablet && (
//         <div className={styles.containerFooter}>
//           <div className={styles.containerSocialIcons}>
//             <div className={styles.line}></div>
//             <div className={styles.socialIcons}>
//               <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
//                 <img
//                   className={styles.iconFacebookHD}
//                   src="../../../public/img/facebook.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.instagram.com/ossemgp/?hl=es"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconInstagramHD}
//                   src="../../../public/img/instagramNegro.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconYoutubeHD}
//                   src="../../../public/img/youtube.png"
//                   alt=""
//                 />
//               </Link>
//               <Link to={"https://x.com/prensaosse"} target="_blank">
//                 <img
//                   className={styles.iconXHD}
//                   src="../../../public/img/xTransparente.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.linkedin.com/company/ossemgp/"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconLinkedinHD}
//                   src="../../../public/img/linkedinNegro.png"
//                   alt=""
//                 />
//               </Link>
//             </div>
//             <div className={styles.line}></div>
//           </div>
//           <div className={styles.containerTitles}>
//             <div className={styles.containerTitleTablet}>
//               <h2>Obras Sanitarias</h2>
//             </div>
//             <div className={styles.containerCopyright}>
//               <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
//             </div>
//           </div>
//           <div className={styles.containerPolitics}>
//             {/* <Link>
//               <p>Informacion legal</p>
//             </Link>
//             <div className={styles.separate}></div>
//             <Link>
//               <p>Politica de privacidad</p>
//             </Link> */}
//           </div>
//         </div>
//       )}
//       {isMobileLandscape && (
//         <div className={styles.containerFooter}>
//           <div className={styles.containerSocialIcons}>
//             <div className={styles.lineMobileL}></div>
//             <div className={styles.socialIconsMobileL}>
//               <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
//                 <img
//                   className={styles.iconFacebookMobileL}
//                   src="../../../public/img/facebook.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.instagram.com/ossemgp/?hl=es"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconInstagramMobileL}
//                   src="../../../public/img/instagramNegro.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconYoutubeMobileL}
//                   src="../../../public/img/youtube.png"
//                   alt=""
//                 />
//               </Link>
//               <Link to={"https://x.com/prensaosse"} target="_blank">
//                 <img
//                   className={styles.iconXMobileL}
//                   src="../../../public/img/xTransparente.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.linkedin.com/company/ossemgp/"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconLinkedinMobileL}
//                   src="../../../public/img/linkedinNegro.png"
//                   alt=""
//                 />
//               </Link>
//             </div>
//             <div className={styles.lineMobileL}></div>
//           </div>
//           <div className={styles.containerTitlesMobileL}>
//             <div className={styles.containerTitleMobileL}>
//               <h2>Obras Sanitarias</h2>
//             </div>
//             <div className={styles.containerCopyrightMobileL}>
//               <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
//             </div>
//           </div>
//           <div className={styles.containerPolitics}>
//             {/* <Link>
//               <p>Informacion legal</p>
//             </Link>
//             <div className={styles.separate}></div>
//             <Link>
//               <p>Politica de privacidad</p>
//             </Link> */}
//           </div>
//         </div>
//       )}
//       {isMobile && (
//         <div className={styles.containerFooter}>
//           <div className={styles.containerSocialIcons}>
//             <div className={styles.lineMobile}></div>
//             <div className={styles.socialIconsMobile}>
//               <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
//                 <img
//                   className={styles.iconFacebookMobile}
//                   src="../../../public/img/facebook.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.instagram.com/ossemgp/?hl=es"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconInstagramMobile}
//                   src="../../../public/img/instagramNegro.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconYoutubeMobile}
//                   src="../../../public/img/youtube.png"
//                   alt=""
//                 />
//               </Link>
//               <Link to={"https://x.com/prensaosse"} target="_blank">
//                 <img
//                   className={styles.iconXMobile}
//                   src="../../../public/img/xTransparente.png"
//                   alt=""
//                 />
//               </Link>
//               <Link
//                 to={"https://www.linkedin.com/company/ossemgp/"}
//                 target="_blank"
//               >
//                 <img
//                   className={styles.iconLinkedinMobile}
//                   src="../../../public/img/linkedinNegro.png"
//                   alt=""
//                 />
//               </Link>
//             </div>
//             <div className={styles.lineMobile}></div>
//           </div>
//           <div className={styles.containerTitlesMobile}>
//             <div className={styles.containerTitleMobile}>
//               <h2>Obras Sanitarias</h2>
//             </div>
//             <div className={styles.containerCopyrightMobile}>
//               <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
//             </div>
//           </div>
//           <div className={styles.containerPolitics}>
//             {/* <Link>
//               <p>Informacion legal</p>
//             </Link>
//             <div className={styles.separate}></div>
//             <Link>
//               <p>Politica de privacidad</p>
//             </Link> */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Footer;
