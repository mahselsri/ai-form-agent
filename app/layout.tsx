import "./globals.css";
import Sidebar from "@/component/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">

        <div className="flex">

          

          <main className="flex-1 p-8">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}