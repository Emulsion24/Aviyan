"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Home, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleHome = () => {
    router.push('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-block bg-gradient-to-br from-orange-400 to-yellow-500 p-6 rounded-3xl shadow-2xl mb-4 transform hover:scale-105 transition-transform">
       <Image
                  src="/logo.jpg"
                  alt="गौ सम्मान लोगो"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                  priority
                />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            गौ सम्मान आह्वान
          </h1>
          <p className="text-gray-600 font-medium">Admin Login Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-orange-100 animate-slideUp">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg">
              <LogIn size={24} className="text-white" />
            </div>
            Login to Dashboard
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-xl mb-6 flex items-center gap-3 animate-shake">
              <span className="text-xl">❌</span>
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-xl mb-6 flex items-center gap-3 animate-slideIn">
              <span className="text-xl">✓</span>
              <span className="font-semibold">{success}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-gray-50 focus:bg-white shadow-sm"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-gray-50 focus:bg-white shadow-sm"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !formData.email || !formData.password}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login to Dashboard
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-semibold">OR</span>
              </div>
            </div>

            {/* Home Button */}
            <button
              type="button"
              onClick={handleHome}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-gray-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              <Home size={20} />
              Back to Home
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm animate-fadeIn">
          <p>© 2024 Gau Samman Aahwan Abhiyan. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}