import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    // Future API Integration Here
    console.log("Password reset requested for:", email);

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        {!submitted ? (
          <>
            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800">
                Forgot Password
              </h1>

              <p className="text-slate-500 mt-2">
                Enter your registered email to receive password reset
                instructions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center">
              <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />

              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Reset Link Sent
              </h2>

              <p className="text-slate-500 mb-6">
                A password reset link has been sent to:
              </p>

              <p className="font-semibold text-slate-700 mb-8">{email}</p>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Return to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
