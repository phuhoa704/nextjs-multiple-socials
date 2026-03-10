import { DashboardLayout } from "@/components/layouts/DashboardLayout";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
