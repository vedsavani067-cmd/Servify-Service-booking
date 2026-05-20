import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';

const CustomerDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [cancelModal, setCancelModal] = useState({ isOpen: false, id: null });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await api.get('/bookings/my');
                setBookings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const promptCancel = (id) => {
        setCancelModal({ isOpen: true, id });
    };

    const handleCancel = async () => {
        const id = cancelModal.id;
        try {
            await api.patch(`/bookings/${id}/cancel`);
            setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
        } catch (error) {
            alert('Failed to cancel booking');
        }
        setCancelModal({ isOpen: false, id: null });
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'warning';
            case 'confirmed': return 'primary';
            case 'completed': return 'success';
            case 'cancelled': return 'danger';
            default: return 'secondary';
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-bold">My Dashboard</h2>
            
            <div className="row mb-5">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 border-start border-primary border-4 rounded-3 h-100 bg-white">
                        <div className="card-body py-4">
                            <h6 className="text-muted fw-bold text-uppercase mb-2">Total Bookings</h6>
                            <h2 className="mb-0 fw-bold">{bookings.length}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 border-start border-warning border-4 rounded-3 h-100 bg-white">
                        <div className="card-body py-4">
                            <h6 className="text-muted fw-bold text-uppercase mb-2">Pending</h6>
                            <h2 className="mb-0 fw-bold">{bookings.filter(b => b.status === 'pending').length}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-4 py-3 border-0">Service</th>
                                    <th className="py-3 border-0">Date & Time</th>
                                    <th className="py-3 border-0">Provider</th>
                                    <th className="py-3 border-0">Status</th>
                                    <th className="py-3 text-end px-4 border-0">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center py-5 text-muted">No bookings found</td></tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr key={booking._id}>
                                            <td className="px-4 py-3">
                                                <div className="fw-semibold">{booking.serviceId?.title || 'Unknown Service'}</div>
                                                <div className="small text-muted">Rs. {booking.totalAmount}</div>
                                            </td>
                                            <td className="py-3">
                                                <div>{new Date(booking.bookingDate).toLocaleDateString()}</div>
                                                <div className="small text-muted">{booking.slot}</div>
                                            </td>
                                            <td className="py-3">{booking.providerId?.name || 'Unknown Provider'}</td>
                                            <td className="py-3">
                                                <span className={`badge ${getStatusColor(booking.status) === 'primary' ? 'bg-primary text-white' : `bg-${getStatusColor(booking.status)} bg-opacity-10 text-${getStatusColor(booking.status)}`} rounded-pill px-3 py-2 text-uppercase`} style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="py-3 text-end px-4">
                                                {booking.status === 'pending' && (
                                                    <button onClick={() => promptCancel(booking._id)} className="btn btn-sm btn-outline-danger rounded-pill px-3 shadow-sm">Cancel</button>
                                                )}
                                                {booking.status === 'completed' && (
                                                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3 shadow-sm">Review</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={cancelModal.isOpen}
                onClose={() => setCancelModal({ isOpen: false, id: null })}
                onConfirm={handleCancel}
                title="Cancel Booking"
                message="Are you sure you want to cancel this booking? This action cannot be undone."
                confirmText="Yes, Cancel"
                confirmStyle="danger"
            />
        </div>
    );
};

export default CustomerDashboard;
