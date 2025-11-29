import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

// --- CUSTOM HOOKS ---
const useFadeInAnimation = () => {
    const observerRef = useRef(null);
    const observe = useCallback((node) => {
        if (node) {
            if (!observerRef.current) {
                observerRef.current = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observerRef.current.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
            }
            observerRef.current.observe(node);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, []);
    return observe;
};

// --- COMPONENTS ---

const Header = ({ activePage, onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'solutions', label: 'Solutions' },
        { id: 'enrichment', label: 'Enrichment' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <nav className="flex justify-between items-center py-4">
                    <div className="nav-logo" onClick={() => onNavigate('solutions')}>
                        NMBK
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex" style={{ gap: '2rem' }}>
                        {navItems.map(item => (
                            <div 
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu md:hidden">
                    {navItems.map(item => (
                        <div 
                            key={item.id}
                            onClick={() => { onNavigate(item.id); setIsMenuOpen(false); }}
                            className={`block py-3 px-6 font-semibold cursor-pointer ${activePage === item.id ? 'text-teal-600 bg-teal-50' : 'text-gray-600'}`}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
};

const HeroBackground = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;
        const container = containerRef.current;
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x111827, 0.002);

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        camera.position.z = 5;

        // Particles
        const geometry = new THREE.BufferGeometry();
        const count = 2500;
        const posArray = new Float32Array(count * 3);
        for(let i=0; i<count * 3; i++) posArray[i] = (Math.random() - 0.5) * 20;
        
        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({
            size: 0.03,
            color: 0x2dd4bf,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            particles.rotation.y += 0.0003;
            particles.rotation.x += 0.0001;
            const time = Date.now() * 0.0001;
            scene.rotation.z = Math.sin(time) * 0.05;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!container) return;
            const newW = container.offsetWidth;
            const newH = container.offsetHeight;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <canvas ref={canvasRef} id="hero-canvas" />
            <div className="hero-overlay"></div>
        </div>
    );
};

const SolutionsSection = ({ registerFadeIn }) => {
    const services = [
        { id: 1, title: "Web Development", desc: "Responsive, scalable architectures built with React and Next.js.", icon: "💻" },
        { id: 2, title: "Mobile Apps", desc: "Native iOS & Android ecosystems for seamless user experiences.", icon: "📱" },
        { id: 3, title: "Cloud Systems", desc: "Secure AWS & Azure infrastructure for enterprise scalability.", icon: "☁️" }
    ];

    return (
        <section>
            <div className="hero-wrapper">
                <HeroBackground />
                <div ref={registerFadeIn} className="hero-content fade-up">
                    <span className="hero-badge">Digital Transformation</span>
                    <h1 className="hero-title">Architecting <br/><span className="text-gradient">The Future</span></h1>
                    <p className="hero-desc">We build sophisticated software solutions that drive enterprise evolution and digital growth.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary">Get Started</button>
                        <button className="btn btn-outline">Learn More</button>
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-title">Core Capabilities</h2>
                        <p className="section-subtitle">Comprehensive technological suites designed to propel modern businesses forward.</p>
                    </div>
                    <div className="grid-3">
                        {services.map((s, index) => (
                            <div key={s.id} ref={registerFadeIn} className="card fade-up" style={{ transitionDelay: `${index * 150}ms` }}>
                                <div className="card-content">
                                    <div className="card-icon-wrapper">{s.icon}</div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{s.title}</h3>
                                    <p style={{ color: '#6b7280' }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const EnrichmentSection = ({ registerFadeIn }) => {
    const [activeBg, setActiveBg] = useState('');

    const activities = [
        { 
            id: 1, 
            title: "Yoga & Wellness", 
            img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
            desc: "Find balance and inner peace." 
        },
        { 
            id: 2, 
            title: "Bharatnatyam", 
            img: "https://images.unsplash.com/photo-1621335824967-24AC02190534?q=80&w=800&auto=format&fit=crop", 
            desc: "Express through movement." 
        },
        { 
            id: 3, 
            title: "Bhajan", 
            img: "https://images.unsplash.com/photo-1525203135335-74d272fc8d9c?q=80&w=800&auto=format&fit=crop", 
            desc: "Spiritual devotion through music." 
        }
    ];

    return (
        <section className="section section-gray">
            {/* Background Image Transition */}
            <div 
                className={`enrichment-bg ${activeBg ? 'active' : ''}`} 
                style={{ backgroundImage: `url(${activeBg})` }}
            ></div>

            <div className="container enrichment-content">
                <div className="text-center">
                    <h2 className="section-title">Cultural Enrichment</h2>
                    <p className="section-subtitle">Fostering creativity and holistic well-being through the power of arts.</p>
                </div>
                <div className="grid-3">
                    {activities.map((a, index) => (
                        <div 
                            key={a.id} 
                            ref={registerFadeIn} 
                            className="card fade-up" 
                            style={{ transitionDelay: `${index * 150}ms` }}
                            onMouseEnter={() => setActiveBg(a.img)}
                            onMouseLeave={() => setActiveBg('')}
                        >
                            <div className="card-image-wrapper">
                                <img src={a.img} alt={a.title} className="card-img" />
                            </div>
                            <div className="card-content">
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{a.title}</h3>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{a.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ContactSection = ({ registerFadeIn }) => {
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section className="section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-subtitle">Start your digital transformation today.</p>
                </div>

                <div className="contact-wrapper">
                    <div ref={registerFadeIn} className="fade-up">
                        <div className="info-item">
                            <span className="info-icon">📍</span>
                            <div>
                                <h4 style={{ fontWeight: 'bold' }}>Headquarters</h4>
                                <p style={{ color: '#6b7280' }}>123 Innovation Dr, Tech City</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">📧</span>
                            <div>
                                <h4 style={{ fontWeight: 'bold' }}>Email Us</h4>
                                <p style={{ color: '#6b7280' }}>hello@nmbk.tech</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">📞</span>
                            <div>
                                <h4 style={{ fontWeight: 'bold' }}>Call Us</h4>
                                <p style={{ color: '#6b7280' }}>+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>

                    <div ref={registerFadeIn} className="glass-form fade-up" style={{ transitionDelay: '200ms' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-input" placeholder=" " required />
                                <label className="form-label">Full Name</label>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-input" placeholder=" " required />
                                <label className="form-label">Email Address</label>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-input" placeholder=" " required />
                                <label className="form-label">Message</label>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status !== 'idle'}>
                                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function App() {
    const [currentPage, setCurrentPage] = useState('solutions');
    const [isLoading, setIsLoading] = useState(true);
    const registerFadeIn = useFadeInAnimation();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigate = (page) => {
        if (page === currentPage) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
    };

    return (
        <>
            <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
                <div className="loader-text">
                    {['N','M','B','K'].map((char, i) => (
                        <span key={i} style={{ animationDelay: `${i * 100}ms` }}>{char}</span>
                    ))}
                </div>
            </div>

            <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 1s ease' }}>
                <Header activePage={currentPage} onNavigate={handleNavigate} />
                <main>
                    {currentPage === 'solutions' && <SolutionsSection registerFadeIn={registerFadeIn} />}
                    {currentPage === 'enrichment' && <EnrichmentSection registerFadeIn={registerFadeIn} />}
                    {currentPage === 'contact' && <ContactSection registerFadeIn={registerFadeIn} />}
                </main>
                <footer style={{ background: '#111827', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
                    <div className="container">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>NMBK</h2>
                        <p style={{ opacity: 0.5 }}>&copy; 2025 NMBK Technologies. All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}