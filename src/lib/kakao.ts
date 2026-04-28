// KakaoTalk notify client

import axios from "axios";

interface KakaoPayload {
  company: string;
  name: string;
  phone: string;
  message: string;
}

export async function sendKakaoNotification(data: KakaoPayload) {
  // Example using Solapi (most popular in Korea)
  await axios.post(
    "https://api.solapi.com/messages/v4/send",
    {
      message: {
        to:   process.env.KAKAO_RECEIVER_PHONE, // your business phone
        from: process.env.KAKAO_SENDER_PHONE,
        kakaoOptions: {
          pfId:       process.env.KAKAO_PFID,    // plus friend ID
          templateId: process.env.KAKAO_TEMPLATE_ID,
          variables: {
            "#{company}": data.company,
            "#{name}":    data.name,
            "#{phone}":   data.phone,
            "#{message}": data.message,
          },
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.SOLAPI_API_KEY}`,
      },
    }
  );
}