import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithEmailPass, signInWithGoogle, resetPassword } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const emailValue = watch("email");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedEmail) {
      setValue("email", savedEmail);
      if (savedPassword) {
        setValue("password", savedPassword);
      }
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInWithEmailPass(data.email, data.password);
      if (data.rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
        localStorage.setItem("rememberedPassword", data.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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

      toast.success("Google Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google Login failed.");
    }
  };

  const handleForgotPassword = async () => {
    if (!emailValue) {
      toast.error("Please enter your email address first.");
      return;
    }
    try {
      await resetPassword(emailValue);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="min-h-screen bg-bg-body flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="hidden lg:block">
          <div className="bg-linear-to-br from-accent-gold/20 to-accent-green/20 rounded-3xl p-12 backdrop-blur-sm border border-accent-gold/20">
            <div className="text-6xl mb-6">📚</div>
            <h1 className="text-4xl font-serif font-bold text-text-main mb-4">
              Welcome Back to BookCourier
            </h1>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              Sign in to access your account and continue your reading journey.
              Discover thousands of books delivered right to your doorstep.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-book text-accent-gold text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-text-main">
                    10,000+ Books
                  </h3>
                  <p className="text-sm text-text-muted">
                    Vast collection available
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-shipping-fast text-accent-green text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-text-main">
                    Fast Delivery
                  </h3>
                  <p className="text-sm text-text-muted">Within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-bg-card rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-card-border">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-main mb-2">
              Sign In
            </h2>
            <p className="text-text-muted">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  {...register("email", { required: "Email is required" })}
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
                  })}
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none bg-bg-body text-text-main ${errors.password
                    ? "border-red-500"
                    : "border-card-border"
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
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="rememberMe" className="flex items-center gap-2 cursor-pointer">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 text-accent-gold rounded focus:ring-accent-gold cursor-pointer"
                />
                <span className="text-sm text-text-muted">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-accent-gold hover:text-accent-gold/80 transition-colors font-medium"
              >
                Forgot password?
              </button>
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
                  Logging in...
                </span>
              ) : (
                "Log In"
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
              onClick={handleGoogleLogin}
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
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-accent-gold hover:text-accent-gold/80 transition-colors font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
