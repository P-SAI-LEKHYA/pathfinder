import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subject = encodeURIComponent(`PathFinder Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      // Launch mail client addressing sailekhya2006@gmail.com
      window.location.href = `mailto:sailekhya2006@gmail.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  }

  return (
    <div className="page-wrapper">
      <section className="page-intro">
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="badge badge-amber" style={{ marginBottom: 12 }}>Get In Touch</span>
          <h1>Contact Us</h1>
          <p className="page-intro-lead">
            Questions, feedback, or partnership ideas — send a note and we will get back to you promptly.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 640 }}>
        <div className="contact-panel surface-3d">
          {submitted ? (
            <div className="contact-success-box" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✉️</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--accent)', marginBottom: '8px' }}>
                Message Dispatched!
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Thank you <strong>{formData.name}</strong>. Your message is being sent directly to{' '}
                <a href="mailto:sailekhya2006@gmail.com" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                  sailekhya2006@gmail.com
                </a>.
              </p>
              <button
                className="btn btn-3d"
                style={{ marginTop: '20px' }}
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <label className="field-label" htmlFor="contact-name">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />

              <label className="field-label" htmlFor="contact-email">
                Your Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />

              <label className="field-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                required
                placeholder="Type your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-field"
                style={{ resize: 'vertical', borderRadius: 14 }}
              />

              <button type="submit" className="btn btn-3d" style={{ alignSelf: 'flex-start', marginTop: '12px' }}>
                Send Message →
              </button>
            </form>
          )}
        </div>

        <p className="contact-meta" style={{ textAlign: 'center', marginTop: '16px' }}>
          Direct inquiries: email <a href="mailto:sailekhya2006@gmail.com">sailekhya2006@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
