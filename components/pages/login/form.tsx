"use client";
import { CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/types/validation";
import { useLoginWithEmail } from "@/hooks/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { mutate, isPending } = useLoginWithEmail();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: () => {
        // Redirect to dashboard on success
        router.push("/dashboard");
      },
      onError: (error: any) => {
        // Simple error feedback
        const msg = error.response?.data?.message || "Login failed";
        // If toast is not available, maybe we can use console.error or a div
        alert(msg);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input
            type="email"
            placeholder="m@example.com"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <Link
              href="/forgot-password"
              title="Forgot password"
              className="text-xs text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
        <div className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </form>
  );
}
