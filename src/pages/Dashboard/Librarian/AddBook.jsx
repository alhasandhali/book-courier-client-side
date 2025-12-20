import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const AddBook = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const bookData = {
            ...data,
            price: parseFloat(data.price),
            quantity: parseInt(data.quantity),
            stock: parseInt(data.quantity), // assuming initial stock is same as quantity
            addedBy: user?.email,
            rating: 0,
            createdAt: new Date().toISOString(),
        };

        try {
            await axiosSecure.post("/book", bookData);
            toast.success("Book added successfully");
            reset();
            navigate("/dashboard/my-books");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add book");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-3xl font-serif font-bold text-text-main mb-6">
                Add New Book
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">
                            Book Title
                        </label>
                        <input
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            placeholder="Enter book title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                        />
                        {errors.title && (
                            <span className="text-red-500 text-xs text-left w-full mt-1 font-medium">
                                {errors.title.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">
                            Author Name
                        </label>
                        <input
                            type="text"
                            {...register("author", { required: "Author is required" })}
                            placeholder="Enter author name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                        />
                        {errors.author && (
                            <span className="text-red-500 text-xs text-left w-full mt-1 font-medium">
                                {errors.author.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">
                            Category
                        </label>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Biography">Biography</option>
                            <option value="History">History</option>
                        </select>
                        {errors.category && (
                            <span className="text-red-500 text-xs text-left w-full mt-1 font-medium">
                                {errors.category.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">
                            Status
                        </label>
                        <select
                            {...register("status")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                        >
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("price", {
                                required: "Price is required",
                                min: 0,
                            })}
                            placeholder="0.00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                        />
                        {errors.price && (
                            <span className="text-red-500 text-xs text-left w-full mt-1 font-medium">
                                {errors.price.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            {...register("quantity", {
                                required: "Quantity is required",
                                min: 1,
                            })}
                            placeholder="1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                        />
                        {errors.quantity && (
                            <span className="text-red-500 text-xs text-left w-full mt-1 font-medium">
                                {errors.quantity.message}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                        Book Cover URL
                    </label>
                    <input
                        type="url"
                        {...register("image", { required: "Image URL is required" })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                    />
                    {errors.image && (
                        <span className="text-red-500 text-xs text-left w-full mt-1 font-medium">
                            {errors.image.message}
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                        Description
                    </label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        rows="4"
                        placeholder="Book synopsis..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                    ></textarea>
                    {errors.description && (
                        <span className="text-red-500 text-xs text-left w-full mt-1 font-medium">
                            {errors.description.message}
                        </span>
                    )}
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-text-muted hover:bg-gray-50 font-medium"
                        onClick={() => reset()}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-accent-gold text-white rounded-lg font-semibold hover:bg-accent-gold/90 shadow-md"
                    >
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;
