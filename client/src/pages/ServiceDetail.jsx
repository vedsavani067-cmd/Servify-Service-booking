import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const { data } = await api.get(`/services/${id}`);
                setService(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (!service) return <div className="text-center mt-5"><h3>Service not found.</h3></div>;

    const handleBook = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(`/book/${service._id}`, { state: { service } });
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
                        <div className="bg-light py-5 text-center border-bottom">
                             <h1 className="display-1 text-primary mb-0">🛠️</h1>
                        </div>
                        <div className="card-body p-5">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="badge bg-primary text-white text-uppercase rounded-pill px-3 py-2" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>{service.category}</span>
                                <h3 className="fw-bold text-success mb-0">Rs. {service.price}</h3>
                            </div>
                            <h2 className="fw-bold mb-3">{service.title}</h2>
                            <p className="text-muted lead mb-4">{service.description}</p>
                            
                            <hr className="my-4" />
                            
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-light rounded-circle p-3 me-3 text-primary"><i className="bi bi-clock-history"></i></div>
                                        <div>
                                            <p className="text-muted mb-0 small text-uppercase fw-bold">Duration</p>
                                            <p className="fw-semibold mb-0">{service.duration}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-light rounded-circle p-3 me-3 text-primary"><i className="bi bi-geo-alt"></i></div>
                                        <div>
                                            <p className="text-muted mb-0 small text-uppercase fw-bold">Location</p>
                                            <p className="fw-semibold mb-0">{service.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 rounded-4 sticky-top" style={{top: '100px'}}>
                        <div className="card-body p-4">
                            <h4 className="fw-bold mb-4">Provider Information</h4>
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '60px', height: '60px', fontSize: '24px'}}>
                                    {service.providerId?.name?.charAt(0).toUpperCase() || 'P'}
                                </div>
                                <div>
                                    <h5 className="fw-bold mb-1">{service.providerId?.name || 'Unknown Provider'}</h5>
                                    <p className="text-muted small mb-0">Verified Provider ✓</p>
                                </div>
                            </div>
                            <button onClick={handleBook} className="btn btn-primary w-100 btn-lg rounded-pill fw-bold shadow-sm">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
