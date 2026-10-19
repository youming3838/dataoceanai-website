import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Mail, MessageCircle, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ position: 'relative', zIndex: 10, background: 'rgba(0, 0, 0, 0.7)', borderTop: '1px solid rgba(59, 130, 246, 0.3)', backdropFilter: 'blur(10px)', padding: '60px 20px 30px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Brand Column */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(to bottom right, #3b82f6, #22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#02160c', fontSize: '1.1rem' }}>
                D
              </div>
              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.15rem' }}>
                Data Ocean<sup style={{ fontSize: '0.55em', color: '#3b82f6', marginLeft: '2px' }}>©</sup>
              </span>
            </Link>
            <p style={{ color: '#a3e4ff', fontSize: '0.85rem', lineHeight: '1.6', maxWidth: '280px', marginBottom: '20px' }}>
              Elite SAP consulting, digital NFC solutions, and AI governance powered by enterprise expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '18px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link></li>
              <li><Link to="/#services" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.85rem' }}>SAP Services</Link></li>
              <li><Link to="/#nfc" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.85rem' }}>Digital Products</Link></li>
              <li><Link to="/#ai" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.85rem' }}>AI Governance</Link></li>
              <li><Link to="/#contact" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.85rem' }}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '18px' }}>
              Products
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/nfc-product" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.85rem' }}>Smart NFC Cards</Link></li>
              <li><a href="mailto:connect@dataoceanai.io?subject=Enterprise%20NFC%20Enquiry" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.85rem' }}>Enterprise Bundles</a></li>
              <li><a href="mailto:connect@dataoceanai.io?subject=Custom%20Branding" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.85rem' }}>Custom Branding</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '18px' }}>
              Get in Touch
            </h4>
            <a href="mailto:connect@dataoceanai.io" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a3e4ff', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '15px' }}>
              <Mail size={16} style={{ color: '#3b82f6', flexShrink: 0 }} />
              connect@dataoceanai.io
            </a>
            <p style={{ color: '#a3e4ff', fontSize: '0.8rem', opacity: 0.7, lineHeight: '1.5', marginBottom: '20px' }}>
              Based in Malaysia.<br />
              Serving global enterprises.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a3e4ff', textDecoration: 'none' }}
              >
                <Linkedin size={16} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a3e4ff', textDecoration: 'none' }}
              >
                <MessageCircle size={16} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a3e4ff', textDecoration: 'none' }}
              >
                <Instagram size={16} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:connect@dataoceanai.io"
                aria-label="Email"
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a3e4ff', textDecoration: 'none' }}
              >
                <Mail size={16} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.4), transparent)', marginBottom: '25px' }} />

        {/* Bottom Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
          <p style={{ color: '#a3e4ff', fontSize: '0.8rem', opacity: 0.7, margin: 0 }}>
            © {currentYear} Data Ocean. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Removed the Malaysia text here */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              aria-label="Back to top"
              style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a3e4ff', cursor: 'pointer' }}
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
