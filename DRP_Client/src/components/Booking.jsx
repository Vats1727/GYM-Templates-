import React from 'react';
import { Calendar, MessageSquare } from 'lucide-react';
import useFetchData from '../hooks/useFetchData';

export default function Booking() {
  const { data: dbBooking } = useFetchData('bookings/active', []);

  const booking = dbBooking && dbBooking.length > 0 ? dbBooking[0] : {
    title: "Ready to Begin Your Healing?",
    subtitle: "Book your free 20-minute introductory consultation today. No obligation, no pressure — just a conversation about your health.",
    btn1_text: "Book Free Consultation",
    btn2_text: "WhatsApp Us",
    btn2_link: "https://wa.me/923001234567",
    footer_text: "Consultations available 7 days a week · 9 AM – 9 PM PKT · Secure & Confidential"
  };

  const handleBookClick = () => {
    alert("Booking system — connect your preferred scheduler here (Calendly, WhatsApp, etc.)");
  };

  const handleWhatsAppClick = () => {
    const waLink = booking.btn2_link || 'https://wa.me/923001234567';
    window.open(waLink.startsWith('http') ? waLink : `https://${waLink}`, '_blank');
  };

  return (
    <section className="booking" id="booking">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal visible">
          <h2>{booking.title}</h2>
          <p>{booking.subtitle}</p>
          <div className="booking-btns">
            <button className="btn-white" style={{ gap: '8px' }} onClick={handleBookClick}>
              <Calendar size={18} /> {booking.btn1_text}
            </button>
            <button className="btn-outline-white" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={handleWhatsAppClick}>
              <MessageSquare size={18} /> {booking.btn2_text}
            </button>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginTop: '2rem' }}>
            {booking.footer_text}
          </p>
        </div>
      </div>
    </section>
  );
}

