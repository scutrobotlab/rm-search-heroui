import { Navbar } from "@/components/Navbar.tsx";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <span className="text-default-600">
          Copyright © 2000 - 2025 SCUT RobotLab
        </span>
      </footer>
    </div>
  );
}
