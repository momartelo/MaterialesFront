// CarouselComponent.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./CarouselComponent.module.css";
import { useResponsive } from "../../providers/ResponsiveContext";

const CarouselComponent = () => {
  const { isDesktopHD, isDesktopFullHD, isTablet, isMobile } = useResponsive();

  return (
    <div className={styles.carouselContainer}>
      {isDesktopFullHD && (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
          showArrows={true}
          width="40%"
          axis="horizontal"
        >
          <div className={styles.carouselImages}>
            <img src="../../../public/img/imagen1.jpg" alt="Slide 1" />
            <p className="legend">Emisario Submarino</p>
          </div>
          <div className={styles.carouselImages}>
            <img src="../../../public/img/imagen2.jpg" alt="Slide 2" />
            <p className="legend">Planta EDAR</p>
          </div>
          <div className={styles.carouselImages}>
            <img src="../../../public/img/Imagen3.jpg" alt="Slide 3" />
            <p className="legend">Cisterna Tucuman y Almafuerte</p>
          </div>
        </Carousel>
      )}
      {isDesktopHD && (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
          showArrows={true}
          width="35%"
          axis="horizontal"
        >
          <div className={styles.carouselImages}>
            <img src="../../../public/img/imagen1.jpg" alt="Slide 1" />
            <p className="legend">Emisario Submarino</p>
          </div>
          <div className={styles.carouselImages}>
            <img src="../../../public/img/imagen2.jpg" alt="Slide 2" />
            <p className="legend">Planta EDAR</p>
          </div>
          <div className={styles.carouselImages}>
            <img src="../../../public/img/Imagen3.jpg" alt="Slide 3" />
            <p className="legend">Cisterna Tucuman y Almafuerte</p>
          </div>
        </Carousel>
      )}
      {isTablet && (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
          showArrows={true}
          width="35%"
          axis="horizontal"
        >
          <div className={styles.carouselImages}>
            <img src="../../../public/img/imagen1.jpg" alt="Slide 1" />
            <p className="legend">Emisario Submarino</p>
          </div>
          <div className={styles.carouselImages}>
            <img src="../../../public/img/imagen2.jpg" alt="Slide 2" />
            <p className="legend">Planta EDAR</p>
          </div>
          <div className={styles.carouselImages}>
            <img src="../../../public/img/Imagen3.jpg" alt="Slide 3" />
            <p className="legend">Cisterna Tucuman y Almafuerte</p>
          </div>
        </Carousel>
      )}
      {isMobile && (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
          showArrows={true}
          width="35%"
          axis="horizontal"
        >
          <div className={styles.carouselImages}>
            <img src="../../../public/img/imagen1.jpg" alt="Slide 1" />
            <p className="legend">Emisario Submarino</p>
          </div>
          <div className={styles.carouselImages}>
            <img src="../../../public/img/imagen2.jpg" alt="Slide 2" />
            <p className="legend">Planta EDAR</p>
          </div>
          <div className={styles.carouselImages}>
            <img src="../../../public/img/Imagen3.jpg" alt="Slide 3" />
            <p className="legend">Cisterna Tucuman y Almafuerte</p>
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default CarouselComponent;
