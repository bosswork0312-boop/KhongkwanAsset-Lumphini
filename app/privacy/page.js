"use client";

import { useState, useEffect } from "react";

export default function PrivacyPolicy() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header / Nav */}
      <header className={scrolled ? "scrolled" : ""}>
        <div className="nav-container">
          <div className="logo" onClick={() => window.location.href = "/"} style={{ cursor: "pointer" }}>
            <img src="/images/logo-horizontal.png" alt="KHONGKWAN ASSET" />
          </div>

          <nav className="nav-links">
            <a href="/#highlights">จุดเด่น</a>
            <a href="/#promotion">โปรโมชัน</a>
            <a href="/#house-types">แบบบ้าน</a>
            <a href="/#gallery">แกลเลอรี</a>
            <a href="/#map">ทำเล</a>
            <a href="/#reviews">รีวิว</a>
            <a href="/#register">ติดต่อ</a>
          </nav>

          <div className="nav-actions">
            <button className="btn-register" onClick={() => window.location.href = "/#register"}>ลงทะเบียน</button>
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
        <a href="/#highlights">จุดเด่น</a>
        <a href="/#promotion">โปรโมชัน</a>
        <a href="/#house-types">แบบบ้าน</a>
        <a href="/#gallery">แกลเลอรี</a>
        <a href="/#map">ทำเล</a>
        <a href="/#reviews">รีวิว</a>
        <a href="/#register">ติดต่อ</a>
        <button className="btn-register" onClick={() => window.location.href = "/#register"}>ลงทะเบียน</button>
      </div>

      {/* Privacy Policy Content */}
      <main style={{ paddingTop: "140px", paddingBottom: "100px", background: "var(--neutral-light)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "white", padding: "48px", borderRadius: "20px", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-md)" }}>
            <h1 className="keep-word" style={{ color: "var(--primary)", fontSize: "28px", fontWeight: "700", marginBottom: "24px", textAlign: "center" }}>
              นโยบายความเป็นส่วนตัว (Privacy Policy)
            </h1>
            <p style={{ color: "var(--neutral-grey)", fontSize: "14px", marginBottom: "30px", textAlign: "center" }}>
              ปรับปรุงล่าสุดเมื่อ: 19 พฤษภาคม 2569
            </p>

            <div className="keep-word" style={{ display: "flex", flexDirection: "column", gap: "24px", color: "var(--neutral-dark)", lineHeight: "1.8", fontSize: "15px" }}>
              <p>
                บริษัท KHONGKWAN ASSET RESIDENT (&quot;บริษัท&quot;) ตระหนักถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของท่านที่มาลงทะเบียนผ่านทางเว็บไซต์ของเรา เพื่อให้สอดคล้องกับพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) บริษัทขอแจ้งข้อมูลต่อไปนี้ให้ท่านทราบ
              </p>

              <div>
                <h3 style={{ color: "var(--primary)", fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>1. ข้อมูลส่วนบุคคลที่เราจัดเก็บ</h3>
                <p>เราจัดเก็บข้อมูลที่ท่านกรอกผ่านแบบฟอร์มลงทะเบียนโดยตรง ซึ่งรวมถึง:</p>
                <ul style={{ paddingLeft: "24px", marginTop: "8px" }}>
                  <li>ชื่อ-นามสกุล</li>
                  <li>เบอร์โทรศัพท์</li>
                  <li>แบบบ้านหรือประเภทห้องที่ท่านสนใจ</li>
                  <li>งบประมาณในการเลือกซื้อ</li>
                  <li>เวลาที่ท่านสะดวกให้ติดต่อกลับ</li>
                  <li>ข้อความเพิ่มเติมที่ระบุไว้ในแบบฟอร์ม</li>
                </ul>
              </div>

              <div>
                <h3 style={{ color: "var(--primary)", fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>2. วัตถุประสงค์ในการเก็บรวบรวมข้อมูล</h3>
                <p>เราเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของท่านเพื่อวัตถุประสงค์ดังต่อไปนี้:</p>
                <ul style={{ paddingLeft: "24px", marginTop: "8px" }}>
                  <li>เพื่อติดต่อกลับและให้ข้อมูลเกี่ยวกับโครงการ ข้อมูลราคา และแคมเปญโปรโมชันพิเศษ</li>
                  <li>เพื่ออำนวยความสะดวกในการนัดหมายเยี่ยมชมโครงการจริง</li>
                  <li>เพื่อใช้ในการวิเคราะห์ พัฒนา และปรับปรุงบริการและรูปแบบโครงการให้ตรงกับความต้องการของกลุ่มลูกค้ามากยิ่งขึ้น</li>
                </ul>
              </div>

              <div>
                <h3 style={{ color: "var(--primary)", fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>3. การเก็บรักษาและระยะเวลาในการเก็บรักษาข้อมูล</h3>
                <p>
                  บริษัทจะจัดเก็บข้อมูลส่วนบุคคลของท่านไว้ในระบบอิเล็กทรอนิกส์ที่มีมาตรฐานการรักษาความปลอดภัยอย่างเข้มงวด โดยจำกัดสิทธิ์เข้าถึงเฉพาะเจ้าหน้าที่ที่เกี่ยวข้องเท่านั้น เราจะเก็บรักษาข้อมูลของท่านไว้เป็นระยะเวลาที่จำเป็นต่อการติดต่อและให้บริการท่าน หรือไม่เกิน 3 ปี นับจากวันที่ท่านลงทะเบียน
                </p>
              </div>

              <div>
                <h3 style={{ color: "var(--primary)", fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>4. การเปิดเผยข้อมูลแก่บุคคลภายนอก</h3>
                <p>
                  บริษัทขอรับรองว่าจะไม่นำข้อมูลส่วนบุคคลของท่านไปขาย แลกเปลี่ยน หรือเปิดเผยให้แก่บุคคลภายนอกที่ไม่เกี่ยวข้องโดยไม่ได้รับความยินยอมจากท่าน เว้นแต่เป็นการปฏิบัติตามกฎหมายหรือคำสั่งของหน่วยงานของรัฐที่เกี่ยวข้อง
                </p>
              </div>

              <div>
                <h3 style={{ color: "var(--primary)", fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>5. สิทธิ์ของเจ้าของข้อมูล</h3>
                <p>ท่านมีสิทธิ์ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลในการดำเนินการดังต่อไปนี้:</p>
                <ul style={{ paddingLeft: "24px", marginTop: "8px" }}>
                  <li>สิทธิ์ในการขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของท่าน</li>
                  <li>สิทธิ์ในการขอแก้ไขข้อมูลส่วนบุคคลให้ถูกต้องเป็นปัจจุบัน</li>
                  <li>สิทธิ์ในการขอถอนความยินยอมในการเก็บรวบรวมและประมวลผลข้อมูล</li>
                  <li>สิทธิ์ในการขอให้ระงับ หรือลบข้อมูลส่วนบุคคลของท่านออกจากระบบ</li>
                </ul>
                <p style={{ marginTop: "12px" }}>
                  หากท่านต้องการใช้สิทธิ์ดังกล่าว กรุณาติดต่อเราผ่านช่องทางการติดต่อด้านล่าง
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "24px", marginTop: "12px" }}>
                <h3 style={{ color: "var(--primary)", fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>ช่องทางการติดต่อเรา</h3>
                <p style={{ marginBottom: "16px" }}><strong>ฝ่ายคุ้มครองข้อมูลส่วนบุคคล (DPO) KHONGKWAN ASSET RESIDENT</strong></p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "14px", color: "var(--neutral-dark)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px", flexShrink: 0, marginTop: "2px" }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", color: "var(--neutral-dark)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px", flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <a href="tel:0950206959" style={{ color: "inherit" }}>โทรศัพท์: 095-020-6959</a>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", color: "var(--neutral-dark)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px", flexShrink: 0 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <a href="https://line.me/R/ti/p/@Khongkwanasset" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Line Official: @Khongkwanasset</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
              <li><a href="/#highlights">จุดเด่น</a></li>
              <li><a href="/#promotion">โปรโมชัน</a></li>
              <li><a href="/#house-types">แบบบ้าน</a></li>
              <li><a href="/#gallery">แกลเลอรี</a></li>
              <li><a href="/#map">ทำเล</a></li>
              <li><a href="/#reviews">รีวิว</a></li>
              <li><a href="/#register">ลงทะเบียน</a></li>
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
    </>
  );
}
