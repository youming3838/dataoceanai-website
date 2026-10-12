import React from 'react';

export default function ContentSections() {
  return (
    <div style={{ position: 'relative', zIndex: 10, backgroundColor: '#02160c', color: '#f2f2f2' }}>
      
      {/* SAP Services Section */}
      <section id="services" style={{ padding: '100px 40px', borderTop: '1px solid #34e89a' }}>
        <h2 style={{ fontSize: '3rem', color: '#34e89a', marginBottom: '40px' }}>SAP Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ padding: '20px', border: '1px solid #aef0c0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>ABAP Development</h3>
            <p style={{ color: '#aef0c0' }}>Expert custom reports, dialog programming, BADIs, user exits, SMARTFORMS, and SAP Scripts.</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #aef0c0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Integration & Migration</h3>
            <p style={{ color: '#aef0c0' }}>IDOC, PIPO, REST/SOAP, SFTP setup. System migrations and DB2 to Oracle migrations.</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #aef0c0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Module Support</h3>
            <p style={{ color: '#aef0c0' }}>Comprehensive support for FICO, SD, HR, PP, QM, FAM, and SAP CONCUR modules.</p>
          </div>
        </div>
      </section>

      {/* NFC Products Section */}
      <section id="nfc" style={{ padding: '100px 40px', borderTop: '1px solid #34e89a' }}>
        <h2 style={{ fontSize: '3rem', color: '#34e89a', marginBottom: '40px' }}>Digital Tech Products</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Smart NFC Business Cards</h3>
            <p style={{ color: '#aef0c0', marginBottom: '20px' }}>Share your contact details, portfolio, and social media instantly with a single tap. Premium, eco-friendly, and programmable.</p>
            <a href="#contact" style={{ display: 'inline-block', padding: '15px 30px', backgroundColor: '#34e89a', color: '#02160c', textDecoration: 'none', fontWeight: 'bold' }}>Order Yours Now</a>
          </div>
        </div>
      </section>

      {/* AI Governance Section */}
      <section id="ai" style={{ padding: '100px 40px', borderTop: '1px solid #34e89a' }}>
        <h2 style={{ fontSize: '3rem', color: '#34e89a', marginBottom: '40px' }}>AI Governance</h2>
        <p style={{ color: '#aef0c0', maxWidth: '800px' }}>We are preparing to launch specialized AI Governance consulting to help enterprises navigate the complex landscape of artificial intelligence responsibly and ethically.</p>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '100px 40px', borderTop: '1px solid #34e89a' }}>
        <h2 style={{ fontSize: '3rem', color: '#34e89a', marginBottom: '40px' }}>Contact Data Ocean</h2>
        <p style={{ color: '#aef0c0', marginBottom: '10px' }}>Email: hello@dataoceanai.io</p>
        <p style={{ color: '#aef0c0', marginBottom: '30px' }}>Based in Malaysia, serving global enterprises.</p>
        <a href="mailto:hello@dataoceanai.io" style={{ display: 'inline-block', padding: '15px 30px', border: '1px solid #34e89a', color: '#34e89a', textDecoration: 'none', fontWeight: 'bold' }}>Get in Touch</a>
      </section>

    </div>
  );
}
