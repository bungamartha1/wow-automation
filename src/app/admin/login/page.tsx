"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <input type="email"    value={email}    onChange={e => setEmail(e.target.value)}
        placeholder="Email" className="border p-2 rounded" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}
        placeholder="Password" className="border p-2 rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleLogin} className="bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </div>
  );
}