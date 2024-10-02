import styles from "./Unit.module.css";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UnitItem from "../UnitItem/UnitItem";
import UnitNewModal from "../UnitNewModal/UnitNewModal";
import { useUnits } from "../../hooks/useUnits";
import { useTheme } from "../../providers/ThemeProvider";
import { useResponsive } from "../../providers/ResponsiveContext";

const Unit = ({ units }) => {
  const { isNightMode } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  } = useResponsive();

  const getContainerClass = () => {
    if (isDesktopFullHD) return styles.fullHD;
    if (isDesktopHD) return styles.hd;
    if (isTabletHD) return styles.tabletHD;
    if (isTablet) return styles.tablet;
    if (isMobileLandscape) return styles.mobileLandscape;
    if (isMobile) return styles.mobile;
    return "";
  };

  const unitClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterUnits, setFilterUnits] = useState(units);
  const { auth } = useContext(AuthContext);
  const [showUnitNewModal, setShowUnitNewModal] = useState(false);

  useEffect(() => {
    let filtered = units.filter((unit) => {
      return unit.unit.toLowerCase().includes(search.toLowerCase());
    });
    filtered = filtered.slice().sort((a, b) => {
      return (a.unit || "").localeCompare(b.unit || "");
    });

    setFilterUnits(filtered);
  }, [search, sort, units]);

  const handleUnitNewClick = (e) => {
    e.stopPropagation();
    setShowUnitNewModal(true);
  };

  const handleCloseModal = () => {
    setShowUnitNewModal(false);
  };
  console.log(filterUnits);
  return (
    <div className={`${styles.containerUnit} ${unitClass} ${modeClass}`}>
      {auth ? (
        <div className={`${styles.wrapperUnit} ${unitClass} ${modeClass}`}>
          <Link
            className={`${styles.btnSuccess} ${unitClass} ${modeClass}`}
            onClick={handleUnitNewClick}
          >
            Nueva Unidad
          </Link>
          <UnitNewModal
            show={showUnitNewModal}
            onHide={handleCloseModal}
            onUnitCreated={useUnits}
          />
          <div
            className={`${styles.searchContainer} ${unitClass} ${modeClass}`}
          >
            <input
              type="search"
              className={styles.formControl}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.containerIcon}>
              <img src="/img/lupaAzulRellena.png" alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div className={`${styles.wrapperUnit} ${unitClass} ${modeClass}`}>
          <input
            type="search"
            className={styles.formControl}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.containerIcon}>
            <img src="/img/lupaAzulRellena.png" alt="" />
          </div>
        </div>
      )}
      <div className={`${styles.containerItem} ${unitClass} ${modeClass}`}>
        {filterUnits.length > 0 ? (
          filterUnits.map((unit) => <UnitItem key={unit._id} unit={unit} />)
        ) : (
          <div
            className={`${styles.containerNoShow} ${unitClass} ${modeClass}`}
          >
            <img src="/img/archivo.png" alt="" />
            <p>¡No hay </p>
            <p>&nbsp;Unidades</p>
            <p>&nbsp;creadas!!!</p>
            <img src="/img/archivo.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Unit;
