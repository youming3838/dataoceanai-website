import React from 'react';
import { Link } from 'react-router-dom';

export default function NfcProductPage() {
  return (
    <div style={{ backgroundColor: '#02160c', color: '#f2f2f2', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Navigation Back to Home */}
      <div style={{ padding: '20px 40px', borderBottom: '1px solid #3b82f6' }}>
        <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Data Ocean</Link>
      </div>

      {/* Hero Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '80px 40px', gap: '60px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h1 style={{ fontSize: '3.5rem', color: '#3b82f6', marginBottom: '20px', lineHeight: '1.1' }}>Elevate Your First Impression with Smart NFC Cards</h1>
          <p style={{ fontSize: '1.2rem', color: '#a3e4ff', marginBottom: '30px', lineHeight: '1.6' }}>
            Stop handing out paper cards that get thrown away. Our premium, programmable NFC business cards let you share your entire digital portfolio, social media, and contact details with a single tap.
          </p>
          <a href="#order" style={{ display: 'inline-block', padding: '20px 50px', backgroundColor: '#3b82f6', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', borderRadius: '8px' }}>Order Your Card Now</a>
          <p style={{ color: '#a3e4ff', marginTop: '15px', fontSize: '0.9rem' }}>Free shipping across Malaysia. Global shipping available.</p>
        </div>
        
        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
          {/* Product Image */}
          <img 
            src="/nfc-card.jpg" 
            alt="Smart NFC Business Card" 
            style={{ width: '100%', maxWidth: '500px', borderRadius: '20px', boxShadow: '0 0 50px rgba(59, 130, 246, 0.4)' }} 
          />
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ padding: '80px 40px', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderTop: '1px solid #3b82f6' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#3b82f6', textAlign: 'center', marginBottom: '50px' }}>Why Choose Our NFC Cards?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ padding: '30px', background: '#02160c', borderRadius: '12px', border: '1px solid #3b82f6' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>♻️ Eco-Friendly & Reusable</h3>
            <p style={{ color: '#a3e4ff' }}>Never print paper cards again. Update your digital profile anytime without changing the physical card.</p>
          </div>

          <div style={{ padding: '30px', background: '#02160c', borderRadius: '12px', border: '1px solid #3b82f6' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>📱 Universal Compatibility</h3>
            <p style={{ color: '#a3e4ff' }}>Works seamlessly with all modern iPhones and Android devices. No app required for your clients.</p>
          </div>

          <div style={{ padding: '30px', background: '#02160c', borderRadius: '12px', border: '1px solid #3b82f6' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>💼 Professional Design</h3>
            <p style={{ color: '#a3e4ff' }}>Premium matte finish with custom branding options available for enterprise orders.</p>
          </div>

        </div>
      </div>

      {/* Pricing / Order Section */}
      <div id="order" style={{ padding: '80px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', color: '#3b82f6', marginBottom: '20px' }}>Ready to Upgrade Your Network?</h2>
        <p style={{ fontSize: '1.2rem', color: '#a3e4ff', marginBottom: '40px' }}>Get your smart NFC card today.</p>
        
        <div style={{ display: 'inline-block', padding: '50px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', border: '2px solid #3b82f6', maxWidth: '500px', width: '100%' }}>
          <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '10px' }}>Standard Card</h3>
          <p style={{ color: '#3b82f6', fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>RM 99</p>
          <ul style={{ listStyle: 'none', padding: 0, color: '#a3e4ff', marginBottom: '30px', textAlign: 'left', display: 'inline-block' }}>
            <li style={{ marginBottom: '10px' }}>✔ Custom Digital Profile Setup</li>
            <li style={{ marginBottom: '10px' }}>✔ Premium Matte Finish</li>
            <li style={{ marginBottom: '10px' }}>✔ Unlimited Taps</li>
            <li style={{ marginBottom: '10px' }}>✔ 1-Year Warranty</li>
          </ul>
          <br />
          <a href="mailto:connect@dataoceanai.io?subject=Order%20NFC%20Card" style={{ display: 'inline-block', padding: '15px 40px', backgroundColor: '#3b82f6', color: '#fff', fontWeight: 'bold', textDecoration: 'none', borderRadius: '8px', width: '100%' }}>Order via Email</a>
        </div>
      </div>

    </div>
  );
}
