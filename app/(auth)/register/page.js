"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, Phone, Plane, User2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const schema = z.object({
  first_name: z.string().min(2, "First name is required."),
  last_name: z.string().min(2, "Last name is required."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(7, "Phone is required."),
  date_of_birth: z.string().min(1, "Date of birth is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  acceptedTerms: z.literal(true, { errorMap: () => ({ message: "Please accept the terms." }) }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      password: "",
      acceptedTerms: false,
    },
  });
  const password = watch("password");
  const strength = Math.min(100, password.length * 12);
  const strengthWidthClass =
    strength >= 80 ? "w-full" : strength >= 60 ? "w-4/5" : strength >= 40 ? "w-3/5" : strength >= 20 ? "w-2/5" : "w-1/5";

  const onSubmit = async (form) => {
    try {
      const { acceptedTerms, ...payload } = form;
      void acceptedTerms;
      const { data } = await api.post("/auth/register", payload);
      login(data.data.token, data.data.user);
      router.push("/passenger/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
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
          <h2 className="text-3xl font-bold tracking-tight">Passenger onboarding built for scale</h2>
          <p className="mt-6 text-sm text-slate-300">Create your account to manage bookings, payments, route history, and loyalty rewards in one dashboard.</p>
        </div>
        <p className="text-sm text-slate-400">Step 1 of 2 - Account setup</p>
      </aside>
      <main className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
          <p className="mt-1 text-sm text-slate-500">Join the platform and start booking in minutes.</p>
          <div className="mt-3 h-2 rounded-full bg-slate-100">
            <div className="h-2 w-1/2 rounded-full bg-blue-600" />
          </div>
          <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">First name</label>
              <div className="relative">
                <User2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input {...register("first_name")} className="h-11 w-full rounded-lg border border-slate-200 px-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </div>
              {errors.first_name ? <p className="mt-1 text-xs text-red-600">{errors.first_name.message}</p> : null}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Last name</label>
              <div className="relative">
                <User2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input {...register("last_name")} className="h-11 w-full rounded-lg border border-slate-200 px-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </div>
              {errors.last_name ? <p className="mt-1 text-xs text-red-600">{errors.last_name.message}</p> : null}
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input {...register("email")} className="h-11 w-full rounded-lg border border-slate-200 px-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </div>
              {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input {...register("phone")} className="h-11 w-full rounded-lg border border-slate-200 px-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </div>
              {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Date of birth</label>
              <input type="date" {...register("date_of_birth")} className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              {errors.date_of_birth ? <p className="mt-1 text-xs text-red-600">{errors.date_of_birth.message}</p> : null}
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input {...register("password")} type={showPassword ? "text" : "password"} className="h-11 w-full rounded-lg border border-slate-200 px-4 pl-10 pr-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => setShowPassword((state) => !state)} className="absolute right-3 top-3 text-slate-400 transition-colors duration-150 hover:text-slate-700">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className={`h-2 rounded-full bg-blue-600 ${strengthWidthClass}`} />
              </div>
              {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
            </div>
            <div className="md:col-span-2">
              <label className="flex items-start gap-2 text-sm text-slate-600">
                <input type="checkbox" {...register("acceptedTerms")} className="mt-1 rounded border-slate-300" />
                I agree to the terms and privacy policy.
              </label>
              {errors.acceptedTerms ? <p className="mt-1 text-xs text-red-600">{errors.acceptedTerms.message}</p> : null}
            </div>
            <button type="submit" disabled={isSubmitting} className="md:col-span-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-700 disabled:opacity-70">
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>
          <p className="mt-4 text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
