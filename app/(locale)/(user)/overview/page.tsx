import {
  OverviewActivity,
  OverviewCharts,
  OverviewSummary,
} from "@/components/pages/overview";

export default function UserOverview() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-bold tracking-tight gradient-text">
          Dashboard Overview
        </h2>
        <p className="text-slate-500">
          Welcome back! Here's what's happening with your social accounts.
        </p>
      </div>

      <OverviewSummary />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <OverviewCharts />

        <OverviewActivity />
      </div>
    </div>
  );
}
