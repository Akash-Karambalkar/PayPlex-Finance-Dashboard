import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            PayPlex Finance Dashboard
          </h1>
          <p className="text-slate-300 mt-2">
            Securely manage your financial operations
          </p>
        </div>

        {/* Login Form */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-slate-300">
              <input
                type="checkbox"
                className="mr-2 rounded border-slate-400"
              />
              Remember me
            </label>

            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          © 2026 PayPlex Finance Dashboard
        </p>
      </div>
    </div>
  );
}
