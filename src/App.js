import React, { useState, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { 
  FaWhatsapp, FaChartLine, FaUsers, FaHandshake, 
  FaQuoteLeft, FaFacebook, FaTwitter, 
  FaLinkedin, FaInstagram, FaLaptop, FaMobileAlt, 
  FaCheck, FaTimes
} from 'react-icons/fa';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f9f9f9;
  }
  h1, h2, h3, h4, h5, h6 {
    color: #2d3436;
  }
`;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  overflow-x: hidden;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 15px 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  a {
    color: #6c5ce7;
    text-decoration: none;
    font-weight: 600;
    margin: 0 15px;
    transition: all 0.3s;
    position: relative;
    
    &:hover {
      color: #4a3bd1;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 50%;
      background-color: #6c5ce7;
      transition: all 0.3s ease;
    }

    &:hover::after {
      width: 100%;
      left: 0;
    }
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #6c5ce7;
  cursor: pointer;
`;
const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 150px 10% 50px;
  background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
  color: white;
`;

const DeviceVisualization = styled.div`
  position: relative;
  width: 50%;
  height: 500px;
  perspective: 1500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeviceCard = styled.div`
  position: absolute;
  width: 85%;
  height: 300px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.5s;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: ${props => props.laptop 
    ? 'rotate3d(1, -1, 0, 15deg) translateX(-10%)' 
    : 'rotate3d(1, 1, 0, -15deg) translateX(10%)'};

  &:hover {
    transform: scale(1.05);
  }
`;

const Button = styled.button`
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    background: #4a3bd1;
    transform: translateY(-5px);
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #6c5ce7;
  margin-bottom: 50px;
  font-size: 36px;
  animation: ${fadeIn} 1s ease-in;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BenefitCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PricingCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const Footer = styled.footer`
  background: #2d3436;
  color: white;
  padding: 50px 20px;
  text-align: center;
  margin-top: 100px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  a {
    color: white;
    font-size: 24px;
    transition: color 0.3s;

    &:hover {
      color: #6c5ce7;
    }
  }
