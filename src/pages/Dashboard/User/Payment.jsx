import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [processing, setProcessing] = useState(false);
    const queryClient = useQueryClient();

    const { data: order, isLoading, isError } = useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            // Use state if available to skip fetch or provide fallback
            if (location.state?.order) return location.state.order;

            // Fallback to API if state missing (e.g. page refresh)
            // Ensure the endpoint exists on backend or handle error gracefully
            try {
                const res = await axiosSecure.get(`/order/${id}`);
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        initialData: location.state?.order
    });

    const handlePayment = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const paymentInfo = {
            orderId: id,
            transactionId: "ORD-" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000),
            amount: order?.totalPrice,
            price: order?.totalPrice, // added for compatibility
            deliveryCharge: order?.deliveryCharge || 0,
            bookTitle: order?.bookTitle || order?.bookId?.title,
            bookImage: order?.bookImage || order?.bookId?.image,
            bookId: typeof order.bookId === 'object' ? order.bookId._id : order.bookId,
            quantity: order?.quantity || 1,
            currency: "USD",
            email: order?.email || order?.userEmail,
            date: new Date(),
            payment_status: 'paid',
            status: 'paid'
        };

        try {
            // 1. Save payment info
            await axiosSecure.post('/payment', paymentInfo);

            // 2. Update order status
            await axiosSecure.patch(`/order/${id}`, {
                payment_status: 'paid',
                status: 'paid' // sync legacy status
            });

            // 3. Stock update is now handled by the server in /payment endpoint for security

            toast.success('Payment Successful!');
            queryClient.invalidateQueries(['my-orders']);
            queryClient.invalidateQueries(['payments']);
            queryClient.invalidateQueries(['all-books']);
            queryClient.invalidateQueries(['my-books']);
            navigate('/dashboard/my-orders');
        } catch (err) {
            console.error(err);
            toast.error('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-accent-gold"></span>
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Order Not Found</h2>
                <div className="text-center">
                    <p className="mb-4 text-gray-600">We couldn't load the order details.</p>
                    <button onClick={() => navigate('/dashboard/my-orders')} className="btn btn-primary">Go to My Orders</button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-11/12 max-w-4xl mx-auto py-12">
            <h2 className="text-3xl font-serif font-bold text-text-main mb-8 text-center">Secure Checkout</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-bg-body p-6 rounded-xl border border-card-border h-fit">
                    <h3 className="text-lg font-bold text-text-main mb-4 border-b pb-2">Order Summary</h3>
                    <div className="flex gap-4 mb-4">
                        <img
                            src={order.bookImage || order.bookId?.image || "https://placehold.co/150x200/f9fafb/374151?text=No+Image"}
                            alt="Book Cover"
                            className="w-20 h-28 object-cover rounded shadow-sm"
                        />
                        <div>
                            <p className="font-bold text-text-main">{order.bookTitle || order.bookId?.title}</p>
                            <p className="text-sm text-text-muted">Qty: {order.quantity}</p>
                            <p className="text-sm text-text-muted italic">Return After: <span className="font-semibold text-accent-gold">{order.returnDays || 7} Days</span></p>
                            <p className="text-sm text-text-muted">Status: <span className="uppercase font-semibold">{order.status}</span></p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm text-text-muted">
                            <span>Book Price ({order.quantity}x)</span>
                            <span>${((order.price || order.totalPrice - (order.deliveryCharge || 0)) * order.quantity).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-text-muted">
                            <span>Delivery Charge</span>
                            <span>${(order.deliveryCharge || 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold pt-4 border-t border-card-border">
                            <span className="text-text-main">Total Amount</span>
                            <span className="text-accent-gold">${order.totalPrice?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Form (Simulated) */}
                <div className="bg-bg-card p-6 rounded-xl shadow-lg border border-card-border">
                    <h3 className="text-lg font-bold text-text-main mb-6">Payment Details (Simulated)</h3>
                    <form onSubmit={handlePayment} className="space-y-4">
                        <div className="form-control">
                            <label className="label text-xs uppercase font-bold text-text-muted">Card Holder Name</label>
                            <input type="text" placeholder="John Doe" required className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label text-xs uppercase font-bold text-text-muted">Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required className="input input-bordered w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-xs uppercase font-bold text-text-muted">Expiry Date</label>
                                <input type="text" placeholder="MM/YY" maxLength="5" required className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs uppercase font-bold text-text-muted">CVC</label>
                                <input type="text" placeholder="123" maxLength="3" required className="input input-bordered w-full" />
                            </div>
                        </div>

                        <div className="alert alert-info text-xs mt-4">
                            <i className="fa-solid fa-circle-info"></i>
                            <span>This is a simulated payment. No real money will be deducted.</span>
                        </div>

                        <button
                            type="submit"
                            disabled={processing || order.status === 'paid'}
                            className="btn-primary w-full py-3 rounded-lg text-lg font-bold mt-6 shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30 disabled:opacity-50"
                        >
                            {processing ? <span className="loading loading-spinner"></span> : `Pay $${order.totalPrice?.toFixed(2)}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;
