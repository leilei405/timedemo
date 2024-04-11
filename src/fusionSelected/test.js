import React, { useState, useEffect } from "react";
import "./index.css";

const Carousel = () => {
  const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
    "/image6.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 自动切换到下一张图片的函数
  const autoSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 开始自动播放
  useEffect(() => {
    let isUnmounted = false;

    const interval = 3000; // 每隔3秒自动切换
    const id = setInterval(() => {
      if (!isUnmounted) {
        autoSlide();
      }
    }, interval);

    return () => {
      isUnmounted = true;
      clearInterval(id); // 清除定时器，防止内存泄漏
    };
  }, []); // 仅在组件挂载时执行一次

  // 前进到下一张图片
  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 后退到上一张图片
  const prevSlide = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="carousel">
      {/* 显示当前图片 */}
      <img src={images[currentImageIndex]} alt="Carousel Image" />

      {/* 前进/后退控制按钮 */}
      <button className="carousel-button prev" onClick={prevSlide}>
        Prev
      </button>
      <button className="carousel-button next" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
