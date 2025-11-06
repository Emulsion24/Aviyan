// app/layout.js
import "./globals.css";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Gau Aviyan",
  description: "Your website description goes here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <Toaster position="top-center" />

        {children}
      </body>
    </html>
  );
}
