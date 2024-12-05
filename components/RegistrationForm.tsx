"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { RegisterFormData } from "@/types/types";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-gradient-to-b dark:bg-gray-800  border border-gray-100 dark:border-gray-700 shadow-xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-gray-300 text-center mb-6">
        Create Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Label htmlFor="name" className="text-gray-300 mb-2 block">
            Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-10 py-2 text-teal-300  focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div className="relative">
          <Label htmlFor="email" className="text-gray-300 mb-2 block">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="pl-10 py-2 text-blue-100  focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div className="relative">
          <Label htmlFor="password" className="text-gray-300 mb-2 block">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="pl-10 pr-10 py-2 text-yellow-300  focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-teal-600 hover:bg-blue-400 text-white py-2.5 rounded-lg transition-colors duration-300" 
          disabled={loading}
        >
          {loading ? "Registering..." : "Create Account"}
        </Button>
      </form>
      
      <div className="text-center mt-4 text-gray-500">
        Already have an account? 
        <a href="/login" className="ml-1 text-indigo-600 hover:underline">
          Log in
        </a>
      </div>
    </div>
  );
}