// Real-time RTDB listener hook

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";

export interface Submission {
  id: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status: "new" | "read" | "replied";
}

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const submissionsRef = ref(rtdb, "submissions");

    const unsub = onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const list = Object.entries(data).map(([id, val]) => ({
        id,
        ...(val as Omit<Submission, "id">),
      }));
      // Sort newest first
      list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setSubmissions(list);
    });

    return () => unsub();
  }, []);

  return submissions;
}