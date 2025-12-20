import React, { useState, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";


const Invoices = () => {
    const { user } = useAuth();
    const axiosPublic = useAxios();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosPublic.get(`/payments?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const filteredPayments = payments.filter(payment =>
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.bookTitle && payment.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handlePrint = (invoice) => {
        setSelectedInvoice(invoice);
        // Allow state to update then print
        setTimeout(() => {
            window.print();
            setSelectedInvoice(null);
        }, 100);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-accent-gold"></span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-serif font-bold text-text-main">Invoices & History</h2>
                <div className="relative w-full sm:w-72">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                        type="text"
                        placeholder="Search transaction or book..."
                        className="input input-bordered w-full pl-10 focus:input-primary rounded-lg bg-bg-body text-text-main border-card-border"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-hidden bg-bg-card rounded-xl shadow-sm border border-card-border">
                <table className="table w-full">
                    <thead className="bg-bg-body text-text-muted uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="py-5 pl-6">Reference ID</th>
                            <th className="py-5">Date</th>
                            <th className="py-5">Product Details</th>
                            <th className="py-5 text-right">Amount</th>
                            <th className="py-5 text-center">Status</th>
                            <th className="py-5 pr-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border">
                        {filteredPayments.map(payment => (
                            <tr key={payment._id} className="hover:bg-bg-body/60 transition-colors">
                                <td className="pl-6 font-mono text-xs font-semibold text-gray-500">
                                    {payment.transactionId}
                                </td>
                                <td className="text-sm font-medium text-text-main">
                                    {new Date(payment.date).toLocaleDateString()}
                                    <br />
                                    <span className="text-xs text-text-muted">{new Date(payment.date).toLocaleTimeString()}</span>
                                </td>
                                <td>
                                    <div className="font-bold text-text-main text-sm">{payment.bookTitle || "Book Title Unavailable"}</div>
                                    <div className="text-xs text-text-muted">Qty: 1</div>
                                </td>
                                <td className="text-right font-bold text-text-main">
                                    ${payment.price.toFixed(2)}
                                </td>
                                <td className="text-center">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                        <i className="fa-solid fa-check"></i> Paid
                                    </span>
                                </td>
                                <td className="pr-6 text-right">
                                    <button
                                        onClick={() => handlePrint(payment)}
                                        className="btn btn-sm btn-ghost hover:bg-gray-100 text-text-muted hover:text-text-main gap-2"
                                    >
                                        <i className="fa-solid fa-print"></i> Print
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {filteredPayments.map(payment => (
                    <div key={payment._id} className="bg-bg-card p-5 rounded-xl border border-card-border shadow-sm space-y-4">
                        <div className="flex justify-between items-start border-b border-gray-50 pb-3">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Reference ID</p>
                                <p className="font-mono text-xs font-bold text-gray-600">{payment.transactionId}</p>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 uppercase">
                                Paid
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date</p>
                                <p className="text-xs font-semibold text-text-main">{new Date(payment.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Amount</p>
                                <p className="text-sm font-bold text-accent-gold">${payment.price.toFixed(2)}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Book</p>
                            <p className="text-xs font-bold text-text-main line-clamp-1">{payment.bookTitle}</p>
                        </div>

                        <button
                            onClick={() => handlePrint(payment)}
                            className="w-full py-2.5 bg-bg-body text-text-main rounded-lg text-xs font-bold flex items-center justify-center gap-2 border border-card-border hover:bg-bg-body/80 transition-colors"
                        >
                            <i className="fa-solid fa-print"></i> Print Invoice
                        </button>
                    </div>
                ))}
            </div>

            {filteredPayments.length === 0 && (
                <div className="p-12 text-center bg-bg-card rounded-xl border border-card-border mt-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <i className="fa-solid fa-file-invoice text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-text-main mb-1">No invoices found</h3>
                    <p className="text-text-muted">Try adjusting your search filters.</p>
                </div>
            )}

            {/* Printable Invoice Template - Hidden from screen, shown when printing */}
            {selectedInvoice && (
                <div className="printable-invoice hidden print:block fixed inset-0 bg-white z-[9999] p-8">
                    <style>{`
                        @media print {
                            body * {
                                visibility: hidden;
                            }
                            .printable-invoice, .printable-invoice * {
                                visibility: visible;
                            }
                            .printable-invoice {
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                            }
                        }
                    `}</style>
                    <div className="max-w-3xl mx-auto border border-gray-200 p-8 rounded-lg">
                        <div className="flex justify-between items-start mb-12 border-b border-gray-100 pb-8">
                            <div>
                                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">INVOICE</h1>
                                <p className="text-gray-500 font-mono text-sm">#{selectedInvoice.transactionId}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="font-bold text-xl text-gray-900">Book Courier</h3>
                                <p className="text-gray-500 text-sm mt-1">123 Book Street<br />Literature City, LC 45678</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Bill To</h4>
                                <p className="font-bold text-gray-900">{user?.displayName || "Valued Customer"}</p>
                                <p className="text-gray-600 text-sm">{selectedInvoice.email}</p>
                            </div>
                            <div className="text-right">
                                <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Invoice Details</h4>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-end gap-4">
                                        <span className="text-gray-500">Date:</span>
                                        <span className="font-medium text-gray-900">{new Date(selectedInvoice.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <span className="text-gray-500">Status:</span>
                                        <span className="font-medium text-green-600">Paid</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <table className="w-full mb-12">
                            <thead className="border-b-2 border-gray-900">
                                <tr>
                                    <th className="text-left py-3 font-bold text-gray-900">Description</th>
                                    <th className="text-right py-3 font-bold text-gray-900">Quantity</th>
                                    <th className="text-right py-3 font-bold text-gray-900">Price</th>
                                    <th className="text-right py-3 font-bold text-gray-900">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="py-4 font-medium text-gray-900">{selectedInvoice.bookTitle}</td>
                                    <td className="py-4 text-right text-gray-600">1</td>
                                    <td className="py-4 text-right text-gray-600">${selectedInvoice.price.toFixed(2)}</td>
                                    <td className="py-4 text-right font-bold text-gray-900">${selectedInvoice.price.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end border-t border-gray-200 pt-6">
                            <div className="w-64">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-medium text-gray-900">${selectedInvoice.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200 pb-4 mb-4">
                                    <span className="text-gray-500">Tax (0%)</span>
                                    <span className="font-medium text-gray-900">$0.00</span>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold">
                                    <span className="text-gray-900">Total</span>
                                    <span className="text-accent-gold">${selectedInvoice.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 text-center pt-8 border-t border-gray-100">
                            <p className="text-gray-400 text-sm">Thank you for your business!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoices;
