// CarouselComponent.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAppContext from "../../hooks/useAppContext";
import styles from "./CarouselComponent.module.css";

const CarouselComponent = () => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  return (
    <div
      className={`${styles.carouselContainer} ${containerClass} ${modeClass}`}
    >
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        stopOnHover={true}
        showArrows={true}
        // width="55%"
        axis="horizontal"
      >
        <div className={styles.carouselImages}>
          <img src="/img/imagen1.jpg" alt="Slide 1" />
          <p className="legend">Emisario Submarino</p>
        </div>
        <div className={styles.carouselImages}>
          <img src="/img/imagen2.jpg" alt="Slide 2" />
          <p className="legend">Planta EDAR</p>
        </div>
        <div className={styles.carouselImages}>
          <img src="/img/Imagen3.jpg" alt="Slide 3" />
          <p className="legend">Cisterna Tucuman y Almafuerte</p>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
