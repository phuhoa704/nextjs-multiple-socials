import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Plus,
  Trash2,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SocialAccounts() {
  const accounts = [
    {
      id: "1",
      platform: "facebook",
      username: "SocialSync Official",
      connectedAt: "2023-10-01",
      avatar: "",
    },
    {
      id: "2",
      platform: "instagram",
      username: "@socialsync_app",
      connectedAt: "2023-10-05",
      avatar: "",
    },
  ];

  const platforms = [
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: Twitter,
      color: "text-sky-500",
      bg: "bg-sky-50",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
  ];
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-bold tracking-tight gradient-text">
            Social Accounts
          </h2>
          <p className="text-slate-500">
            Manage your connected social media profiles
          </p>
        </div>
        <Button className="shadow-lg shadow-emerald-500/20">
          <Plus className="w-4 h-4 mr-2" />
          Connect New
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2"
      >
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Accounts currently linked to your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accounts.map((account) => {
                  const platform = platforms.find(
                    (p) => p.id === account.platform,
                  );
                  const Icon = platform?.icon || Facebook;

                  return (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-5 border border-black/5 rounded-2xl bg-slate-50/30 hover:bg-slate-50 hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "p-3 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform",
                            platform?.color,
                          )}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {account.username}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Connected on {account.connectedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-white"
                        >
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Available Platforms</CardTitle>
              <CardDescription>
                Connect more platforms to expand your reach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {platforms.map((platform) => {
                  const isConnected = accounts.some(
                    (a) => a.platform === platform.id,
                  );

                  return (
                    <div
                      key={platform.id}
                      className="flex items-center justify-between p-5 border border-black/5 rounded-2xl bg-slate-50/30 group hover:border-emerald-500/20 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "p-3 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform",
                            platform.color,
                          )}
                        >
                          <platform.icon className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-slate-900">
                          {platform.name}
                        </span>
                      </div>
                      {isConnected ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Connected
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full font-bold uppercase tracking-wider text-[10px] px-4"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
