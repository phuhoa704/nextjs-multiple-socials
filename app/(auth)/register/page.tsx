import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Share2 } from "lucide-react";
import RegisterForm from "@/components/pages/register/form";

export default function Register() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Share2 className="w-8 h-8" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your details to get started with SocialSync
        </CardDescription>
      </CardHeader>
      <RegisterForm />
    </Card>
  );
}
