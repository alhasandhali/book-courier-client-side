import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const Invoices = () => {
    const { user } = useAuth();
    const axiosPublic = useAxios();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosPublic.get(`/payments?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-accent-gold"></span>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-serif font-bold text-text-main mb-6">Invoices</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50 text-text-muted uppercase text-xs font-semibold">
                        <tr>
                            <th className="py-4">Payment ID</th>
                            <th className="py-4">Date</th>
                            <th className="py-4">Book</th>
                            <th className="py-4 text-right">Amount</th>
                            <th className="py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="font-mono text-sm">{payment.transactionId}</td>
                                <td className="text-text-muted">{new Date(payment.date).toLocaleDateString()}</td>
                                <td className="font-medium text-text-main">{payment.bookTitle || "N/A"}</td>
                                <td className="text-right font-bold text-text-main">${payment.price.toFixed(2)}</td>
                                <td>
                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-bold">Paid</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {payments.length === 0 && (
                    <div className="p-8 text-center text-text-muted">
                        No invoices found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Invoices;
