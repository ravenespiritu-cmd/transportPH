"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, Plane } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  remember: z.boolean().optional(),
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (form) => {
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.data.token, data.data.user);
      const role = data.data.user.role;
      router.push(role === "admin" ? "/admin/dashboard" : "/passenger/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <aside className="relative hidden bg-slate-900 p-12 text-white md:flex md:flex-col md:justify-between">
        <div>
          <div className="mb-8 flex items-center gap-2 text-xl font-bold">
            <Plane className="h-5 w-5 text-blue-400" />
            TransportPH
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Enterprise-grade booking operations</h2>
          <ul className="mt-8 space-y-3 text-sm text-slate-300">
            <li>Real-time flight and railway scheduling</li>
            <li>Secure payment workflows and reconciliation</li>
            <li>Operational visibility for admins and staff</li>
          </ul>
        </div>
        <p className="text-sm text-slate-400">&quot;A polished platform that keeps both passengers and operations teams moving.&quot;</p>
      </aside>
      <main className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to continue to your transport dashboard.</p>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input {...register("email")} className="h-11 w-full rounded-lg border border-slate-200 px-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="you@company.com" />
              </div>
              {errors.email ? <p className="mt-1 text-xs font-medium text-red-600">{errors.email.message}</p> : null}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input {...register("password")} type={showPassword ? "text" : "password"} className="h-11 w-full rounded-lg border border-slate-200 px-4 pl-10 pr-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Enter password" />
                <button type="button" onClick={() => setShowPassword((state) => !state)} className="absolute right-3 top-3 text-slate-400 transition-colors duration-150 hover:text-slate-700">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password ? <p className="mt-1 text-xs font-medium text-red-600">{errors.password.message}</p> : null}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" {...register("remember")} className="rounded border-slate-300" />
                Remember me
              </label>
              <a href="#" className="text-slate-500 transition-colors duration-150 hover:text-slate-900">Forgot password?</a>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-700 disabled:opacity-70">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="my-6 h-px bg-slate-200" />
          <p className="text-sm text-slate-500">
            No account yet?{" "}
            <Link className="font-medium text-blue-600 transition-colors duration-150 hover:text-blue-700" href="/register">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
