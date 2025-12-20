import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Review State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/book/${id}`);
      return res.data;
    },
  });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image,
      userEmail: user.email,
      email: user.email,
      userId: user.uid,
      userName: user.displayName,
      phone,
      address,
      quantity,
      totalPrice: book.price * quantity,
      status: 'pending',
      orderDate: new Date().toISOString()
    };

    try {
      await axiosSecure.post('/order', orderData);
      toast.success("Order placed successfully!");
      setIsModalOpen(false);
      // Optional: reduce stock here or let backend handle it
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  // Wishlist Logic
  const {
    data: wishlist = [],
    refetch: refetchWishlist,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const wishlistItem = wishlist.find(item => (item.bookId?._id === id) || (item.bookId === id));
  const isInWishlist = !!wishlistItem;

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      if (isInWishlist) {
        await axiosSecure.delete(`/wishlist/${wishlistItem._id}`);
        toast.success("Removed from wishlist");
      } else {
        const wishData = {
          email: user.email,
          bookId: id,
          title: book.title, // Fallback if populate fails
          image: book.image,
          price: book.price,
          author: book.author
        };
        await axiosSecure.post('/wishlist', wishData);
        toast.success("Added to wishlist");
      }
      refetchWishlist();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update wishlist");
    }
  };

  // Reviews Logic
  const {
    data: reviews = [],
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      // Assuming there is an endpoint to fetch reviews by book ID
      // If not, we might need to filter client-side from a general endpoint, 
      // but let's try a specific query parameter first
      try {
        const res = await axiosPublic.get(`/reviews?bookId=${id}`);
        return res.data;
      } catch (error) {
        return [];
      }
    },
  });

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      navigate("/login");
      return;
    }

    const reviewData = {
      bookId: book._id, // Using Object ID
      bookIdString: id, // Fallback if backend needs string match
      userId: user.uid,
      userName: user.displayName,
      userImage: user.photoURL,
      rating: parseInt(reviewRating),
      comment: reviewComment,
      status: "approved",
      helpful: {
        count: 0,
        users: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await axiosSecure.post('/review', reviewData);
      toast.success("Review submitted successfully!");
      setReviewComment("");
      setReviewRating(5);
      refetchReviews();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-accent-gold"></span>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Book not found</h2>
        <Link to="/" className="btn-primary rounded-full">
          Return Home
        </Link>
      </div>
    );
  }

  const renderRating = () => {
    const ratingVal =
      typeof book.rating === "object" ? book.rating.average : book.rating;
    const ratingCount = typeof book.rating === "object" ? book.rating.count : 0;

    return (
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center text-orange-400 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fa-star ${i < Math.floor(ratingVal) ? "fa-solid" : "fa-regular"
                } text-sm`}
            ></i>
          ))}
        </div>
        <span className="text-text-muted text-sm font-medium">
          ({ratingVal || 0})
        </span>
        {ratingCount > 0 && (
          <span className="text-text-muted text-sm border-l border-gray-300 pl-2 ml-1">
            {ratingCount} reviews
          </span>
        )}
      </div>
    );
  };

  const handleQuantityChange = (type) => {
    if (type === "inc" && quantity < book.stock)
      setQuantity((prev) => prev + 1);
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <section className="w-11/12 max-w-[1200px] mx-auto py-8 sm:py-12 md:py-16 relative">
      <div className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-text-muted mb-8 flex flex-wrap gap-2 items-center">
        <Link to="/" className="hover:text-accent-gold transition-colors">Home</Link>
        <i className="fa-solid fa-chevron-right text-[8px] opacity-30"></i>
        <Link to="/books" className="hover:text-accent-gold transition-colors">Books</Link>
        <i className="fa-solid fa-chevron-right text-[8px] opacity-30"></i>
        <span className="text-text-main truncate max-w-[150px] sm:max-w-none">{book.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start mb-16">
        <div className="bg-[#F8F5F2] rounded-2xl p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-[100px] -mr-8 -mt-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-gold/5 rounded-tr-[80px] -ml-4 -mb-4"></div>

          <img
            src={book.image}
            alt={book.title}
            className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:rotate-2"
          />
        </div>

        <div className="flex flex-col h-full">
          {book.category && (
            <span className="bg-accent-gold/10 text-accent-gold text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-wider">
              {book.category}
            </span>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] leading-tight font-bold text-text-main mb-2">
            {book.title}
          </h1>

          <p className="text-lg text-text-muted font-medium mb-3">
            By <span className="text-text-main">{book.author}</span>
          </p>

          {renderRating()}

          <div className="flex items-center gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-accent-gold">
                ${book.price}
              </span>
              {book.discount && book.discount > 0 && (
                <span className="text-text-muted line-through text-lg">
                  ${book.price + book.discount}
                </span>
              )}
            </div>
            {book.stock > 0 ? (
              <div className="badge badge-success badge-outline gap-1 font-medium">
                <i className="fa-solid fa-check text-xs"></i> Available
              </div>
            ) : (
              <div className="badge badge-error badge-outline gap-1 font-medium">
                <i className="fa-solid fa-xmark text-xs"></i> Unavailable
              </div>
            )}
          </div>

          <div className="mb-6 sm:mb-8">
            <p className="text-text-muted leading-relaxed text-[0.95rem] sm:text-[1rem]">
              {book.description}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-lg px-2 h-[50px] w-fit">
                <button
                  onClick={() => handleQuantityChange("dec")}
                  className="w-8 h-full flex items-center justify-center text-text-muted hover:text-text-main disabled:opacity-30"
                  disabled={quantity <= 1}
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <span className="w-10 text-center font-bold text-text-main">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("inc")}
                  className="w-8 h-full flex items-center justify-center text-text-muted hover:text-text-main disabled:opacity-30"
                  disabled={quantity >= book.stock}
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={book.stock <= 0}
                className="btn-primary flex-1 justify-center rounded-lg h-[50px] shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-bolt"></i> Order Now
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`h-[50px] px-6 rounded-lg border font-bold transition-all ${isInWishlist
                  ? "border-red-500 bg-red-50 text-red-500 hover:bg-red-100"
                  : "border-gray-200 hover:border-black text-text-main"
                  }`}
              >
                <i className={`${isInWishlist ? "fa-solid text-red-500" : "fa-regular"} fa-heart`}></i>
              </button>
            </div>

            {book.delivery && (
              <div className="bg-[#f9f9f9] rounded-xl p-4 sm:p-5 flex flex-col gap-3 text-sm">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-truck-fast text-accent-gold mt-0.5"></i>
                  <div>
                    <p className="font-bold text-text-main mb-0.5">
                      Standard Delivery
                    </p>
                    <p className="text-text-muted text-xs">
                      {book.delivery.deliveryTimeDays
                        ? `Estimated ${book.delivery.deliveryTimeDays} days`
                        : "3-5 business days"}
                      •{" "}
                      {book.delivery.deliveryCharge > 0
                        ? `$${book.delivery.deliveryCharge}`
                        : "Free"}
                    </p>
                  </div>
                </div>
                {book.delivery.availableCities &&
                  book.delivery.availableCities.length > 0 && (
                    <div className="flex items-start gap-3 pt-2 border-t border-gray-200/50">
                      <i className="fa-solid fa-location-dot text-accent-gold mt-0.5"></i>
                      <div>
                        <p className="font-bold text-text-main mb-0.5">
                          Available In
                        </p>
                        <p className="text-text-muted text-xs">
                          {book.delivery.availableCities.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            )}

            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {book.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-text-muted px-2.5 py-1 rounded hover:bg-gray-200 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-[800px] border-t border-gray-100 pt-12">
        <h3 className="text-2xl font-serif font-bold text-text-main mb-8">Customer Reviews</h3>

        {/* Add Review Form */}
        {user ? (
          <div className="bg-gray-50 p-6 rounded-xl mb-10 border border-gray-100">
            <h4 className="text-lg font-bold text-text-main mb-4">Write a Review</h4>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-muted mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`text-2xl transition-colors ${reviewRating >= star ? "text-orange-400" : "text-gray-300"}`}
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-muted mb-2">Comment</label>
                <textarea
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="textarea textarea-bordered w-full h-32 focus:outline-none focus:border-accent-gold rounded-lg"
                  placeholder="Share your thoughts about this book..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary px-6 py-2.5 rounded-lg text-sm font-bold shadow-md">
                Submit Review
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-xl mb-10 border border-gray-100 text-center">
            <p className="text-text-muted mb-4">Please log in to write a review.</p>
            <Link to="/login" className="btn-primary px-6 py-2.5 rounded-lg text-sm font-bold">Log In</Link>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-text-muted italic">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id || Math.random()} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={review.userImage || "https://via.placeholder.com/40"}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-text-main text-sm">{review.userName || "Anonymous User"}</h5>
                    <p className="text-xs text-text-muted">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-orange-400 text-xs mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star ${i < (review.rating || 0) ? "fa-solid" : "fa-regular"}`}
                    ></i>
                  ))}
                </div>
                <p className="text-text-muted text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>


      {/* Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-text-main">Place Order</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-xs uppercase font-bold text-text-muted">Name</label>
                  <input type="text" value={user?.displayName || ""} disabled className="input input-bordered w-full bg-gray-50" />
                </div>
                <div className="form-control">
                  <label className="label text-xs uppercase font-bold text-text-muted">Email</label>
                  <input type="email" value={user?.email || ""} disabled className="input input-bordered w-full bg-gray-50" />
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs uppercase font-bold text-text-muted">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  className="input input-bordered w-full focus:input-primary"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label text-xs uppercase font-bold text-text-muted">Shipping Address</label>
                <textarea
                  required
                  placeholder="Enter your full address"
                  className="textarea textarea-bordered w-full h-24 focus:textarea-primary resize-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center text-sm font-medium text-text-main">
                <span>Quantity: {quantity}</span>
                <span>Total: <span className="text-accent-gold font-bold text-lg">${(book.price * quantity).toFixed(2)}</span></span>
              </div>

              <button type="submit" className="btn-primary w-full py-3 rounded-lg text-lg font-bold shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30 mt-4">
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default BookDetails;

