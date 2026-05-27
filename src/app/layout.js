import './globals.css';

export const metadata = {
  title: 'Bảo Bối - Thư viện truyện tranh tương tác',
  description: 'Thư viện truyện tranh tương tác kết hợp Audio chuẩn AI cho bé',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#FFFDF9] m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
