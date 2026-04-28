"use client";
import { useSubmissions } from "@/hooks/useSubmissions";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const submissions       = useSubmissions();
  const router            = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Live Submissions <span className="text-blue-500">({submissions.length})</span>
      </h1>
      <div className="flex flex-col gap-4">
        {submissions.map((s) => (
          <div key={s.id} className="border rounded p-4 shadow-sm">
            <div className="flex justify-between">
              <h2 className="font-semibold">{s.company} — {s.name}</h2>
              <span className="text-xs text-gray-400">{new Date(s.timestamp).toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">{s.email} / {s.phone}</p>
            <p className="mt-2 text-sm">{s.message}</p>
            <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

