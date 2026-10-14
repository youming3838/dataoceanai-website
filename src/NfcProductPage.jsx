import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// Interactive FAQ Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.3)', padding: '20px 0' }}>
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)} 
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: '#ffffff', fontSize: '1.2rem', fontWeight: '600' }}
      >
        <span>{question}</span>
        <span style={{ color: '#3b82f6', fontSize: '1.5rem', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: '0.3s' }}>+</span>
      </motion.div>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }} 
          style={{ color: '#a3e4ff', marginTop: '15px', lineHeight: '1.6' }}
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

export default function NfcProductPage() {
  return (
    <div style={{ backgroundColor: '#02160c', color: '#f2f2f2', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      
      {/* Navigation Back to Home */}
      <div style={{ padding: '20px 40px', borderBottom: '1px solid #3b82f6', position: 'sticky', top: 0, background: 'rgba(2, 22, 12, 0.9)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Data Ocean</Link>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial="hidden" animate="visible" variants={staggerContainer}
        style={{ display: 'flex', flexWrap: 'wrap', padding: '80px 40px', gap: '60px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}
      >
        <motion.div variants={fadeInUp} style={{ flex: '1 1 400px' }}>
          <h1 style={{ fontSize: '3.5rem', color: '#3b82f6', marginBottom: '20px', lineHeight: '1.1' }}>Elevate Your First Impression with Smart NFC Cards</h1>
          <p style={{ fontSize: '1.2rem', color: '#a3e4ff', marginBottom: '30px', lineHeight: '1.6' }}>
            Stop handing out paper cards that get thrown away. Our premium, programmable NFC business cards let you share your entire digital portfolio, social media, and contact details with a single tap.
          </p>
          <motion.a 
            whileTap={{ scale: 0.95 }}
            href="#order" style={{ display: 'inline-block', padding: '20px 50px', backgroundColor: '#3b82f6', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', borderRadius: '8px', boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}>Order Your Card Now</motion.a>
          <p style={{ color: '#a3e4ff', marginTop: '15px', fontSize: '0.9rem' }}>Free shipping worldwide. Global delivery available.</p>
        </motion.div>
        
        <motion.div variants={fadeInUp} style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <div style={{ width: '100%', maxWidth: '500px', height: '300px', margin: '0 auto', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(2, 22, 12, 0.8))', border: '1px solid #3b82f6', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 50px rgba(59, 130, 246, 0.4)' }}>
            <span style={{ color: '#a3e4ff', fontSize: '1.2rem' }}>[ Insert NFC Card Image Here ]</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
        style={{ padding: '80px 40px', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderTop: '1px solid #3b82f6' }}
      >
        <motion.h2 variants={fadeInUp} style={{ fontSize: '2.5rem', color: '#3b82f6', textAlign: 'center', marginBottom: '50px' }}>Why Choose Our NFC Cards?</motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          
          <motion.div variants={fadeInUp} whileTap={{ scale: 0.95 }} style={{ padding: '30px', background: '#02160c', borderRadius: '12px', border: '1px solid #3b82f6', cursor: 'pointer' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>♻️ Eco-Friendly & Reusable</h3>
            <p style={{ color: '#a3e4ff' }}>Never print paper cards again. Update your digital profile anytime without changing the physical card.</p>
          </motion.div>

          <motion.div variants={fadeInUp} whileTap={{ scale: 0.95 }} style={{ padding: '30px', background: '#02160c', borderRadius: '12px', border: '1px solid #3b82f6', cursor: 'pointer' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>📱 Universal Compatibility</h3>
            <p style={{ color: '#a3e4ff' }}>Works seamlessly with all modern iPhones and Android devices. No app required for your clients.</p>
          </motion.div>

          <motion.div variants={fadeInUp} whileTap={{ scale: 0.95 }} style={{ padding: '30px', background: '#02160c', borderRadius: '12px', border: '1px solid #3b82f6', cursor: 'pointer' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>💼 Professional Design</h3>
            <p style={{ color: '#a3e4ff' }}>Premium matte finish with custom branding options available for enterprise orders.</p>
          </motion.div>

        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
        style={{ padding: '80px 40px', borderTop: '1px solid #3b82f6' }}
      >
        <motion.h2 variants={fadeInUp} style={{ fontSize: '2.5rem', color: '#3b82f6', textAlign: 'center', marginBottom: '50px' }}>Trusted by Professionals</motion.h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div variants={fadeInUp} style={{ padding: '30px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)', flex: '1 1 300px' }}>
            <p style={{ color: '#a3e4ff', fontStyle: 'italic', marginBottom: '20px' }}>"This card has completely transformed how I network at conferences. I just tap and my whole portfolio opens up."</p>
            <p style={{ color: '#ffffff', fontWeight: 'bold' }}>— Sarah L., Tech Consultant</p>
          </motion.div>
          <motion.div variants={fadeInUp} style={{ padding: '30px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)', flex: '1 1 300px' }}>
            <p style={{ color: '#a3e4ff', fontStyle: 'italic', marginBottom: '20px' }}>"I love that I can update my contact details without ordering a new card. It's the ultimate eco-friendly business tool."</p>
            <p style={{ color: '#ffffff', fontWeight: 'bold' }}>— Michael R., Startup Founder</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Pricing / Order Section */}
      <motion.div 
        id="order" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
        style={{ padding: '80px 40px', textAlign: 'center', borderTop: '1px solid #3b82f6' }}
      >
        <motion.h2 variants={fadeInUp} style={{ fontSize: '3rem', color: '#3b82f6', marginBottom: '20px' }}>Ready to Upgrade Your Network?</motion.h2>
        <motion.p variants={fadeInUp} style={{ fontSize: '1.2rem', color: '#a3e4ff', marginBottom: '40px' }}>Get your smart NFC card today.</motion.p>
        
        <motion.div variants={fadeInUp} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block', padding: '50px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', border: '2px solid #3b82f6', maxWidth: '500px', width: '100%', boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
          <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '10px' }}>Standard Card</h3>
          <p style={{ color: '#3b82f6', fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>$99</p>
          <ul style={{ listStyle: 'none', padding: 0, color: '#a3e4ff', marginBottom: '30px', textAlign: 'left', display: 'inline-block' }}>
            <li style={{ marginBottom: '10px' }}>✔ Custom Digital Profile Setup</li>
            <li style={{ marginBottom: '10px' }}>✔ Premium Matte Finish</li>
            <li style={{ marginBottom: '10px' }}>✔ Unlimited Taps</li>
            <li style={{ marginBottom: '10px' }}>✔ 1-Year Warranty</li>
          </ul>
          <br />
          <motion.a whileTap={{ scale: 0.95 }} href="mailto:connect@dataoceanai.io?subject=Order%20NFC%20Card" style={{ display: 'inline-block', padding: '15px 40px', backgroundColor: '#3b82f6', color: '#fff', fontWeight: 'bold', textDecoration: 'none', borderRadius: '8px', width: '100%' }}>Order via Email</motion.a>
        </motion.div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
        style={{ padding: '80px 40px', maxWidth: '800px', margin: '0 auto', borderTop: '1px solid #3b82f6' }}
      >
        <motion.h2 variants={fadeInUp} style={{ fontSize: '2.5rem', color: '#3b82f6', textAlign: 'center', marginBottom: '40px' }}>Frequently Asked Questions</motion.h2>
        
        <FaqItem 
          question="Does it work with both iPhone and Android?" 
          answer="Yes! Our NFC cards are universally compatible with all modern smartphones, including iPhones (iOS 14+) and Android devices. No app is required for the person receiving your card."
        />
        <FaqItem 
          question="Can I reuse the card if I change my phone number?" 
          answer="Absolutely. The card is rewritable. You can update your digital profile (phone number, email, social media links) as many times as you want without needing a new physical card."
        />
        <FaqItem 
          question="How do I customize my digital profile?" 
          answer="Once you receive your card, we will send you a link to our easy-to-use dashboard where you can upload your photo, logo, and contact information. It takes less than 5 minutes to set up."
        />
        <FaqItem 
          question="Do you offer custom branding for businesses?" 
          answer="Yes, we offer enterprise packages with custom logo printing and bulk pricing. Please contact us directly at connect@dataoceanai.io for a quote."
        />
      </motion.div>

      {/* Footer */}
      <footer style={{ padding: '40px', borderTop: '1px solid #3b82f6', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}>
        <p style={{ color: '#a3e4ff', marginBottom: '10px' }}>Data Ocean © 2026. All rights reserved.</p>
        <p style={{ color: '#a3e4ff', fontSize: '0.9rem' }}>
          <a href="mailto:connect@dataoceanai.io" style={{ color: '#3b82f6', textDecoration: 'none' }}>connect@dataoceanai.io</a>
        </p>
      </footer>

    </div>
  );
}
