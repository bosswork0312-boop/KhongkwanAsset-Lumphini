import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, phone, houseType, budget, day, time, notes } = data;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุชื่อและเบอร์โทรศัพท์" },
        { status: 400 }
      );
    }

    // ข้อความที่จะส่งเตือนเข้ากลุ่มแชตหรือห้องแชต LINE ของเอเจนต์
    const textContent = `🔔 มีผู้ลงทะเบียนใหม่!
------------------------
👤 ชื่อผู้ติดต่อ: ${name}
📞 เบอร์โทรศัพท์: ${phone}
🏢 แบบที่สนใจ: ${houseType || "ไม่ได้ระบุ"}
💰 งบประมาณ: ${budget || "ไม่ได้ระบุ"}
📅 วันที่สะดวก: ${day || "ไม่ได้ระบุ"}
⏰ เวลาที่สะดวก: ${time || "ไม่ได้ระบุ"}
📝 หมายเหตุเพิ่มเติม: ${notes || "ไม่มีข้อมูลเพิ่มเติม"}
------------------------
กรุณาติดต่อกลับลูกค้าโดยด่วนครับ`;

    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const userId = process.env.LINE_USER_ID;

    // ถ้ายังไม่ได้ตั้งค่าตัวแปรสภาพแวดล้อมจริง
    if (!channelAccessToken || !userId) {
      console.error("❌ LINE_CHANNEL_ACCESS_TOKEN หรือ LINE_USER_ID ยังไม่ได้ตั้งค่าในเซิร์ฟเวอร์!");
      // คืนสถานะความสำเร็จหลอกหน้าบ้านเพื่อให้ไม่สะดุด แต่เตือนในส่วน Log
      return NextResponse.json({
        success: true,
        warning: "ระบบยังไม่ได้รับการตั้งค่ารหัสผ่าน LINE API จริงในเซิร์ฟเวอร์",
      });
    }

    // ส่งข้อมูลแบบ JSON ไปยัง LINE Messaging API ทางการ (Push Message)
    const response = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${channelAccessToken}`,
      },
      body: JSON.stringify({
        to: userId,
        messages: [
          {
            type: "text",
            text: textContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const responseData = await response.text();
      console.error("❌ LINE Messaging API Error Details:", responseData);
      throw new Error("ไม่สามารถส่งแจ้งเตือนเข้าแชต LINE ผ่าน Messaging API ได้");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ API Register Route (LINE OA) Error:", error);
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาดทางเทคนิคในการประมวลผลระบบ" },
      { status: 500 }
    );
  }
}
