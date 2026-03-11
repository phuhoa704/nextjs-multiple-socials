"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Send } from "lucide-react";
import { motion } from "motion/react";

export const OverviewActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="col-span-3"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex-shrink-0 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Send className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate group-hover:text-emerald-600 transition-colors">
                    Summer Campaign Launch
                  </p>
                  <p className="text-xs text-slate-500">
                    Scheduled for Oct 24, 2023
                  </p>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Active
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
