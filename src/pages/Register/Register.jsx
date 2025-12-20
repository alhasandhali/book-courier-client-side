import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";

import { GoogleAuthProvider } from "firebase/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUpWithEmailPass, updateUser, setUser, signInWithGoogle, logOut } =
    useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (!pass) return 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(password);

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-300";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageURL = "https://placehold.co/400";

      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting}`,
          formData
        );

        imageURL = res.data.data.url;
      }

      const result = await signUpWithEmailPass(data.email, data.password);
      const user = result.user;

      await updateUser(user, data.name, imageURL);
      setUser({ ...user, displayName: data.name, photoURL: imageURL });

      const userInfo = {
        name: data.name,
        email: data.email,
        image: imageURL,
        role: "user",
        status: "active",
        passwordHash: "firebase_managed",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
        stats: {
          totalOrders: 0,
          totalSpent: 0,
          wishlistCount: 0,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await axiosPublic.post("/user", userInfo);
      await logOut();

      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithGoogle(googleProvider);
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "user",
        status: "active",
        passwordHash: "google_auth",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
        stats: {
          totalOrders: 0,
          totalSpent: 0,
          wishlistCount: 0,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await axiosPublic.post("/user", userInfo);
      await logOut();

      toast.success("Google Sign-In successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google Sign-In failed.");
    }
  };

  return (
    <div className="min-h-screen bg-bg-body flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="hidden lg:block">
          <div className="bg-linear-to-br from-accent-green/20 to-accent-gold/20 rounded-3xl p-12 backdrop-blur-sm border border-accent-green/20">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-serif font-bold text-text-main mb-4">
              Join BookCourier Today
            </h1>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              Create your account and unlock access to thousands of books with
              fast delivery and exclusive deals.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-accent-green text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-text-main">Free to Join</h3>
                  <p className="text-sm text-text-muted">
                    No hidden fees or charges
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-gift text-accent-gold text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-text-main">
                    Exclusive Offers
                  </h3>
                  <p className="text-sm text-text-muted">
                    Special discounts for members
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-star text-accent-green text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-text-main">
                    Priority Support
                  </h3>
                  <p className="text-sm text-text-muted">
                    24/7 customer assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-bg-card rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-card-border">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-main mb-2">
              Create Account
            </h2>
            <p className="text-text-muted">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-main mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-user text-text-muted"></i>
                </div>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Full Name is required" })}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none bg-bg-body text-text-main ${errors.name ? "border-red-500" : "border-card-border"
                    }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-text-main mb-2"
              >
                Profile Image
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-image text-text-muted"></i>
                </div>
                <input
                  type="file"
                  id="image"
                  accept="image/jpeg, image/png, image/jpg"
                  {...register("image", {
                    required: "Profile image is required",
                    validate: {
                      fileSize: (files) =>
                        !files[0] ||
                        files[0].size <= 5 * 1024 * 1024 ||
                        "File size must be less than 5MB",
                      fileType: (files) =>
                        !files[0] ||
                        ["image/jpeg", "image/png", "image/jpg"].includes(
                          files[0].type
                        ) ||
                        "Only JPG, JPEG, and PNG formats are allowed",
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none bg-bg-body text-text-main file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-gold/10 file:text-accent-gold hover:file:bg-accent-gold/20 ${errors.image ? "border-red-500" : "border-card-border"
                    }`}
                />
              </div>
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-main mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-text-muted"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none bg-bg-body text-text-main ${errors.email ? "border-red-500" : "border-card-border"
                    }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-main mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-text-muted"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 12,
                      message: "Password must be less than 12 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
                      message:
                        "Password must contain uppercase, lowercase, number, and special character",
                    },
                  })}
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none bg-bg-body text-text-main ${errors.password ? "border-red-500" : "border-card-border"
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-main transition-colors"
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${level <= passwordStrength
                          ? getPasswordStrengthColor()
                          : "bg-gray-200"
                          }`}
                      />
                    ))}
                  </div>
                  {passwordStrength > 0 && (
                    <p className="text-xs text-text-muted">
                      Password strength:{" "}
                      <span className="font-medium">
                        {getPasswordStrengthText()}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-text-main mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-text-muted"></i>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === password || "Your passwords do not match",
                  })}
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none bg-bg-body text-text-main ${errors.confirmPassword
                    ? "border-red-500"
                    : "border-card-border"
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-main transition-colors"
                >
                  <i
                    className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                  ></i>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  {...register("agreeToTerms", {
                    required: "You must agree to the terms",
                  })}
                  className="w-4 h-4 mt-1 text-accent-gold rounded focus:ring-accent-gold cursor-pointer"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="text-sm text-text-muted"
                >
                  I agree to the{" "}
                  <Link
                    to="#"
                    className="text-accent-gold hover:text-accent-gold/80 transition-colors font-medium"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="#"
                    className="text-accent-gold hover:text-accent-gold/80 transition-colors font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.agreeToTerms.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-accent-gold to-[#d4a574] text-white py-3.5 rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-card-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-bg-card text-text-muted">
                  Or sign up with
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 bg-bg-body border-2 border-card-border text-text-main py-3 rounded-lg font-semibold hover:bg-bg-body/80 hover:border-accent-gold/50 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </form>
          <p className="mt-8 text-center text-text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent-gold hover:text-accent-gold/80 transition-colors font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
