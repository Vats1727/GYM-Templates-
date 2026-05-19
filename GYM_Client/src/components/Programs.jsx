import React, { useState } from 'react';
import { Zap, X, Check } from 'lucide-react';
import useFetchData from '../hooks/useFetchData';

export default function Programs() {
  const { data: dbHeading } = useFetchData('pricing_plans_heading/active', []);
  const { data: dbPlans } = useFetchData('pricing_plans/active', []);

  const heading = dbHeading && dbHeading.length > 0 ? dbHeading[0] : {
    tag: "Programs",
    title: "Choose Your Level",
    desc: "All plans include personalised programming, nutrition guidance, and direct coach access."
  };

  const plans = dbPlans && dbPlans.length > 0 ? dbPlans : [
    {
      name: 'Starter',
      price: '149',
      billing: '/mo',
      desc: 'For beginners and those getting back into fitness. Build your foundation right.',
      features: [
        { text: 'Custom training program', ok: true },
        { text: 'Nutrition macro targets', ok: true },
        { text: 'Weekly check-in (text)', ok: true },
        { text: 'Exercise video library', ok: true },
        { text: 'App-based tracking', ok: true },
        { text: 'Video form reviews', ok: false },
        { text: '1:1 monthly calls', ok: false }
      ],
      featured: 0,
      btnText: 'Get Started'
    },
    {
      name: 'Elite Coaching',
      price: '299',
      billing: '/mo',
      desc: 'Full-service online coaching for serious results. This is the flagship experience.',
      features: [
        { text: 'Custom periodised program', ok: true },
        { text: 'Full nutrition coaching', ok: true },
        { text: 'Weekly check-in (video call)', ok: true },
        { text: 'Unlimited form video reviews', ok: true },
        { text: 'Daily WhatsApp access', ok: true },
        { text: 'Monthly 1:1 strategy call', ok: true },
        { text: 'Supplement guidance', ok: true }
      ],
      featured: 1,
      btnText: 'Start Elite'
    },
    {
      name: 'VIP In-Person',
      price: '799',
      billing: '/mo',
      desc: '12 in-person sessions per month in Dubai, plus all Elite Online features.',
      features: [
        { text: '12 x PT sessions/month', ok: true },
        { text: 'Custom periodised program', ok: true },
        { text: 'Full nutrition coaching', ok: true },
        { text: 'Body composition scans', ok: true },
        { text: 'Unlimited messaging', ok: true },
        { text: 'Monthly 1:1 calls', ok: true },
        { text: 'Recovery & mobility plan', ok: true }
      ],
      featured: 0,
      btnText: 'Apply for VIP'
    }
  ];

  // Booking Modal State
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    note: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openBookingModal = (planName) => {
    setSelectedPlan(planName);
    setSubmitted(false);
  };

  const closeBookingModal = () => {
    setSelectedPlan(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '/GYM-Templates-/GYM_Server/public';
      const res = await fetch(`${baseUrl}/api/admin/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: selectedPlan
        })
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: new Date().toISOString().split('T')[0],
          time: '10:00',
          note: ''
        });
      } else {
        alert("Failed to submit booking request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="programs" id="programs">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <div className="section-label">{heading.tag}</div>
          <h2 className="section-title">{heading.title}</h2>
          <p className="section-desc">{heading.desc}</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, idx) => (
            <div className={`price-card reveal ${plan.featured ? 'featured' : ''}`} key={plan.name || idx}>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <sup>$</sup>
                {plan.price}
                <sub>{plan.billing}</sub>
              </div>
              <div className="plan-desc">{plan.desc}</div>
              <ul className="plan-features">
                {plan.features && plan.features.map((feature, featureIdx) => (
                  <li className={feature.ok ? '' : 'off'} key={featureIdx}>
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button 
                className={`btn-plan ${plan.featured ? '' : 'outline'}`} 
                onClick={() => openBookingModal(plan.name)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
              >
                {plan.featured ? <Zap size={16} fill="currentColor" /> : null}
                {plan.btnText || 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form Modal */}
      {selectedPlan && (
        <div className="modal-overlay" onClick={closeBookingModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeBookingModal}>
              <X size={20} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 className="modal-title">Intake Form</h3>
                <p className="modal-subtitle">Apply for {selectedPlan} package. Marcus will contact you for a strategy session.</p>

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" className="form-control" placeholder="e.g. John Doe" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" className="form-control" placeholder="e.g. john@example.com" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="form-control" placeholder="e.g. +971 50 123 4567" value={formData.phone} onChange={handleInputChange} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="date">Consultation Date</label>
                    <input type="date" id="date" name="date" className="form-control" value={formData.date} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Time Slot</label>
                    <input type="time" id="time" name="time" className="form-control" value={formData.time} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="note">Goals / Training History</label>
                  <textarea id="note" name="note" rows="3" className="form-control" placeholder="Describe your experience, injuries, and target goals..." value={formData.note} onChange={handleInputChange}></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Sending Application...' : 'Submit Application'}
                </button>
              </form>
            ) : (
              <div className="success-msg">
                <div className="success-icon" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 1rem', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(232,255,0,0.1)', color: 'var(--accent)', alignItems: 'center' }}>
                  <Check size={36} />
                </div>
                <h3 className="success-title">Application Sent!</h3>
                <p className="success-text">
                  Thank you for applying, <strong>{formData.name}</strong>. We have sent a confirmation email to you.
                  Marcus will contact you shortly via email or phone to confirm your consultation schedule.
                </p>
                <button className="submit-btn" style={{ marginTop: '1.5rem', width: 'auto', padding: '12px 30px' }} onClick={closeBookingModal}>
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
