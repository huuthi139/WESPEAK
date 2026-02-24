import BottomNav from "@/components/layout/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark pb-20">
      <main className="mx-auto max-w-md">{children}</main>
      <BottomNav />
    </div>
  );
}
