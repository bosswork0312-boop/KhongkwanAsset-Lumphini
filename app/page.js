"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  
  // Room Type slideshow states
  const [roomSlide, setRoomSlide] = useState(0);
  const studioSlides = [
    "/images/A (1).jpg",
    "/images/A (5).jpg",
    "/images/A (9).jpg",
    "/images/A (13).jpg",
    "/images/A (17).jpg"
  ];
  
  // Testimonial slider states
  const [activeReview, setActiveReview] = useState(0);
  
  // Lightbox modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    houseType: "",
    budget: "",
    day: "",
    time: "",
    notes: "",
    agree: false
  });
  const [submitStatus, setSubmitStatus] = useState({
    submitting: false,
    success: false,
    message: ""
  });

  const heroSlides = [
    "/images/LPN (1).jpg",
    "/images/LPN (2).jpg",
    "/images/LPN (3).jpg",
    "/images/LPN (4).jpg",
    "/images/LPN (5).jpg",
    "/images/LPN (6).jpg"
  ];

  const photoSlides = [
    "/images/photo/LPN1 (1).jpg",
    "/images/photo/LPN1 (2).jpg",
    "/images/photo/LPN1 (3).jpg",
    "/images/photo/LPN1 (4).jpg",
    "/images/photo/LPN1 (5).jpg",
    "/images/photo/LPN1 (6).jpg",
    "/images/photo/LPN1 (7).jpg",
    "/images/photo/LPN1 (8).jpg",
    "/images/photo/LPN1 (9).jpg",
    "/images/photo/LPN1 (10).jpg",
    "/images/photo/LPN1 (11).jpg",
    "/images/photo/LPN1 (12).jpg"
  ];

  const testimonials = [
    {
      stars: 5,
      text: `"ประทับใจมากครับ ห้องเล็กแต่ฟังก์ชันครบ ทำเลดีมาก ใกล้ Future Park เซลล์บริการดีเยี่ยม"`,
      avatar: "ช",
      name: "คุณสมชาย",
      role: "เจ้าของห้อง Studio A"
    },
    {
      stars: 5,
      text: `"เดินทางสะดวกมากค่ะ มีวินมอเตอร์ไซค์ รถสองแถว และใกล้มาร์เก็ตเพลสหน้าโครงการ หาของกินง่ายมาก ตอบโจทย์ชีวิตวัยทำงานสุดๆ"`,
      avatar: "ว",
      name: "คุณวิภา",
      role: "เจ้าของห้อง Studio B"
    },
    {
      stars: 5,
      text: `"ซื้อปล่อยเช่าคุ้มค่ามากครับ ผลตอบแทนดี มีคนดูแลตลอด ทีมงาน KHONGKWAN ASSET ช่วยประสานงานรวดเร็ว แนะนำเลยครับ"`,
      avatar: "อ",
      name: "คุณอดิเรก",
      role: "นักลงทุนอสังหาริมทรัพย์"
    }
  ];

  // Preload Room Type slideshow slides
  useEffect(() => {
    if (typeof window !== "undefined") {
      studioSlides.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, []);

  // Slideshow interval for Room Type card
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setRoomSlide((prev) => (prev + 1) % studioSlides.length);
    }, 4200);
    return () => clearInterval(slideInterval);
  }, [studioSlides.length]);

  // Scroll Reveal Animations hook using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const targets = document.querySelectorAll(".reveal");
    targets.forEach(t => observer.observe(t));

    return () => {
      targets.forEach(t => observer.unobserve(t));
    };
  }, []);

  // Scroll event for styling header and highlighting nav links
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Highlight active section on scroll
      const sections = ["highlights", "promotion", "house-types", "gallery", "map", "reviews", "register"];
      let currentSection = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slide interval for Hero banner background
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  // Lightbox opener
  const openLightbox = (imgSrc) => {
    setLightboxImg(imgSrc);
    setLightboxOpen(true);
  };

  // Form submission handler
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("กรุณากรอกชื่อและเบอร์โทรศัพท์");
      return;
    }
    if (!formData.agree) {
      alert("กรุณายอมรับนโยบายความเป็นส่วนตัว");
      return;
    }

    setSubmitStatus({ submitting: true, success: false, message: "" });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitStatus({
          submitting: false,
          success: true,
          message: "ขอบคุณสำหรับการลงทะเบียน! เจ้าหน้าที่ฝ่ายขายของเราจะติดต่อกลับหาท่านภายใน 24 ชั่วโมง"
        });
        // Clear form
        setFormData({
          name: "",
          phone: "",
          houseType: "",
          budget: "",
          day: "",
          time: "",
          notes: "",
          agree: false
        });
      } else {
        throw new Error(resData.error || "เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
    } catch (error) {
      setSubmitStatus({
        submitting: false,
        success: false,
        message: error.message || "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง"
      });
      alert(error.message || "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Header / Nav */}
      <header className={scrolled ? "scrolled" : ""}>
        <div className="nav-container">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }}>
            <img src="/images/logo-horizontal.png" alt="KHONGKWAN ASSET" />
          </div>

          <nav className="nav-links">
            <a onClick={() => scrollToSection("highlights")} className={activeSection === "highlights" ? "active" : ""} style={{ cursor: "pointer" }}>จุดเด่น</a>
            <a onClick={() => scrollToSection("promotion")} className={activeSection === "promotion" ? "active" : ""} style={{ cursor: "pointer" }}>โปรโมชัน</a>
            <a onClick={() => scrollToSection("house-types")} className={activeSection === "house-types" ? "active" : ""} style={{ cursor: "pointer" }}>แบบบ้าน</a>
            <a onClick={() => scrollToSection("gallery")} className={activeSection === "gallery" ? "active" : ""} style={{ cursor: "pointer" }}>แกลเลอรี</a>
            <a onClick={() => scrollToSection("map")} className={activeSection === "map" ? "active" : ""} style={{ cursor: "pointer" }}>ทำเล</a>
            <a onClick={() => scrollToSection("reviews")} className={activeSection === "reviews" ? "active" : ""} style={{ cursor: "pointer" }}>รีวิว</a>
            <a onClick={() => scrollToSection("register")} className={activeSection === "register" ? "active" : ""} style={{ cursor: "pointer" }}>ติดต่อ</a>
          </nav>

          <div className="nav-actions">
            <button className="btn-register" onClick={() => scrollToSection("register")}>ลงทะเบียน</button>
            <button className={`menu-toggle ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
        <a onClick={() => scrollToSection("highlights")} style={{ cursor: "pointer" }}>จุดเด่น</a>
        <a onClick={() => scrollToSection("promotion")} style={{ cursor: "pointer" }}>โปรโมชัน</a>
        <a onClick={() => scrollToSection("house-types")} style={{ cursor: "pointer" }}>แบบบ้าน</a>
        <a onClick={() => scrollToSection("gallery")} style={{ cursor: "pointer" }}>แกลเลอรี</a>
        <a onClick={() => scrollToSection("map")} style={{ cursor: "pointer" }}>ทำเล</a>
        <a onClick={() => scrollToSection("reviews")} style={{ cursor: "pointer" }}>รีวิว</a>
        <a onClick={() => scrollToSection("register")} style={{ cursor: "pointer" }}>ติดต่อ</a>
        <button className="btn-register" onClick={() => scrollToSection("register")}>ลงทะเบียน</button>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slider">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`hero-slide ${idx === activeSlide ? "active" : ""}`}
              style={{ backgroundImage: `url('${slide}')` }}
            ></div>
          ))}
        </div>

        <div className="hero-content">
          <h1 className="sr-only">KHONGKWAN ASSET RESIDENT | ลุมพินี ทาวน์ชิป รังสิต-คลอง 1</h1>
          <div className="hero-logo-box">
            <img src="/images/logo.png" alt="ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 - KHONGKWAN ASSET" className="hero-logo-img" />
          </div>
          <h2 className="hero-title">ลุมพินี ทาวน์ชิป รังสิต-คลอง 1</h2>
          <p className="hero-subtitle">
            &quot;ไม่ใช่แค่คอนโด ... แต่คือ ความสุข&quot; จุดเริ่มต้นของ &quot;ชุมชนเมืองน่าอยู่&quot; อำนวยความสะดวกด้วย Market Place ที่อยู่ติดด้านหน้าทางเข้าคอนโดของชาวลุมพินี รังสิต-คลอง 1 ใกล้ ฟิวเจอร์ พาร์ครังสิต จุดเชื่อมต่อทุกการเดินทาง
          </p>
          <div className="hero-badge">
            ราคาเดียว 929,000 บาท
          </div>
          <div className="hero-promo-highlight">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hero-promo-icon"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span className="hero-promo-text">สำหรับนักลงทุน ซื้อวันนี้ รับค่าเช่าต่อเนื่อง <strong>6,000 บาท</strong> นาน <strong>5 ปี</strong>*</span>
          </div>
          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={() => scrollToSection("register")}>
              ลงทะเบียนรับสิทธิพิเศษ
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button className="btn-hero-secondary" onClick={() => scrollToSection("house-types")}>นัดชมโครงการ</button>
          </div>
        </div>

        <div className="scroll-indicator" onClick={() => scrollToSection("highlights")}>
          <svg viewBox="0 0 24 24">
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="highlights" className="section-bg-white">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Why Choose Us</span>
            <h3 className="section-title">ทำไมต้องเลือกโครงการนี้</h3>
          </div>

          <div className="highlights-grid">
            <div className="highlight-card reveal reveal-delay-1">
              <div className="highlight-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h4 className="highlight-title">ทำเลเชื่อมต่อสะดวก</h4>
              <p className="highlight-desc">
                ใกล้ Future Park 1.5 กม. สนามบินดอนเมือง 10 กม. เชื่อมต่อรถไฟฟ้าสายสีแดง-สีเขียว
              </p>
            </div>

            <div className="highlight-card reveal reveal-delay-2">
              <div className="highlight-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <h4 className="highlight-title">ห้องสตูดิโอคุณภาพ</h4>
              <p className="highlight-desc">
                แปลนห้อง 21.50 ตร.ม. ออกแบบฟังก์ชันครบ พร้อมอยู่ ตกแต่งสวยงาม
              </p>
            </div>

            <div className="highlight-card reveal reveal-delay-3">
              <div className="highlight-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <h4 className="highlight-title">ราคาและโปรโมชันคุ้มค่า</h4>
              <p className="highlight-desc">
                ราคาเริ่มต้นสุดคุ้ม พร้อมโปรโมชันพิเศษฟรีค่าโอน ค่าจดจำนอง และของแถมอีกเพียบ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Promotion Section */}
      <section id="promotion" className="section-bg-light">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Special Promotion</span>
            <h3 className="section-title">โปรโมชั่นพร้อมลงทุนสุดพิเศษ</h3>
          </div>

          <div className="promotion-card reveal">
            <div className="promotion-banner"></div>
            <div className="promotion-body">
              <div className="promotion-badge">Hot Deal</div>
              
              <p className="promotion-intro-text" style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "var(--primary)",
                marginBottom: "30px",
                lineHeight: "1.6"
              }}>
                ลงทะเบียนวันนี้ได้รับเฟอร์นิเจอร์และเครื่องใช้ไฟฟ้าครบเซ็ต พร้อมรับส่วนลดเงินคืน สูงสุด 150,000 บาท
              </p>
              
              <div className="promotion-grid">
                <div className="promotion-item">
                  <div className="promotion-item-check" style={{ background: "#f0fdf4", color: "#166534" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="promotion-item-text">ฟรี แอร์ 1 เครื่อง</span>
                </div>
                
                <div className="promotion-item">
                  <div className="promotion-item-check" style={{ background: "#f0fdf4", color: "#166534" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="promotion-item-text">ฟรี ดาวน์</span>
                </div>
                
                <div className="promotion-item">
                  <div className="promotion-item-check" style={{ background: "#f0fdf4", color: "#166534" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="promotion-item-text">ฟรี จอง</span>
                </div>
                
                <div className="promotion-item">
                  <div className="promotion-item-check" style={{ background: "#f0fdf4", color: "#166534" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="promotion-item-text">ฟรีค่าโอน + ค่าจดจำนอง</span>
                </div>
              </div>

              <div className="promotion-footer">
                <button className="btn-promo" onClick={() => scrollToSection("register")}>
                  ลงทะเบียนรับสิทธิ์ลงทุน
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
                <span className="promo-expiry">หมดเขต จนกว่าจะปิดโครงการ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* House Types Section */}
      <section id="house-types" className="section-bg-white">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">ROOM TYPES</span>
            <h3 className="section-title">แบบแปลนห้อง</h3>
            <p className="section-desc">ห้อง Studio ครัวปิด กั้นเป็นสัดส่วน ออกแบบฟังก์ชันการใช้งานอย่างลงตัว พร้อมรองรับทุกไลฟ์สไตล์การอยู่อาศัยของคุณ</p>
          </div>

          <div className="rooms-grid single-room-grid">
            <div className="room-card single-room-card reveal">
              <div className="room-viewer-container slideshow-container">
                <div className="room-viewer-price-badge">929,000 บาท</div>
                
                {/* Fade Slides */}
                {studioSlides.map((src, idx) => (
                  <img 
                    key={src}
                    src={src} 
                    alt={`Studio Room angle ${idx + 1}`} 
                    className="room-viewer-img fade-slide" 
                    style={{
                      opacity: idx === roomSlide ? 1 : 0,
                      position: idx === 0 ? "relative" : "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "opacity 1s ease-in-out",
                      zIndex: idx === roomSlide ? 2 : 1
                    }}
                  />
                ))}

                {/* Slider Controls overlaid on image */}
                <button 
                  className="room-slide-arrow prev"
                  onClick={() => setRoomSlide((prev) => (prev - 1 + studioSlides.length) % studioSlides.length)}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>

                <button 
                  className="room-slide-arrow next"
                  onClick={() => setRoomSlide((prev) => (prev + 1) % studioSlides.length)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>

                {/* Slideshow dots inside room image */}
                <div 
                  className="room-slide-dots"
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    display: "flex",
                    gap: "8px",
                    background: "rgba(0,0,0,0.4)",
                    padding: "6px 12px",
                    borderRadius: "20px"
                  }}
                >
                  {studioSlides.map((_, idx) => (
                    <span 
                      key={idx}
                      className={`room-slide-dot ${idx === roomSlide ? "active" : ""}`}
                      onClick={() => setRoomSlide(idx)}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: idx === roomSlide ? "#ffffff" : "rgba(255,255,255,0.4)",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                    ></span>
                  ))}
                </div>
              </div>

              <div className="room-info-body">
                <div className="room-title-bar">
                  <h4 className="room-card-title">Studio Room</h4>
                  <span className="room-badge" style={{
                    background: "#f0fdf4",
                    color: "#166534",
                    fontSize: "12px",
                    fontWeight: "600",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    border: "1px solid #bbf7d0"
                  }}>พร้อมอยู่</span>
                </div>
                <p className="room-card-desc" style={{ height: "auto", minHeight: "60px" }}>
                  ห้องสตูดิโอขนาด 21.50 ตร.ม. ออกแบบพื้นที่ใช้สอยได้อย่างชาญฉลาดและคุ้มค่าที่สุด ครบครันด้วยฟังก์ชันส่วนที่นอน ส่วนเตรียมอาหาร และส่วนพักผ่อนที่โปร่งสบาย รับแสงธรรมชาติได้อย่างพอดี
                </p>

                <div className="room-specs">
                  <div className="room-spec-item">
                    <span className="room-spec-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v13M21 7v13M3 16h18M3 11h18M6 7h4a2 2 0 0 1 2 2v2M14 7h4a2 2 0 0 1 2 2v2"/></svg>
                    </span>
                    <span className="room-spec-val">1</span>
                    <span className="room-spec-lbl">ห้องนอน</span>
                  </div>
                  <div className="room-spec-item">
                    <span className="room-spec-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h7a4 4 0 0 1 4 4v12M14 20h2M12 16h2M10 12h2"/></svg>
                    </span>
                    <span className="room-spec-val">1</span>
                    <span className="room-spec-lbl">ห้องน้ำ</span>
                  </div>
                  <div className="room-spec-item">
                    <span className="room-spec-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v16a2 2 0 0 0 2 2h16"/><path d="M5 17h4M5 13h3M5 9h4M5 5h3M9 21v-4M13 21v-3M17 21v-4"/></svg>
                    </span>
                    <span className="room-spec-val">21.50</span>
                    <span className="room-spec-lbl">ตร.ม.</span>
                  </div>
                </div>

                <ul className="room-bullets" style={{ marginBottom: "20px" }}>
                  <li>พื้นที่ใช้สอย 21.50 ตร.ม. พร้อมเฟอร์นิเจอร์ลงตัว</li>
                  <li>ห้องน้ำแยกส่วนแห้ง-เปียก เพื่อความสะดวกสบาย</li>
                  <li>ระเบียงส่วนตัวระบายอากาศดีและวิวกว้างขวาง</li>
                  <li>ห้องครัวปิดกั้นแยกส่วน ป้องกันกลิ่นและควันรบกวน</li>
                </ul>

                <button className="btn-room" onClick={() => scrollToSection("register")}>
                  สนใจนัดหมายชมห้องตัวอย่าง
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </div>
          </div>

          <p className="room-disclaimer">* ระยะที่ระบุเป็นระยะโดยประมาณของห้องจริงและวัดจากกลางผนัง อาจมีความแตกต่างจากที่ระบุไว้</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-bg-light">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Gallery</span>
            <h3 className="section-title">ภาพบรรยากาศโครงการ</h3>
            <p className="section-desc">ชมบรรยากาศและสิ่งอำนวยความสะดวกภายในโครงการ</p>
          </div>

          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div 
                key={num} 
                className={`gallery-card reveal reveal-delay-${num}`}
                onClick={() => openLightbox(`/images/LPN (${num}).jpg`)}
              >
                <img 
                  src={`/images/LPN (${num}).jpg`} 
                  alt={`LPN Facility ${num}`} 
                  className="gallery-img" 
                />
                <div className="gallery-overlay">
                  <div className="gallery-view-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section id="map" className="section-bg-white">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Location</span>
            <h3 className="section-title">ทำเลที่ตั้ง</h3>
            <p className="section-desc">ใกล้ทุกความสะดวก เชื่อมต่อทุกเส้นทาง</p>
          </div>

          <div className="location-container">
            <div className="location-info reveal reveal-delay-1">
              <div className="location-group">
                <h4 className="location-group-title">ที่อยู่โครงการ</h4>
                <p className="location-address-text">
                  ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี
                </p>
              </div>

              <div className="location-group">
                <h4 className="location-group-title">สถานที่ใกล้เคียง</h4>
                <div className="location-list">
                  <div className="location-item-row">
                    <span className="name">Future Park รังสิต</span>
                    <span className="dist">1.5 กม.</span>
                  </div>
                  <div className="location-item-row">
                    <span className="name">ตลาดรังสิต</span>
                    <span className="dist">2.0 กม.</span>
                  </div>
                  <div className="location-item-row">
                    <span className="name">Market Village รังสิต</span>
                    <span className="dist">2.5 กม.</span>
                  </div>
                  <div className="location-item-row keep-word">
                    <span className="name">รถไฟฟ้าสายสีแดง (สถานีรังสิต)</span>
                    <span className="dist" style={{ whiteSpace: "nowrap", marginLeft: "12px" }}>4.0 กม.</span>
                  </div>
                  <div className="location-item-row">
                    <span className="name">สนามกอล์ฟ ธูปะเตมีย์</span>
                    <span className="dist">5.5 กม.</span>
                  </div>
                  <div className="location-item-row">
                    <span className="name">สนามบินดอนเมือง</span>
                    <span className="dist">10.0 กม.</span>
                  </div>
                </div>
              </div>

              <div className="location-group">
                <h4 className="location-group-title">สถานศึกษา</h4>
                <div className="location-list">
                  <div className="location-item-row keep-word">
                    <span className="name">ม.นอร์ทกรุงเทพ วิทยาเขตรังสิต</span>
                    <span className="dist" style={{ whiteSpace: "nowrap", marginLeft: "12px" }}>4.5 กม.</span>
                  </div>
                  <div className="location-item-row keep-word">
                    <span className="name">ม.เทคโนโลยีราชมงคลธัญบุรี (ศูนย์รังสิต)</span>
                    <span className="dist" style={{ whiteSpace: "nowrap", marginLeft: "12px" }}>7.0 กม.</span>
                  </div>
                  <div className="location-item-row keep-word">
                    <span className="name">ม.กรุงเทพ</span>
                    <span className="dist" style={{ whiteSpace: "nowrap", marginLeft: "12px" }}>7.5 กม.</span>
                  </div>
                  <div className="location-item-row keep-word">
                    <span className="name">ม.รังสิต</span>
                    <span className="dist" style={{ whiteSpace: "nowrap", marginLeft: "12px" }}>8.5 กม.</span>
                  </div>
                  <div className="location-item-row keep-word">
                    <span className="name">ม.ธรรมศาสตร์ (ศูนย์รังสิต)</span>
                    <span className="dist" style={{ whiteSpace: "nowrap", marginLeft: "12px" }}>11.0 กม.</span>
                  </div>
                </div>
              </div>

              <div className="location-group">
                <h4 className="location-group-title">โรงพยาบาล</h4>
                <div className="location-list">
                  <div className="location-item-row">
                    <span className="name">รพ.เปาโล รังสิต</span>
                    <span className="dist">1.5 กม.</span>
                  </div>
                  <div className="location-item-row">
                    <span className="name">รพ.ปทุมเวช</span>
                    <span className="dist">2.5 กม.</span>
                  </div>
                  <div className="location-item-row">
                    <span className="name">รพ.แพทย์รังสิต</span>
                    <span className="dist">2.5 กม.</span>
                  </div>
                </div>
              </div>

              <div className="location-group">
                <h4 className="location-group-title">ตลาด / แหล่งช้อปปิ้ง</h4>
                <div className="location-list">
                  <div className="location-item-row">
                    <span className="name">Tesco Lotus รังสิต</span>
                    <span className="dist">3.0 กม.</span>
                  </div>
                  <div className="location-item-row">
                    <span className="name">Makro รังสิต</span>
                    <span className="dist">3.0 กม.</span>
                  </div>
                  <div className="location-item-row">
                    <span className="name">ตลาดสี่มุมเมือง</span>
                    <span className="dist">4.0 กม.</span>
                  </div>
                </div>
              </div>

              <a href="https://maps.app.goo.gl/VQzvqEGpKy5H2WT58" target="_blank" rel="noopener noreferrer">
                <button className="btn-map">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  เปิดใน Google Maps
                </button>
              </a>
            </div>

            <div className="map-wrapper reveal reveal-delay-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.7!2d100.6315974!3d13.9845811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d7e3cd8e7649f%3A0xa3bf3f9806caf8cc!2z4Lia4Li44Lih4Lie4Li04LiZ4Li1IOC4l-C4suC4p-C4meC5jOC4iuC4tOC4myDguKPguLHguIfguKrguLTguJUt4LiE4Lil4Lit4Li%2BIDE!5e0!3m2!1sth!2sth!4v1711900000000" 
                className="map-iframe"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="section-bg-light" style={{ overflow: "hidden" }}>
        <div className="container-fluid" style={{ padding: "0" }}>
          <div className="section-header reveal">
            <span className="section-tag">Our Trusted Clients</span>
            <h3 className="section-title">ลูกค้าที่ไว้ใจเรา</h3>
            <p className="section-desc keep-word">ภาพบรรยากาศของลูกค้าจริงที่ให้ความไว้วางใจร่วมเป็นครอบครัวกับเรา</p>
          </div>

          <div className="marquee-container reveal">
            <div className="marquee-track">
              {/* First group of images */}
              <div className="marquee-group">
                {photoSlides.map((src, idx) => (
                  <div key={`photo-1-${idx}`} className="marquee-item" onClick={() => openLightbox(src)}>
                    <img src={src} alt={`ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 - ลูกค้าที่ไว้ใจเรา ${idx + 1}`} className="marquee-img" />
                  </div>
                ))}
              </div>
              {/* Second group of images for infinite looping */}
              <div className="marquee-group">
                {photoSlides.map((src, idx) => (
                  <div key={`photo-2-${idx}`} className="marquee-item" onClick={() => openLightbox(src)}>
                    <img src={src} alt={`ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 - ลูกค้าที่ไว้ใจเรา ${idx + 1}`} className="marquee-img" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Register Form Section */}
      <section id="register" className="section-bg-dark">
        <div className="container">
          <div className="section-header reveal">
            <h3 className="section-title">ลงทะเบียนรับสิทธิพิเศษ</h3>
            <p className="section-desc keep-word" style={{ maxWidth: "560px", margin: "16px auto 0", lineHeight: "1.8" }}>
              เจ้าหน้าที่จาก <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>KHONGKWAN ASSET</span> จะติดต่อกลับเพื่อแจ้งข้อมูล ราคา <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>และนัดหมายชมโครงการ</span>
            </p>
          </div>

          <div className="register-wrapper reveal">
            <div className="register-form-box">
              {submitStatus.success ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "20px" }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <h4 style={{ color: "var(--primary)", fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>ลงทะเบียนเสร็จสมบูรณ์</h4>
                  <p style={{ color: "var(--neutral-grey)", fontSize: "15px", lineHeight: "1.6" }}>{submitStatus.message}</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="register-form-grid">
                    <div className="form-group">
                      <label className="form-label">ชื่อ-นามสกุล *</label>
                      <div className="form-input-wrapper">
                        <span className="form-input-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </span>
                        <input 
                          type="text" 
                          name="name" 
                          placeholder="กรุณาระบุชื่อ-นามสกุล" 
                          className="form-control" 
                          required 
                          value={formData.name}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">เบอร์โทรศัพท์ *</label>
                      <div className="form-input-wrapper">
                        <span className="form-input-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </span>
                        <input 
                          type="tel" 
                          name="phone" 
                          placeholder="08x-xxx-xxxx" 
                          className="form-control" 
                          required 
                          value={formData.phone}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">แบบบ้านที่สนใจ</label>
                      <div className="form-input-wrapper">
                        <span className="form-input-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        </span>
                        <select 
                          name="houseType" 
                          className="form-control"
                          value={formData.houseType}
                          onChange={handleFormChange}
                        >
                          <option value="">เลือกแบบบ้าน</option>
                          <option value="Studio Room">Studio Room (21.50 ตร.ม.)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">งบประมาณ</label>
                      <div className="form-input-wrapper">
                        <span className="form-input-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                        </span>
                        <select 
                          name="budget" 
                          className="form-control"
                          value={formData.budget}
                          onChange={handleFormChange}
                        >
                          <option value="">เลือกงบประมาณ</option>
                          <option value="ต่ำกว่า 1 ล้านบาท">ต่ำกว่า 1 ล้านบาท</option>
                          <option value="1 - 1.5 ล้านบาท">1 - 1.5 ล้านบาท</option>
                          <option value="1.5 - 2 ล้านบาท">1.5 - 2 ล้านบาท</option>
                          <option value="มากกว่า 2 ล้านบาท">มากกว่า 2 ล้านบาท</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">วันและเวลาที่สะดวกให้ติดต่อ</label>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div className="form-input-wrapper" style={{ flex: 1 }}>
                          <span className="form-input-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          </span>
                          <select 
                            name="day" 
                            className="form-control"
                            value={formData.day}
                            onChange={handleFormChange}
                          >
                            <option value="">เลือกวัน</option>
                            <option value="ทุกวัน">ทุกวัน</option>
                            <option value="วันจันทร์">วันจันทร์</option>
                            <option value="วันอังคาร">วันอังคาร</option>
                            <option value="วันพุธ">วันพุธ</option>
                            <option value="วันพฤหัสบดี">วันพฤหัสบดี</option>
                            <option value="วันศุกร์">วันศุกร์</option>
                            <option value="วันเสาร์">วันเสาร์</option>
                            <option value="วันอาทิตย์">วันอาทิตย์</option>
                          </select>
                        </div>
                        <div className="form-input-wrapper" style={{ flex: 1 }}>
                          <span className="form-input-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          </span>
                          <select 
                            name="time" 
                            className="form-control"
                            value={formData.time}
                            onChange={handleFormChange}
                          >
                            <option value="">เลือกเวลา</option>
                            <option value="ตลอดเวลา">ตลอดเวลา</option>
                            <option value="ช่วงเช้า (09:00 - 12:00)">ช่วงเช้า (09:00 - 12:00)</option>
                            <option value="ช่วงบ่าย (12:00 - 17:00)">ช่วงบ่าย (12:00 - 17:00)</option>
                            <option value="ช่วงเย็น (17:00 - 19:00)">ช่วงเย็น (17:00 - 19:00)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">หมายเหตุเพิ่มเติม</label>
                      <div className="form-input-wrapper">
                        <span className="form-input-icon" style={{ top: "24px" }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        </span>
                        <textarea 
                          name="notes" 
                          placeholder="รายละเอียดเพิ่มเติม..." 
                          className="form-control"
                          value={formData.notes}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                    </div>

                    <label className="form-checkbox-row">
                      <input 
                        type="checkbox" 
                        name="agree" 
                        className="form-checkbox"
                        checked={formData.agree}
                        onChange={handleFormChange}
                      />
                      <span className="form-checkbox-label">
                        ข้าพเจ้ายินยอมให้เก็บรวบรวมและใช้ข้อมูลส่วนบุคคลตาม <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", whiteSpace: "nowrap" }}>นโยบายความเป็นส่วนตัว</a>
                      </span>
                    </label>

                    <button 
                      type="submit" 
                      className="btn-submit"
                      disabled={submitStatus.submitting}
                    >
                      {submitStatus.submitting ? (
                        <>กำลังส่งข้อมูล...</>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                          ส่งข้อมูลเพื่อติดต่อกลับ
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/logo-horizontal-white.png" alt="KHONGKWAN ASSET" className="footer-logo" />
            <p className="footer-desc">
              ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 — โครงการคุณภาพที่ตอบโจทย์ทุกการอยู่อาศัย ชุมชนน่าอยู่ สิ่งอำนวยความสะดวกครบครัน ปลอดภัย อบอุ่น เพื่อทุกก้าวการใช้ชีวิตที่มั่นคง
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">เมนู</h4>
            <ul className="footer-links">
              <li><a onClick={() => scrollToSection("highlights")} style={{ cursor: "pointer" }}>จุดเด่น</a></li>
              <li><a onClick={() => scrollToSection("promotion")} style={{ cursor: "pointer" }}>โปรโมชัน</a></li>
              <li><a onClick={() => scrollToSection("house-types")} style={{ cursor: "pointer" }}>แบบบ้าน</a></li>
              <li><a onClick={() => scrollToSection("gallery")} style={{ cursor: "pointer" }}>แกลเลอรี</a></li>
              <li><a onClick={() => scrollToSection("map")} style={{ cursor: "pointer" }}>ทำเล</a></li>
              <li><a onClick={() => scrollToSection("reviews")} style={{ cursor: "pointer" }}>รีวิว</a></li>
              <li><a onClick={() => scrollToSection("register")} style={{ cursor: "pointer" }}>ลงทะเบียน</a></li>
              <li><a href="/privacy" style={{ display: "inline-block", whiteSpace: "nowrap" }}>นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">ติดต่อเรา</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span>ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <a href="tel:0950206959">0950206959</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </span>
                <a href="https://line.me/R/ti/p/@Khongkwanasset" target="_blank" rel="noopener noreferrer">@Khongkwanasset</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <span>เปิดทุกวัน 09:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 KHONGKWAN ASSET RESIDENT. All rights reserved.</span>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        <a href="https://line.me/R/ti/p/@Khongkwanasset" target="_blank" rel="noopener noreferrer" className="float-btn float-line">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </a>
        <a href="tel:0950206959" className="float-btn float-phone">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>
      </div>

      {/* Lightbox Modal */}
      <div 
        className={`lightbox ${lightboxOpen ? "open" : ""}`}
        onClick={() => setLightboxOpen(false)}
      >
        <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        {lightboxImg && (
          <img src={lightboxImg} alt="Lightbox Facility Enlarge" className="lightbox-content" />
        )}
      </div>

      {/* Structured Data (JSON-LD) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "KHONGKWAN ASSET RESIDENT | ลุมพินี ทาวน์ชิป รังสิต-คลอง 1",
            "image": "https://www.lpnrangsitby.co.th/images/logo.png",
            "url": "https://www.lpnrangsitby.co.th",
            "telephone": "095-020-6959",
            "priceRange": "929,000 THB",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ลุมพินี ทาวน์ชิป รังสิต-คลอง 1",
              "addressLocality": "ต.คลองหนึ่ง อ.คลองหลวง",
              "addressRegion": "จ.ปทุมธานี",
              "postalCode": "12120",
              "addressCountry": "TH"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 13.9845811,
              "longitude": 100.6315974
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://line.me/R/ti/p/@Khongkwanasset"
            ]
          })
        }}
      />
    </>
  );
}
