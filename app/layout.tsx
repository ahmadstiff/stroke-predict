import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Stroke Prediction App",
  description: "Predict stroke risk using a machine learning model",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Navbar />
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
