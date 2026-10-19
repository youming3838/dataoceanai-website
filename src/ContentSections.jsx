import React, { useState } from 'react';
import Footer from './Footer';

export default function ContentSections() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(to bottom, rgba(2, 22, 12, 0.4) 0%, rgba(2, 22, 12, 0.85) 100%)', color: '#f2f2f2', backdropFilter: 'blur(5px)' }}>
      
      <section id="services" style={{ padding: '100px 40px' }}>
        <h2 style={{ fontSize: '3rem', color: '#3b82f6', marginBottom: '20px' }}>SAP Services</h2>
        <p style={{ fontSize: '1.2rem', color: '#a3e4ff', marginBottom: '60px', maxWidth: '800px', lineHeight: '1.6' }}>
          Powered by over 10 years of enterprise expertise. We deliver precision ABAP development, seamless system integrations, and mission-critical support for global SAP landscapes.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ padding: '30px', border: '1px solid #3b82f6', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ffffff' }}>ABAP Development</h3>
            <p style={{ color: '#a3e4ff', lineHeight: '1.6' }}>Custom report development (ALV, Classical), Dialog programming, User Exits, BADIs, Enhancement Spots, SMARTFORMS, and SAP Scripts.</p>
          </div>
          <div style={{ padding: '30px', border: '1px solid #3b82f6', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ffffff' }}>Integration & Migration</h3>
            <p style={{ color: '#a3e4ff', lineHeight: '1.6' }}>IDOC, PIPO, REST/SOAP, SFTP interface design. Expertise in system migrations and DB2 to Oracle database migrations.</p>
          </div>
          <div style={{ padding: '30px', border: '1px solid #3b82f6', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ffffff' }}>Module Expertise</h3>
            <p style={{ color: '#a3e4ff', lineHeight: '1.6' }}>Deep functional support across FICO, SD, HR, PP, QM, FAM, and SAP CONCUR. Technical leadership and BAU support.</p>
          </div>
        </div>

        <div style={{ marginTop: '60px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <span style={{ padding: '10px 20px', background: 'rgba(59, 130, 246, 0.3)', border: '1px solid #3b82f6', borderRadius: '20px', color: '#a3e4ff' }}>FICO</span>
          <span style={{ padding: '10px 20px', background: 'rgba(59, 130, 246, 0.3)', border: '1px solid #3b82f6', borderRadius: '20px', color: '#a3e4ff' }}>SD</span>
          <span style={{ padding: '10px 20px', background: 'rgba(59, 130, 246, 0.3)', border: '1px solid #3b82f6', borderRadius: '20px', color: '#a3e4ff' }}>HR</span>
          <span style={{ padding: '10px 20px', background: 'rgba(59, 130, 246, 0.3)', border: '1px solid #3b82f6', borderRadius: '20px', color: '#a3e4ff' }}>PP</span>
          <span style={{ padding: '10px 20px', background: 'rgba(59, 130, 246, 0.3)', border: '1px solid #3b82f6', borderRadius: '20px', color: '#a3e4ff' }}>QM</span>
          <span style={{ padding: '10px 20px', background: 'rgba(59, 130, 246, 0.3)', border: '1px solid #3b82f6', borderRadius: '20px', color: '#a3e4ff' }}>FAM</span>
          <span style={{ padding: '10px 20px', background: 'rgba(59, 130, 246, 0.3)', border: '1px solid #3b82f6', borderRadius: '20px', color: '#a3e4ff' }}>SAP CONCUR</span>
        </div>

        <div style={{ marginTop: '60px', padding: '40px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
          <h3 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '20px' }}>Proven Enterprise Pedigree</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '30px', color: '#a3e4ff', fontSize: '1.1rem' }}>
            <li>✔ 10+ Years SAP Experience</li>
            <li>✔ AIA Shared Services (Lead ABAP)</li>
            <li>✔ British American Tobacco</li>
            <li>✔ Averis Shared Services</li>
            <li>✔ Global Enterprise Migrations</li>
          </ul>
        </div>
      </section>

      <section id="nfc" style={{ padding: '100px 40px' }}>
        <h2 style={{ fontSize: '3rem', color: '#3b82f6', marginBottom: '20px' }}>Digital Tech Products</h2>
        <p style={{ fontSize: '1.2rem', color: '#a3e4ff', marginBottom: '60px', maxWidth: '800px' }}>
          Innovative digital tools designed to elevate your professional network.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', background: 'rgba(59, 130, 246, 0.15)', padding: '40px', borderRadius: '12px', border: '1px solid #3b82f6' }}>
          
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#ffffff' }}>Smart NFC Business Cards</h3>
            <p style={{ color: '#a3e4ff', marginBottom: '30px', lineHeight: '1.6', fontSize: '1.1rem' }}>
              Share your contact details, portfolio, and social media instantly with a single tap. Premium, eco-friendly, and fully programmable.
            </p>
            
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#ffffff', marginBottom: '15px' }}>How it works:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <span style={{ background: '#3b82f6', color: '#fff', width: '30px', height: '30px', minWidth: '30px', minHeight: '30px', aspectRatio: '1 / 1', flexShrink: 0, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '0.95rem' }}>1</span>
                  <span style={{ color: '#a3e4ff', lineHeight: '1.5', paddingTop: '5px' }}>Tap the card on any NFC-enabled smartphone.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <span style={{ background: '#3b82f6', color: '#fff', width: '30px', height: '30px', minWidth: '30px', minHeight: '30px', aspectRatio: '1 / 1', flexShrink: 0, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '0.95rem' }}>2</span>
                  <span style={{ color: '#a3e4ff', lineHeight: '1.5', paddingTop: '5px' }}>Your digital profile opens instantly in their browser.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <span style={{ background: '#3b82f6', color: '#fff', width: '30px', height: '30px', minWidth: '30px', minHeight: '30px', aspectRatio: '1 / 1', flexShrink: 0, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '0.95rem' }}>3</span>
                  <span style={{ color: '#a3e4ff', lineHeight: '1.5', paddingTop: '5px' }}>They save your contact, visit your LinkedIn, or call you directly.</span>
                </div>
              </div>
            </div>

            <a href="/nfc-product" style={{ display: 'inline-block', padding: '15px 40px', backgroundColor: '#3b82f6', color: '#ffffff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '8px' }}>Order Yours Now</a>
          </div>

          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
            <img 
              src="https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122905/Classic_Red.png" 
              alt="Smart NFC Business Card" 
              style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', border: '1px solid #3b82f6', boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }} 
            />
          </div>
        </div>
      </section>

      <section id="ai" style={{ padding: '100px 40px' }}>
        <h2 style={{ fontSize: '3rem', color: '#3b82f6', marginBottom: '20px' }}>AI Governance</h2>
        <p style={{ fontSize: '1.2rem', color: '#a3e4ff', maxWidth: '800px', lineHeight: '1.6' }}>
          We are preparing to launch specialized AI Governance consulting to help enterprises navigate the complex landscape of artificial intelligence responsibly and ethically.
        </p>
        <p style={{ fontSize: '1rem', color: '#a3e4ff', maxWidth: '800px', marginTop: '20px', opacity: 0.8 }}>
          Stay tuned as we expand our services to bridge the gap between enterprise SAP systems and modern AI frameworks.
        </p>
      </section>

      <section id="contact" style={{ padding: '100px 40px' }}>
        <h2 style={{ fontSize: '3rem', color: '#3b82f6', marginBottom: '20px' }}>Contact Data Ocean</h2>
        <p style={{ color: '#a3e4ff', marginBottom: '40px', fontSize: '1.1rem' }}>
          Ready to elevate your SAP infrastructure or order your NFC cards? Reach out to us directly.
        </p>
        
        {submitted ? (
          <div style={{ padding: '40px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.3)', border: '1px solid #3b82f6', maxWidth: '600px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '10px' }}>Thank You!</h3>
            <p style={{ color: '#a3e4ff' }}>Your message has been received. We will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', background: 'rgba(59, 130, 246, 0.15)', padding: '40px', borderRadius: '12px', border: '1px solid #3b82f6' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#ffffff' }}>Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #3b82f6', background: 'rgba(2, 22, 12, 0.8)', color: '#ffffff' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#ffffff' }}>Your Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #3b82f6', background: 'rgba(2, 22, 12, 0.8)', color: '#ffffff' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#ffffff' }}>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #3b82f6', background: 'rgba(2, 22, 12, 0.8)', color: '#ffffff', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" style={{ padding: '15px 40px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>Send Message</button>
          </form>
        )}
      </section>

      <Footer />

    </div>
  );
}
