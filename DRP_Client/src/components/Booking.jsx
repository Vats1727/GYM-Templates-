import React from 'react';

export default function Booking() {
  const handleBookClick = () => {
    alert("Booking system — connect your preferred scheduler here (Calendly, WhatsApp, etc.)");
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+923001234567', '_blank');
  };

  return (
    <section className="booking" id="booking">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal visible">
          <h2>Ready to Begin Your Healing?</h2>
          <p>Book your free 20-minute introductory consultation today. No obligation, no pressure — just a conversation about your health.</p>
          <div className="booking-btns">
            <button className="btn-white" onClick={handleBookClick}>
              📅 Book Free Consultation
            </button>
            <button className="btn-outline-white" onClick={handleWhatsAppClick}>
              💬 WhatsApp Us
            </button>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginTop: '2rem' }}>
            Consultations available 7 days a week · 9 AM – 9 PM PKT · Secure & Confidential
          </p>
        </div>
      </div>
    </section>
  );
}
