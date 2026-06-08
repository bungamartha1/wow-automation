// Form submission handler

import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminRtdb } from "@/lib/firebase-admin";
import { resend } from "@/lib/resend";
import { sendKakaoNotification } from "@/lib/kakao";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { company, name, email, phone, message } = body;

  try {
    const timestamp = new Date().toISOString();
    const submission = { company, name, email, phone, message, timestamp, status: "new" };

    // 1. Save to Firestore (permanent structured storage)
    // const docRef = await adminDb.collection("submissions").add(submission);

    // 2. Push to Realtime Database only
    const newRef = adminRtdb.ref("submissions").push();
    await newRef.set(submission);

    // 2. Push to Realtime Database (triggers live dashboard update)
    // await adminRtdb.ref(`submissions/${docRef.id}`).set(submission);

    // 3. Send emails via Resend
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to:   "imnotflows@gmail.com",
      subject: `[New B2B Inquiry] ${company}`,
      html: `<h2>${company} — ${name}</h2><p>${email} / ${phone}</p><p>${message}</p>`,
    });
    await resend.emails.send({
      from:    "onboarding@resend.dev",
      to:      email,
      subject: "We received your inquiry",
      html:    `<p>Hi ${name}, we'll get back to you within 1 business day.</p>`,
    });

    // 4. KakaoTalk notification
    // await sendKakaoNotification({ company, name, phone, message });

    return NextResponse.json({ success: true });
  } catch (err) {
  console.error("Full error:", JSON.stringify(err, null, 2));
  return NextResponse.json({ error: "Failed", details: String(err) }, { status: 500 });
}
}