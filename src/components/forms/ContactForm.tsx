// Main B2B contact form

"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  company: z.string().min(2, "Company name required"),
  name:    z.string().min(2, "Name required"),
  email:   z.string().email("Invalid email"),
  phone:   z.string().min(8, "Phone required"),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) alert("Submitted successfully!");
    else alert("Something went wrong.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-lg">
      <input {...register("company")} placeholder="Company Name" className="border p-2 rounded" />
      {errors.company && <p className="text-red-500">{errors.company.message}</p>}

      <input {...register("name")} placeholder="Your Name" className="border p-2 rounded" />
      <input {...register("email")} placeholder="Email" className="border p-2 rounded" />
      <input {...register("phone")} placeholder="Phone" className="border p-2 rounded" />
      <textarea {...register("message")} placeholder="Message" rows={4} className="border p-2 rounded" />

      <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-2 rounded">
        {isSubmitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}