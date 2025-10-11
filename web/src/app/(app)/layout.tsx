import { Header } from "./_components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-2">{children}</div>
    </div>
  );
}
