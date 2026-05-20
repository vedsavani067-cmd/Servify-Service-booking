import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [featuredServices, setFeaturedServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const { data } = await api.get('/services?limit=4');
                setFeaturedServices(data);
            } catch (error) {
                console.error('Error fetching recommended services', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecent();
    }, []);

    const getImageUrl = (service) => {
        if (service.image) {
            if (service.image.startsWith('http')) return service.image;
            return `http://localhost:5001${service.image.startsWith('/') ? '' : '/'}${service.image.replace(/\\/g, '/')}`;
        }
        const seed = service.category ? service.category.replace(/\s+/g, '') : 'service';
        return `https://picsum.photos/seed/${seed}/800/500`;
    };

    const dummySlides = [
        {
            title: 'Expert Plumbing Solutions',
            desc: 'Book verified local plumbers for instant repairs and full maintenance.',
            tag: 'PLUMBING',
            btn: 'Explore Plumbers',
            img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop',
            accent: 'rgba(6,182,212,0.6)',
        },
        {
            title: 'Licensed Electricians',
            desc: 'Safe, reliable electrical services with certified, background-checked pros.',
            tag: 'ELECTRICAL',
            btn: 'Find Electricians',
            img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1600&auto=format&fit=crop',
            accent: 'rgba(245,158,11,0.6)',
        },
        {
            title: 'Deep Cleaning Experts',
            desc: 'Come home to a spotless space — rated 5 stars by thousands of homeowners.',
            tag: 'CLEANING',
            btn: 'Book Cleaners',
            img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
            accent: 'rgba(16,185,129,0.6)',
        },
        {
            title: 'Professional Tutoring',
            desc: 'Accelerate learning with certified private tutors at your convenience.',
            tag: 'EDUCATION',
            btn: 'Find Tutors',
            img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop',
            accent: 'rgba(99,102,241,0.6)',
        },
    ];

    const categories = [
        { name: 'Plumbing',    icon: 'bi-droplet-fill',      grad: 'linear-gradient(135deg,#06B6D4,#0EA5E9)', count: '120+ pros' },
        { name: 'Electrical',  icon: 'bi-lightning-charge-fill', grad: 'linear-gradient(135deg,#F59E0B,#EF4444)', count: '95+ pros' },
        { name: 'Cleaning',    icon: 'bi-stars',              grad: 'linear-gradient(135deg,#10B981,#34D399)', count: '200+ pros' },
        { name: 'Tutoring',    icon: 'bi-book-fill',          grad: 'linear-gradient(135deg,#6366F1,#8B5CF6)', count: '80+ pros' },
        { name: 'Salon',       icon: 'bi-scissors',           grad: 'linear-gradient(135deg,#EC4899,#F43F5E)', count: '60+ pros' },
        { name: 'AC Repair',   icon: 'bi-wind',               grad: 'linear-gradient(135deg,#0EA5E9,#6366F1)', count: '70+ pros' },
        { name: 'Carpentry',   icon: 'bi-tools',              grad: 'linear-gradient(135deg,#F97316,#F59E0B)', count: '50+ pros' },
        { name: 'Painting',    icon: 'bi-brush-fill',         grad: 'linear-gradient(135deg,#8B5CF6,#EC4899)', count: '45+ pros' },
    ];

    const howItWorks = [
        {
            step: '01',
            title: 'Find Real Pros',
            desc: 'Browse hundreds of highly-rated local experts, filtered by skill and category.',
            icon: 'bi-search-heart-fill',
            grad: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
        },
        {
            step: '02',
            title: 'Book Instantly',
            desc: 'Pick your preferred time slot and confirm your booking with a single tap.',
            icon: 'bi-calendar-check-fill',
            grad: 'linear-gradient(135deg,#06B6D4,#0EA5E9)',
        },
        {
            step: '03',
            title: 'Relax & Rate',
            desc: 'Sit back while certified professionals complete the job, then leave a review.',
            icon: 'bi-star-fill',
            grad: 'linear-gradient(135deg,#F59E0B,#F97316)',
        },
    ];

    const stats = [
        { number: '10K+', label: 'Happy Customers' },
        { number: '720+', label: 'Verified Pros' },
        { number: '4.9★', label: 'Average Rating' },
        { number: '15+', label: 'Service Types' },
    ];

    return (
        <div className="container-fluid p-0">

            {/* ── HERO CAROUSEL ── */}
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '72vh', background: 'var(--bg-dark)' }}>
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} />
                </div>
            ) : (
                <div
                    id="heroCarousel"
                    className="carousel slide hero-section"
                    data-bs-ride="carousel"
                    data-bs-interval="4000"
                    data-bs-pause="false"
                    style={{ height: '72vh', minHeight: '600px' }}
                >
                    <div className="carousel-indicators">
                        {dummySlides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                data-bs-target="#heroCarousel"
                                data-bs-slide-to={i}
                                className={i === 0 ? 'active' : ''}
                                style={{ width: '32px', height: '4px', borderRadius: '2px', opacity: i === 0 ? 1 : 0.4 }}
                            />
                        ))}
                    </div>

                    <div className="carousel-inner h-100">
                        {dummySlides.map((slide, i) => (
                            <div key={i} className={`carousel-item h-100 ${i === 0 ? 'active' : ''}`}>
                                <div
                                    className="w-100 h-100 position-relative"
                                    style={{
                                        backgroundImage: `url('${slide.img}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    {/* Dark overlay + coloured accent */}
                                    <div className="position-absolute w-100 h-100"
                                        style={{ background: `linear-gradient(120deg, rgba(2,6,23,0.93) 0%, rgba(2,6,23,0.6) 60%, ${slide.accent} 100%)` }}
                                    />
                                    {/* Left glow blob */}
                                    <div className="position-absolute" style={{ inset: 0, background: 'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(99,102,241,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

                                    <div className="container h-100 position-relative" style={{ zIndex: 3 }}>
                                        <div className="row h-100 align-items-center">
                                            <div className="col-lg-7 text-white fade-up">
                                                <span className="badge px-3 py-2 mb-3 text-uppercase"
                                                    style={{ background: 'rgba(99,102,241,0.35)', border: '1px solid rgba(165,180,252,0.5)', letterSpacing: '3px', fontSize: '0.7rem' }}>
                                                    {slide.tag}
                                                </span>
                                                <h1 className="fw-bold text-white mb-3" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.4)' }}>
                                                    {slide.title}
                                                </h1>
                                                <p className="fs-5 mb-4" style={{ opacity: 0.8, maxWidth: '520px', lineHeight: 1.7 }}>
                                                    {slide.desc}
                                                </p>
                                                <div className="d-flex gap-3 flex-wrap">
                                                    {user ? (
                                                        <Link to={user.role === 'provider' ? '/provider' : '/dashboard'}
                                                            className="btn btn-primary btn-lg rounded-pill px-5 fw-bold">
                                                            My Dashboard
                                                        </Link>
                                                    ) : (
                                                        <Link to="/register"
                                                            className="btn btn-primary btn-lg rounded-pill px-5 fw-bold">
                                                            Get Started Free
                                                        </Link>
                                                    )}
                                                    <Link to="/services"
                                                        className="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold backdrop-blur">
                                                        {slide.btn}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" style={{ width: '6%' }}>
                        <span className="carousel-control-prev-icon" />
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" style={{ width: '6%' }}>
                        <span className="carousel-control-next-icon" />
                    </button>
                </div>
            )}

            {/* ── STATS BAND (dark) ── */}
            <div className="section-gradient py-5">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {stats.map((s, i) => (
                            <div key={i} className="col-6 col-md-3">
                                <div className="stat-card">
                                    <div className="stat-number">{s.number}</div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── SERVICE CATEGORIES (tinted) ── */}
            <div className="section-tinted py-5">
                <div className="container py-3">
                    <div className="text-center mb-5">
                        <span className="badge px-3 py-2 mb-3" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', fontSize: '0.75rem', letterSpacing: '2px' }}>CATEGORIES</span>
                        <h2 className="fw-bold">Browse by Service</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '480px' }}>
                            Whatever you need fixed, cleaned, or built — we have trusted local experts ready.
                        </p>
                    </div>

                    <div className="row g-3">
                        {categories.map((cat, i) => (
                            <div key={i} className="col-6 col-sm-4 col-md-3">
                                <Link to={`/services?category=${cat.name}`} className="text-decoration-none">
                                    <div className="card text-center py-4 px-2 h-100 service-card-hover border-0 rounded-4"
                                        style={{ cursor: 'pointer' }}>
                                        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-3"
                                            style={{ width: '56px', height: '56px', background: cat.grad, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>
                                            <i className={`bi ${cat.icon} text-white`} style={{ fontSize: '1.5rem' }} />
                                        </div>
                                        <h6 className="fw-bold mb-1" style={{ color: 'var(--text-heading)', fontSize: '0.95rem' }}>{cat.name}</h6>
                                        <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{cat.count}</small>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RECENTLY ADDED PROFESSIONALS (white) ── */}
            <div className="section-white py-5">
                <div className="container py-3">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div>
                            <span className="badge px-3 py-2 mb-2" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', fontSize: '0.75rem', letterSpacing: '2px' }}>NEW PROFESSIONALS</span>
                            <h2 className="fw-bold mb-1">Recently Added Experts</h2>
                            <p className="text-muted mb-0">Book the latest verified professionals in your area</p>
                        </div>
                        <Link to="/services" className="btn btn-outline-primary rounded-pill px-4 fw-bold d-none d-md-inline-flex">
                            View All <i className="bi bi-arrow-right ms-1" />
                        </Link>
                    </div>

                    <div className="row g-4">
                        {featuredServices.length === 0 ? (
                            <div className="col-12">
                                <div className="text-center py-5 rounded-4" style={{ background: 'var(--bg-subtle)', border: '2px dashed var(--border)' }}>
                                    <i className="bi bi-person-badge mb-3" style={{ fontSize: '3rem', color: 'var(--text-light)' }} />
                                    <h5 className="text-muted">No professionals listed yet</h5>
                                    <p className="text-muted small mb-0">Check back soon or be the first to register as a provider.</p>
                                </div>
                            </div>
                        ) : (
                            featuredServices.map(service => (
                                <div key={service._id} className="col-sm-6 col-lg-3">
                                    <div className="card h-100 product-card rounded-4 border-0 shadow-sm">
                                        {/* Image */}
                                        <div className="overflow-hidden position-relative" style={{ height: '195px', borderRadius: '16px 16px 0 0' }}>
                                            <div className="w-100 h-100 d-flex align-items-center justify-content-center"
                                                style={{
                                                    background: 'var(--bg-subtle)',
                                                    transition: 'transform 0.7s ease',
                                                }}
                                            >
                                                <h1 className="display-1 mb-0" style={{ transform: 'scale(1.2)', opacity: 0.9 }}>
                                                    {service.category === 'electrician' ? '⚡' : service.category === 'plumber' ? '🔧' : service.category === 'cleaner' ? '🧹' : service.category === 'tutor' ? '📚' : service.category === 'ac repair' ? '❄️' : '🛋️'}
                                                </h1>
                                            </div>
                                            <div className="position-absolute top-0 start-0 m-2">
                                                <span className="badge text-uppercase px-2 py-1 text-white" style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(6px)', fontSize: '0.68rem', letterSpacing: '1px' }}>
                                                    {service.category}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Body */}
                                        <div className="card-body p-4 d-flex flex-column">
                                            {/* Provider chip */}
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <div className="provider-avatar">{service.providerId?.name?.charAt(0) || 'P'}</div>
                                                <div>
                                                    <div className="fw-bold lh-1" style={{ fontSize: '0.9rem', color: 'var(--text-heading)' }}>
                                                        {service.providerId?.name || 'Professional'}
                                                    </div>
                                                    <small style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>✓ Verified Expert</small>
                                                </div>
                                            </div>
                                            <h6 className="fw-bold mb-1 text-truncate" style={{ color: 'var(--text-heading)' }}>{service.title}</h6>
                                            <p className="small mb-4" style={{
                                                color: 'var(--text-muted)',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}>
                                                {service.description}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center mt-auto pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                                <span className="fw-bold fs-5" style={{ color: 'var(--primary)' }}>Rs. {service.price}</span>
                                                <Link to={`/services/${service._id}`} className="btn btn-primary btn-sm rounded-pill px-3 fw-bold">
                                                    Book Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="text-center mt-4 d-md-none">
                        <Link to="/services" className="btn btn-outline-primary rounded-pill px-4 fw-bold">
                            View All Services
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── HOW IT WORKS (dark gradient) ── */}
            <div className="section-gradient py-5" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* decorative blobs */}
                <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(99,102,241,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(6,182,212,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />

                <div className="container py-4 position-relative">
                    <div className="text-center mb-5">
                        <span className="badge px-3 py-2 mb-3" style={{ background: 'rgba(165,180,252,0.2)', color: '#A5B4FC', fontSize: '0.75rem', letterSpacing: '2px', border: '1px solid rgba(165,180,252,0.3)' }}>HOW IT WORKS</span>
                        <h2 className="fw-bold text-white">Three Simple Steps</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '440px', margin: '0 auto' }}>
                            Book a trusted local professional in under 2 minutes.
                        </p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {howItWorks.map((step, i) => (
                            <div key={i} className="col-md-4">
                                <div className="how-card h-100 text-center py-5 px-4">
                                    <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-4"
                                        style={{ width: '68px', height: '68px', background: step.grad, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                                        <i className={`bi ${step.icon} text-white`} style={{ fontSize: '1.8rem' }} />
                                    </div>
                                    <span style={{ color: '#A5B4FC', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '3px', opacity: 0.8 }}>STEP {step.step}</span>
                                    <h4 className="fw-bold mt-2 mb-3" style={{ color: '#ffffff' }}>{step.title}</h4>
                                    <p style={{ color: 'rgba(203, 213, 225, 0.85)', marginBottom: 0, lineHeight: 1.8, fontSize: '0.94rem' }}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── ABOUT (tinted) ── */}
            <div className="section-tinted py-5">
                <div className="container py-4">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <span className="badge px-3 py-2 mb-3" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', fontSize: '0.75rem', letterSpacing: '2px' }}>ABOUT SERVIFY</span>
                            <h2 className="fw-bold mb-4">Built to Bridge the Gap Between You &amp; Trusted Professionals</h2>
                            <p className="mb-4" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                                Servify was built with one vision: make it effortless to find, vet, and hire skilled
                                local professionals. Every provider on our platform is background-checked and reviewed
                                by real customers.
                            </p>
                            <div className="row g-3 mb-4">
                                {[
                                    { icon: 'bi-shield-check-fill', label: 'Background Checked', color: 'var(--primary)' },
                                    { icon: 'bi-award-fill',        label: 'Quality Guaranteed', color: 'var(--accent)' },
                                    { icon: 'bi-headset',           label: '24/7 Support',       color: 'var(--success)' },
                                ].map((f, i) => (
                                    <div key={i} className="col-auto">
                                        <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                                            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
                                            <i className={`bi ${f.icon}`} style={{ color: f.color, fontSize: '1rem' }} />
                                            <span className="fw-semibold" style={{ fontSize: '0.88rem', color: 'var(--text-heading)' }}>{f.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/register" className="btn btn-primary rounded-pill px-5 fw-bold">Join for Free</Link>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative rounded-4 p-1 shadow-lg" style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
                                    alt="Servify Team"
                                    className="img-fluid rounded-4"
                                    style={{ filter: 'brightness(0.92) contrast(1.05)', display: 'block' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
