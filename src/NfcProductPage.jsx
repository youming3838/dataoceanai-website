import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Card3D from './Card3D';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const textRevealContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const textRevealItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

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

const MarqueeBanner = () => {
  return (
    <div style={{ overflow: 'hidden', width: '100%', background: 'rgba(59, 130, 246, 0.1)', borderTop: '1px solid rgba(59, 130, 246, 0.3)', borderBottom: '1px solid rgba(59, 130, 246, 0.3)', padding: '20px 0' }}>
      <motion.div 
        animate={{ x: [0, -1200] }} 
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        style={{ display: 'flex', whiteSpace: 'nowrap', gap: '40px', width: 'max-content' }}
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} style={{ color: '#3b82f6', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Smart NFC Business Cards • Eco-Friendly • Reusable • Premium Matte Finish • Global Shipping • 
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function NfcProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedCard, setSelectedCard] = useState(0); 
  const [scrollProgress, setScrollProgress] = useState(0);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  useEffect(() => {
    const hasSeenHint = localStorage.getItem('do_card_swipe_hint_seen');
    if (!hasSeenHint) {
      const timer = setTimeout(() => setShowSwipeHint(true), 1500);
      const autoHide = setTimeout(() => {
        setShowSwipeHint(false);
        localStorage.setItem('do_card_swipe_hint_seen', 'true');
      }, 15000);
      return () => { clearTimeout(timer); clearTimeout(autoHide); };
    }
  }, []);

  const handleCardInteraction = () => {
    setShowSwipeHint(false);
    localStorage.setItem('do_card_swipe_hint_seen', 'true');
  };

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(1, window.scrollY / window.innerHeight);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectCard = (index) => {
    setSelectedCard(index);
    setBurstTrigger(prev => prev + 1);
  };

  const cardOptions = [
    { name: "Ocean Blue", color: "#3b82f6", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122909/Ocean_Blue.png" },
    { name: "Super Black", color: "#1a1a1a", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122914/Super_black.png" },
    { name: "Pure White", color: "#ffffff", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122906/Pure_white.png" },
    { name: "Cyan Cobalt", color: "#00e5ff", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122911/Cyan_Cobalt_blue_gradient.png" },
    { name: "Gradient Red Orange", color: "#f97316", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122906/Gradient_red_orange.png" },
    { name: "Classic Red", color: "#dc2626", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122905/Classic_Red.png" },
    { name: "Turquoise", color: "#06b6d4", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122905/Turquoise.png" },
    { name: "Lime Green", color: "#84cc16", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122912/Lime_Green.png" },
    { name: "Grassy Green", color: "#22c55e", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122907/Grassy_Green_Turquoise.png" },
    { name: "Bright Light Yellow", color: "#fde047", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122897/Bright_Light_Yellow.png" },
    { name: "Yellow Orange", color: "#f59e0b", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122910/Yellow_Orange_Gradient.png" },
    { name: "Aquatic Blue Yellow", color: "#38bdf8", img: "https://res.cloudinary.com/qcyxxyec/image/upload/c_fill,w_1200,h_760/v1792122913/Aquatic_blue_yellow_gradient.png" }
  ];

  const basePrice = 99;
  const totalPrice = quantity * basePrice;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const features = [
    { title: "♻️ Eco-Friendly & Reusable", desc: "Never print paper cards again. Update your digital profile anytime without changing the physical card. Save the planet while saving money.", icon: "🌱" },
    { title: "📱 Universal Compatibility", desc: "Works seamlessly with all modern iPhones (iOS 14+) and Android devices. No app required for your clients. Just tap and connect.", icon: "📲" },
    { title: "💼 Professional Design", desc: "Premium matte finish with custom branding options available for enterprise orders. Make a lasting impression at every meeting.", icon: "💼" }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(to bottom, rgba(2, 22, 12, 0.4) 0%, rgba(2, 22, 12, 0.9) 100%)', color: '#f2f2f2', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden', backdropFilter: 'blur(10px)' }}>
      
      <motion.div style={{ scaleX, transformOrigin: '0%', position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: '#3b82f6', zIndex: 2000, boxShadow: '0 0 10px #3b82f6' }} />

      {/* 🌟 CONSISTENT NAV BAR — matches the homepage structure */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(2, 22, 12, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Brand */}
          <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#3b82f6', fontSize: '1.1rem' }}>←</span>
            <span>Data Ocean</span>
          </Link>

          {/* Nav links — same as homepage */}
          <nav style={{ display: 'flex', gap: '22px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/#ai" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI Governance</Link>
            <Link to="/#services" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SAP Services</Link>
            <Link to="/#nfc" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Digital Products</Link>
            <Link to="/#contact" style={{ color: '#a3e4ff', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Us</Link>
          </nav>

          {/* Buy Now CTA */}
          <motion.a whileTap={{ scale: 0.95 }} href="#order" style={{ padding: '10px 22px', backgroundColor: '#3b82f6', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>Buy Now</motion.a>
        </div>
      </div>

      <div style={{ height: '70px' }} />

      <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ display: 'flex', flexWrap: 'wrap', padding: '40px 20px 80px 20px', gap: '40px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div variants={fadeInUp} style={{ flex: '1 1 400px' }}>
          <motion.h1 variants={textRevealContainer} style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#3b82f6', marginBottom: '20px', lineHeight: '1.1' }}>
            <motion.span variants={textRevealItem} style={{ display: 'inline-block' }}>Elevate</motion.span>{' '}
            <motion.span variants={textRevealItem} style={{ display: 'inline-block' }}>Your</motion.span>{' '}
            <motion.span variants={textRevealItem} style={{ display: 'inline-block' }}>First</motion.span>{' '}
            <motion.span variants={textRevealItem} style={{ display: 'inline-block' }}>Impression</motion.span>{' '}
            <motion.span variants={textRevealItem} style={{ display: 'inline-block' }}>with</motion.span>{' '}
            <motion.span variants={textRevealItem} style={{ display: 'inline-block' }}>Smart</motion.span>{' '}
            <motion.span variants={textRevealItem} style={{ display: 'inline-block' }}>NFC</motion.span>{' '}
            <motion.span variants={textRevealItem} style={{ display: 'inline-block' }}>Cards</motion.span>
          </motion.h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#a3e4ff', marginBottom: '30px', lineHeight: '1.6' }}>
            Stop handing out paper cards that get thrown away. Our premium, programmable NFC business cards let you share your entire digital portfolio, social media, and contact details with a single tap.
          </p>
          <motion.a whileTap={{ scale: 0.95 }} href="#order" style={{ display: 'inline-block', padding: '18px 40px', backgroundColor: '#3b82f6', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none', borderRadius: '8px', boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}>Order Your Card Now</motion.a>
          <p style={{ color: '#a3e4ff', marginTop: '15px', fontSize: '0.85rem' }}>Free shipping worldwide. Global delivery available.</p>
        </motion.div>
        
        <motion.div variants={fadeInUp} style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Card3D 
              imageUrl={cardOptions[selectedCard].img} 
              cardColor={cardOptions[selectedCard].color} 
              scrollProgress={scrollProgress}
              burstTrigger={burstTrigger}
              onFirstInteraction={handleCardInteraction}
            />

            <AnimatePresence>
              {showSwipeHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'absolute', bottom: 'calc(50% - 15px)', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 18px',
                    borderRadius: '30px', background: 'rgba(2, 22, 12, 0.85)',
                    border: '1px solid rgba(59, 130, 246, 0.5)', backdropFilter: 'blur(8px)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)', pointerEvents: 'none', zIndex: 20, whiteSpace: 'nowrap',
                  }}
                >
                  <motion.span animate={{ x: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ color: '#3b82f6', fontSize: '1rem', fontWeight: 'bold' }}>←</motion.span>
                  <span style={{ color: '#ffffff', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Swipe to rotate</span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ color: '#3b82f6', fontSize: '1rem', fontWeight: 'bold' }}>→</motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', maxWidth: '500px', margin: '20px auto 0 auto' }}>
            {cardOptions.map((card, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSelectCard(index)}
                title={card.name}
                style={{
                  width: 'clamp(28px, 5vw, 35px)', height: 'clamp(28px, 5vw, 35px)',
                  borderRadius: '50%', backgroundColor: card.color,
                  border: selectedCard === index ? '3px solid #3b82f6' : '2px solid rgba(255,255,255,0.3)',
                  cursor: 'pointer', boxShadow: selectedCard === index ? '0 0 15px #3b82f6' : 'none', transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
          <p style={{ color: '#a3e4ff', marginTop: '15px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            Selected: {cardOptions[selectedCard].name}
          </p>
        </motion.div>
      </motion.div>

      <MarqueeBanner />

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} style={{ padding: '60px 20px' }}>
        <motion.h2 variants={fadeInUp} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#3b82f6', textAlign: 'center', marginBottom: '40px' }}>Why Choose Our NFC Cards?</motion.h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '40px', maxWidth: '900px', margin: '0 auto 40px auto' }}>
          {features.map((feature, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveFeature(index)}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '12px 24px', borderRadius: '30px', border: '1px solid #3b82f6',
                background: activeFeature === index ? '#3b82f6' : 'rgba(59, 130, 246, 0.1)',
                color: activeFeature === index ? '#fff' : '#a3e4ff', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '0.9rem'
              }}
            >
              {feature.title}
            </motion.button>
          ))}
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              style={{ background: 'rgba(2, 22, 12, 0.6)', border: '1px solid #3b82f6', borderRadius: '20px', padding: '30px', textAlign: 'center', boxShadow: '0 0 30px rgba(59, 130, 246, 0.1)' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{features[activeFeature].icon}</div>
              <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: '#ffffff', marginBottom: '15px' }}>{features[activeFeature].title}</h3>
              <p style={{ color: '#a3e4ff', lineHeight: '1.6', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>{features[activeFeature].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} style={{ padding: '60px 20px' }}>
        <motion.h2 variants={fadeInUp} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#3b82f6', textAlign: 'center', marginBottom: '40px' }}>Trusted by Professionals</motion.h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div variants={fadeInUp} style={{ padding: '25px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.4)', flex: '1 1 300px' }}>
            <p style={{ color: '#a3e4ff', fontStyle: 'italic', marginBottom: '20px', fontSize: '0.95rem' }}>"This card has completely transformed how I network at conferences. I just tap and my whole portfolio opens up."</p>
            <p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.95rem' }}>— Sarah L., Tech Consultant</p>
          </motion.div>
          <motion.div variants={fadeInUp} style={{ padding: '25px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.4)', flex: '1 1 300px' }}>
            <p style={{ color: '#a3e4ff', fontStyle: 'italic', marginBottom: '20px', fontSize: '0.95rem' }}>"I love that I can update my contact details without ordering a new card. It's the ultimate eco-friendly business tool."</p>
            <p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.95rem' }}>— Michael R., Startup Founder</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div id="order" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} style={{ padding: '60px 20px', textAlign: 'center' }}>
        <motion.h2 variants={fadeInUp} style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: '#3b82f6', marginBottom: '20px' }}>Ready to Upgrade Your Network?</motion.h2>
        <motion.p variants={fadeInUp} style={{ fontSize: '1.1rem', color: '#a3e4ff', marginBottom: '40px' }}>Get your smart NFC card today.</motion.p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ width: '100%', background: 'rgba(59, 130, 246, 0.1)', padding: '25px', borderRadius: '12px', border: '1px solid #3b82f6' }}>
            <label style={{ color: '#ffffff', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 'bold' }}>
              <span>Number of Cards:</span><span style={{ color: '#3b82f6' }}>{quantity}</span>
            </label>
            <input type="range" min="1" max="50" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a3e4ff', fontSize: '0.8rem', marginTop: '10px' }}><span>1</span><span>25</span><span>50</span></div>
          </div>
          <motion.div key={quantity} initial={{ scale: 0.95, opacity: 0.8 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ display: 'inline-block', padding: '40px 30px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '20px', border: '2px solid #3b82f6', width: '100%', boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
            <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '10px' }}>Standard Card</h3>
            <p style={{ color: '#3b82f6', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>${totalPrice}</p>
            <p style={{ color: '#a3e4ff', marginBottom: '20px', fontSize: '0.85rem' }}>(${basePrice} per card)</p>
            <ul style={{ listStyle: 'none', padding: 0, color: '#a3e4ff', marginBottom: '30px', textAlign: 'left', display: 'inline-block', fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '10px' }}>✔ Custom Digital Profile Setup</li>
              <li style={{ marginBottom: '10px' }}>✔ Premium Matte Finish</li>
              <li style={{ marginBottom: '10px' }}>✔ Unlimited Taps</li>
              <li style={{ marginBottom: '10px' }}>✔ 1-Year Warranty</li>
            </ul>
            <br />
            <motion.a whileTap={{ scale: 0.95 }} href={`mailto:connect@dataoceanai.io?subject=Order%20NFC%20Card&body=I%20would%20like%20to%20order%20${quantity}%20NFC%20card(s)%20of%20the%20${cardOptions[selectedCard].name}%20variant%20for%20$${totalPrice}.`} style={{ display: 'inline-block', padding: '15px 30px', backgroundColor: '#3b82f6', color: '#fff', fontWeight: 'bold', textDecoration: 'none', borderRadius: '8px', width: '100%' }}>Order via Email</motion.a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <motion.h2 variants={fadeInUp} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#3b82f6', textAlign: 'center', marginBottom: '40px' }}>Frequently Asked Questions</motion.h2>
        <FaqItem question="Does it work with both iPhone and Android?" answer="Yes! Our NFC cards are universally compatible with all modern smartphones, including iPhones (iOS 14+) and Android devices. No app is required for the person receiving your card." />
        <FaqItem question="Can I reuse the card if I change my phone number?" answer="Absolutely. The card is rewritable. You can update your digital profile (phone number, email, social media links) as many times as you want without needing a new physical card." />
        <FaqItem question="How do I customize my digital profile?" answer="Once you receive your card, we will send you a link to our easy-to-use dashboard where you can upload your photo, logo, and contact information. It takes less than 5 minutes to set up." />
        <FaqItem question="Do you offer custom branding for businesses?" answer="Yes, we offer enterprise packages with custom logo printing and bulk pricing. Please contact us directly at connect@dataoceanai.io for a quote." />
      </motion.div>

      <footer style={{ padding: '40px 20px', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}>
        <p style={{ color: '#a3e4ff', marginBottom: '10px', fontSize: '0.9rem' }}>Data Ocean © 2026. All rights reserved.</p>
        <p style={{ color: '#a3e4ff', fontSize: '0.85rem' }}><a href="mailto:connect@dataoceanai.io" style={{ color: '#3b82f6', textDecoration: 'none' }}>connect@dataoceanai.io</a></p>
      </footer>

    </div>
  );
}
