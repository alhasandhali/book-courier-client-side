import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const UpdateBook = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const imageFile = watch('image');

    // Fetch book details
    const { data: bookData, isLoading } = useQuery({
        queryKey: ["book", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/book/${id}`);
            return res.data;
        },
    });

    // Populate form when data is loaded
    useEffect(() => {
        if (bookData) {
            const formattedData = {
                ...bookData,
                tags: bookData.tags ? bookData.tags.join(', ') : '',
                availableCities: bookData.delivery?.availableCities ? bookData.delivery.availableCities.join(', ') : '',
                deliveryTimeDays: bookData.delivery?.deliveryTimeDays,
                deliveryCharge: bookData.delivery?.deliveryCharge,
                // Handle rating if needed, but it's usually calculated
            };

            // Set image preview
            if (bookData.image) {
                setImagePreview(bookData.image);
            }

            reset(formattedData);
        }
    }, [bookData, reset]);

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            let imageUrl = bookData.image; // Default to existing image

            // Check if a new image file is selected
            if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
                const formData = new FormData();
                formData.append('image', data.image[0]);
                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting}`, formData);
                imageUrl = imgRes.data.data.url;
            }

            // Parse comma-separated strings to arrays
            const tagsArray = data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
            const citiesArray = data.availableCities ? data.availableCities.split(',').map(city => city.trim()).filter(city => city) : [];

            const updateData = {
                title: data.title,
                slug: data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                author: data.author,
                description: data.description,
                image: imageUrl,
                language: data.language,
                category: data.category,
                tags: tagsArray,
                price: parseFloat(data.price),
                discount: parseInt(data.discount) || 0,
                status: data.status,
                visibility: data.visibility || "public",
                stock: parseInt(data.stock),
                minStockAlert: parseInt(data.minStockAlert) || 5,
                delivery: {
                    availableCities: citiesArray,
                    deliveryTimeDays: parseInt(data.deliveryTimeDays) || 3,
                    deliveryCharge: parseFloat(data.deliveryCharge) || 0
                },
                seo: { keywords: tagsArray },
                updatedAt: new Date().toISOString(),
            };

            await axiosSecure.patch(`/book/${id}`, updateData);
            toast.success("Book updated successfully");
            navigate("/dashboard/my-books");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update book");
        } finally {
            setSubmitting(false);
        }
    };

    // Update image preview when a new file is selected
    useEffect(() => {
        if (imageFile && imageFile.length > 0 && imageFile[0] instanceof File) {
            const reader = new FileReader();
            reader.onload = e => setImagePreview(e.target.result);
            reader.readAsDataURL(imageFile[0]);
        }
    }, [imageFile]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-accent-gold"></span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-bg-card p-8 rounded-xl shadow-md border border-card-border">
            <h2 className="text-3xl font-serif font-bold text-text-main mb-6">
                Update Book: {bookData?.title}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-text-main mb-1">Book Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            placeholder="All the Light We Cannot See"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                        {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-text-main mb-1">Author Name</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            {...register("author", { required: "Author is required" })}
                            placeholder="Anthony Doerr"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                        {errors.author && <span className="text-red-500 text-xs mt-1">{errors.author.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-text-main mb-1">Category</label>
                        <select
                            id="category"
                            name="category"
                            {...register("category", { required: "Category is required" })}
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        >
                            <option value="">Select Category</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Biography">Biography</option>
                            <option value="History">History</option>
                            <option value="Romance">Romance</option>
                            <option value="Classic">Classic</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                        {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-text-main mb-1">Language</label>
                        <input
                            id="language"
                            name="language"
                            type="text"
                            {...register("language", { required: "Language is required" })}
                            placeholder="English"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                        {errors.language && <span className="text-red-500 text-xs mt-1">{errors.language.message}</span>}
                    </div>
                </div>

                {/* Status & Visibility */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-text-main mb-1">Status</label>
                        <select
                            id="status"
                            name="status"
                            {...register("status")}
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        >
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="visibility" className="block text-sm font-medium text-text-main mb-1">Visibility</label>
                        <select
                            id="visibility"
                            name="visibility"
                            {...register("visibility")}
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </div>

                {/* Pricing & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-text-main mb-1">Price ($)</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            {...register("price", { required: "Required", min: 0 })}
                            placeholder="0.00"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                        {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="discount" className="block text-sm font-medium text-text-main mb-1">Discount (%)</label>
                        <input
                            id="discount"
                            name="discount"
                            type="number"
                            {...register("discount", { min: 0, max: 100 })}
                            placeholder="0"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-text-main mb-1">Stock</label>
                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            {...register("stock", { required: "Required", min: 0 })}
                            placeholder="12"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                        {errors.stock && <span className="text-red-500 text-xs mt-1">{errors.stock.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="minStockAlert" className="block text-sm font-medium text-text-main mb-1">Min Stock Alert</label>
                        <input
                            id="minStockAlert"
                            name="minStockAlert"
                            type="number"
                            {...register("minStockAlert", { min: 1 })}
                            placeholder="5"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-text-main mb-1">Tags (comma separated)</label>
                    <input
                        id="tags"
                        name="tags"
                        type="text"
                        {...register("tags")}
                        placeholder="romance, classic, bestseller"
                        className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                    />
                </div>

                {/* Delivery Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="deliveryTimeDays" className="block text-sm font-medium text-text-main mb-1">Delivery Time (Days)</label>
                        <input
                            id="deliveryTimeDays"
                            name="deliveryTimeDays"
                            type="number"
                            {...register("deliveryTimeDays", { min: 1 })}
                            placeholder="3"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                    </div>
                    <div>
                        <label htmlFor="deliveryCharge" className="block text-sm font-medium text-text-main mb-1">Delivery Charge ($)</label>
                        <input
                            id="deliveryCharge"
                            name="deliveryCharge"
                            type="number"
                            step="0.01"
                            {...register("deliveryCharge", { min: 0 })}
                            placeholder="0"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                    </div>
                    <div>
                        <label htmlFor="availableCities" className="block text-sm font-medium text-text-main mb-1">Avail. Cities (comma sep)</label>
                        <input
                            id="availableCities"
                            name="availableCities"
                            type="text"
                            {...register("availableCities")}
                            placeholder="Austin, Dallas"
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label htmlFor="bookImage" className="block text-sm font-medium text-text-main mb-1">Book Cover Image</label>
                    {/* Note: validation is less strict here for 'required' because we have a default */}
                    <input
                        id="bookImage"
                        name="image"
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        {...register("image", {
                            validate: {
                                fileSize: files => !files || !files[0] || files[0].size <= 5 * 1024 * 1024 || "File size must be less than 5MB",
                                fileType: files => !files || !files[0] || ["image/jpeg", "image/png", "image/jpg"].includes(files[0].type) || "Only JPG, JPEG, PNG allowed",
                            },
                        })}
                        className={`w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main`}
                    />
                    <p className="text-xs text-text-muted mt-1">Leave blank to keep current image.</p>
                    {imagePreview && (
                        <div className="mt-2">
                            <img src={imagePreview} alt="Preview" className="h-32 object-cover rounded" />
                        </div>
                    )}
                    {errors.image && <span className="text-red-500 text-xs mt-1">{errors.image.message}</span>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text-main mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        {...register("description", { required: "Description is required" })}
                        rows="4"
                        placeholder="Book synopsis..."
                        className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main"
                    ></textarea>
                    {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-6 py-2 border border-card-border rounded-lg text-text-muted hover:bg-bg-body font-medium"
                        onClick={() => navigate("/dashboard/my-books")}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2 bg-accent-gold text-white rounded-lg font-semibold hover:bg-accent-gold/90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Updating...
                            </span>
                        ) : (
                            "Update Book"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBook;