`;

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // References for smooth scrolling
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Smooth scroll function
  const scrollToSection = (elementRef) => {
    elementRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookDemo = (plan = null) => {
    const phoneNumber = '+919322434882';
    const message = plan 
      ? `I'm interested in the ${plan} plan for NEST CRM` 
      : 'I want to book a demo for NEST CRM';
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setModalVisible(false);
  };


  return (
    <>
    <GlobalStyle />
    <Container>
      <Header>
        <Nav>
          <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            NEST CRM
          </Logo>
          <div>
            <a href="#features" onClick={(e) => {
              e.preventDefault();
              scrollToSection(featuresRef);
            }}>Features</a>
            <a href="#pricing" onClick={(e) => {
              e.preventDefault();
              scrollToSection(pricingRef);
            }}>Pricing</a>
            <a href="#testimonials" onClick={(e) => {
              e.preventDefault();
              scrollToSection(testimonialsRef);
            }}>Testimonials</a>
          </div>
        </Nav>
      </Header>
        <HeroSection>
          <div style={{width: '45%'}}>
            <h1 style={{fontSize: '48px', marginBottom: '20px'}}>
              Transform Real Estate Sales
            </h1>
            <p style={{fontSize: '18px', marginBottom: '30px'}}>
              Intelligent CRM Solutions Designed for Modern Realtors
            </p>
            <Button onClick={() => handleBookDemo()}>
              <FaWhatsapp /> Book Free Demo
            </Button>
          </div>

          <DeviceVisualization>
            <DeviceCard laptop>
              <FaLaptop size={80} />
              <h3 style={{marginTop: '20px'}}>Desktop Dashboard</h3>
              <p>Comprehensive Lead Management</p>
            </DeviceCard>
            <DeviceCard style={{top: '250px', right: 0}}>
              <FaMobileAlt size={80} />
              <h3 style={{marginTop: '20px'}}>Mobile Insights</h3>
              <p>On-the-Go Business Intelligence</p>
            </DeviceCard>
          </DeviceVisualization>
        </HeroSection>

        {/* Why Choose NEST CRM Section */}
        <section ref={featuresRef} style={{padding: '100px 10%', background: '#f9f9f9'}}>          <SectionTitle>Why Choose NEST CRM?</SectionTitle>
          <BenefitsGrid>
            {[
              {icon: FaChartLine, title: '10x Lead Generation', desc: 'Advanced tracking and conversion tools'},
              {icon: FaUsers, title: '5x Site Visit Increase', desc: 'Intelligent client engagement strategies'},
              {icon: FaHandshake, title: '3x Booking Rate', desc: 'Streamlined communication workflows'}
            ].map(({icon: Icon, title, desc}) => (
              <BenefitCard key={title}>
                <Icon size={60} color="#6c5ce7" style={{marginBottom: '20px'}}/>
                <h3 style={{color: '#6c5ce7', marginBottom: '15px'}}>{title}</h3>
                <p>{desc}</p>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </section>

        {/* How Will NEST Help You? Section */}
        <section style={{padding: '100px 10%'}}>
          <SectionTitle>How Will NEST Help You?</SectionTitle>
          <BenefitsGrid>
            {[
              {icon: FaChartLine, title: 'Streamline Operations', desc: 'Automate repetitive tasks and focus on what matters.'},
              {icon: FaUsers, title: 'Enhance Client Relationships', desc: 'Manage client interactions seamlessly.'},
              {icon: FaHandshake, title: 'Boost Sales', desc: 'Close deals faster with actionable insights.'}
            ].map(({icon: Icon, title, desc}) => (
              <BenefitCard key={title}>
                <Icon size={60} color="#6c5ce7" style={{marginBottom: '20px'}}/>
                <h3 style={{color: '#6c5ce7', marginBottom: '15px'}}>{title}</h3>
                <p>{desc}</p>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </section>

        {/* Pricing Plans Section */}
        <section ref={pricingRef} style={{padding: '100px 10%', background: '#f9f9f9'}}>
          <SectionTitle>Pricing Plans</SectionTitle>
          <PricingGrid>
            {[
              {
                title: 'Monthly Plan', 
                price: '₹399', 
                oldPrice: '₹299',
                features: ['10+ Dashboards', 'Basic Analytics']
              },
              {
                title: 'Yearly Plan', 
                price: '₹1999', 
                oldPrice: '₹2000',
                features: ['Advanced Features', 'Priority Support']
              },
              {
                title: 'Enterprise', 
                price: 'Custom', 
                features: ['Unlimited Users', 'Dedicated Manager']
              }
            ].map(plan => (
              <PricingCard key={plan.title}>
                <h3 style={{color: '#6c5ce7', marginBottom: '20px'}}>{plan.title}</h3>
                <p style={{
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  marginBottom: '20px'
                }}>
                  {plan.oldPrice && <span style={{
                    textDecoration: 'line-through', 
                    color: 'gray', 
                    marginRight: '10px'
                  }}>{plan.oldPrice}</span>}
                  {plan.price}
                </p>
                {plan.features.map(feature => (
                  <p key={feature} style={{marginBottom: '10px'}}>
                    {feature}
                  </p>
                ))}
                <Button 
                  style={{margin: '20px auto 0', width: '100%'}}
                  onClick={() => handleBookDemo(plan.title)}
                >
                  Get Started
                </Button>
              </PricingCard>
            ))}
          </PricingGrid>
        </section>
        <section ref={testimonialsRef} style={{padding: '100px 10%', background: '#ffffff'}}>
          <SectionTitle>What Our Clients Say</SectionTitle>
          <PricingGrid>
            {[
              {
                name: 'Sarah Johnson',
                role: 'Real Estate Manager',
                quote: 'NEST CRM transformed our sales process. The insights are incredible!',
                icon: FaQuoteLeft
              },
              {
                name: 'Mark Rodriguez',
                role: 'Sales Director',
                quote: 'Our team\'s productivity increased by 50% after implementing NEST.',
                icon: FaQuoteLeft
              },
              {
                name: 'Emily Chen',
                role: 'Business Owner',
                quote: 'The mobile app is a game-changer for managing leads on the go.',
                icon: FaQuoteLeft
              }
            ].map(testimonial => (
              <PricingCard key={testimonial.name} style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center'
              }}>
                <testimonial.icon size={40} color="#6c5ce7" style={{marginBottom: '20px'}} />
                <p style={{fontStyle: 'italic', marginBottom: '20px'}}>
                  "{testimonial.quote}"
                </p>
                <h4 style={{color: '#6c5ce7', marginBottom: '10px'}}>
                  {testimonial.name}
                </h4>
                <p>{testimonial.role}</p>
              </PricingCard>
            ))}
          </PricingGrid>
        </section>

        {/* Footer Section */}
        <Footer>
          <p>&copy; 2023 NEST CRM. All rights reserved.</p>
          <SocialIcons>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </SocialIcons>
        </Footer>
      </Container>
    </>
  );
};

export default App;