import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.lpnrangsitby.co.th"),
  title: "KHONGKWAN ASSET RESIDENT | ลุมพินี ทาวน์ชิป รังสิต-คลอง 1",
  description: "ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 - คอนโดพร้อมอยู่ แต่งครบ ฟังก์ชันลงตัว ชุมชนเมืองน่าอยู่ สิ่งอำนวยความสะดวกครบครัน ใกล้ ฟิวเจอร์พาร์ครังสิต ราคาเพียง 929,000 บาท",
  keywords: "KHONGKWAN ASSET RESIDENT, ลุมพินี ทาวน์ชิป, รังสิต-คลอง 1, คอนโดรังสิต, คอนโดลุมพินี, คอนโดใกล้ฟิวเจอร์, คอนโดราคาถูก, คอนโดปทุมธานี",
  authors: [{ name: "KHONGKWAN ASSET RESIDENT" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KHONGKWAN ASSET RESIDENT | ลุมพินี ทาวน์ชิป รังสิต-คลอง 1",
    description: "ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 - โครงการคอนโดพร้อมอยู่ ทำเลดีใกล้ฟิวเจอร์พาร์ครังสิต ราคาเพียง 929,000 บาท ฟรีโอน ฟรีจดจำนอง",
    url: "https://www.lpnrangsitby.co.th/",
    siteName: "KHONGKWAN ASSET RESIDENT",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "KHONGKWAN ASSET RESIDENT",
      },
      {
        url: "/images/LPN (1).jpg",
        width: 1200,
        height: 630,
        alt: "ลุมพินี ทาวน์ชิป รังสิต-คลอง 1",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KHONGKWAN ASSET RESIDENT | ลุมพินี ทาวน์ชิป รังสิต-คลอง 1",
    description: "ลุมพินี ทาวน์ชิป รังสิต-คลอง 1 - โครงการคอนโดพร้อมอยู่ ทำเลดีใกล้ฟิวเจอร์พาร์ครังสิต ราคาเพียง 929,000 บาท ฟรีโอน ฟรีจดจำนอง",
    images: ["/images/LPN (1).jpg"],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
