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

    // ข้อความที่จะส่งไปยังกลุ่ม/แชต LINE
    const message = `
🔔 มีผู้ลงทะเบียนใหม่!
------------------------
👤 ชื่อผู้ติดต่อ: ${name}
📞 เบอร์โทรศัพท์: ${phone}
🏢 แบบที่สนใจ: ${houseType || "ไม่ได้ระบุ"}
💰 งบประมาณ: ${budget || "ไม่ได้ระบุ"}
📅 วันที่สะดวก: ${day || "ไม่ได้ระบุ"}
⏰ เวลาที่สะดวก: ${time || "ไม่ได้ระบุ"}
📝 หมายเหตุเพิ่มเติม: ${notes || "ไม่มีข้อมูลเพิ่มเติม"}
------------------------
สแกนข้อมูลและติดต่อกลับลูกค้าโดยด่วนครับ`;

    // ดึง LINE Token จากตัวแปรสภาพแวดล้อมเพื่อความปลอดภัยสูงสุด
    const token = process.env.LINE_NOTIFY_TOKEN;

    if (!token) {
      console.error("❌ LINE_NOTIFY_TOKEN ไม่ได้ถูกตั้งค่าในระบบ!");
      // ส่งคืนความสำเร็จหลอกๆ ให้กับฝั่งหน้าบ้านเพื่อไม่ให้ลูกค้าหน้าเว็บสะดุด
      // แต่แจ้งข้อผิดพลาดในฝั่ง Server
      return NextResponse.json({
        success: true,
        warning: "ระบบยังไม่ได้รับการตั้งค่า LINE Token จริง",
      });
    }

    // ยิง API ไปยังเซิร์ฟเวอร์ LINE Notify
    const response = await fetch("https://notify-api.line.me/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({ message }).toString(),
    });

    if (!response.ok) {
      const responseData = await response.text();
      console.error("❌ LINE Notify API Error:", responseData);
      throw new Error("ไม่สามารถส่งแจ้งเตือนเข้าไลน์ได้");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ API Register Route Error:", error);
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาดในการบันทึกข้อมูลและส่งแจ้งเตือน" },
      { status: 500 }
    );
  }
}
