"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LoginFormData } from "@/types/types";
import { Lock, Mail } from "lucide-react";

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        setFormData({ email: "", password: "" });
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2 relative">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            className="pl-10 py-2 text-teal-300  focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <Input
            id="password"
            type="password"
            value={formData.password}
            className="pl-10 py-2 text-teal-300  focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
