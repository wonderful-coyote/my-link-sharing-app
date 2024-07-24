import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { createClient } from "../../../utils/supabase/client";
import devlinksLogo from "@/assets/Group 251.svg";

const supabase = createClient();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  useEffect(() => {
    if (email) {
      if (!validateEmail(email)) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      if (!validatePassword(password)) {
        setPasswordError("Password too short");
      } else {
        setPasswordError("");
      }
    }
  }, [password]);

  useEffect(() => {
    const { emailConfirmed, error } = router.query;
    if (emailConfirmed === "true") {
      toast.success("Email confirmed successfully. You can now sign in.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.replace("/authentication/signIn", undefined, { shallow: true });
    } else if (error) {
      toast.error(error as string, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.replace("/authentication/signIn", undefined, { shallow: true });
    }
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error(
            "User account not found. Please check your email or sign up.",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            },
          );
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please verify your email before signing in.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return;
      }

      if (!data.user?.email_confirmed_at) {
        toast.error("Please verify your email before signing in.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        await supabase.auth.signOut();
        return;
      }

      // Successful login
      router.push("/home/home");
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // If the user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      router.push("/home/home");
    }
  }, [user, router]);

  const getInputStyle = (isFocused: boolean, hasError: string) => {
    if (hasError) return "border-red-500 text-red-500";
    if (isFocused) return "border-blue-500";
    return "border-gray-300";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <ToastContainer />
      <div className="mb-10">
        <Image src={devlinksLogo} alt="Devlinks Logo" width={150} height={40} />
      </div>
      <div className="max-w-[476px] w-full space-y-10 bg-white p-10 rounded-xl shadow-md">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900">Login</h2>
          <p className="text-base text-gray-500">
            Add your details below to get back into the app
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`block w-full pl-12 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 ${getInputStyle(emailFocused, emailError)}`}
                  placeholder="e.g. alex@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                {emailError && (
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <p className="text-sm text-red-500">{emailError}</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`block w-full pl-12 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 ${getInputStyle(passwordFocused, passwordError)}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                {passwordError && (
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <p className="text-sm text-red-500">{passwordError}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="text-base text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/auth/createAccount">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Create account
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
