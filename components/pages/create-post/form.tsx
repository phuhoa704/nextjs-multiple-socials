"use client";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { PostFormValues, postSchema } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Facebook,
  ImageIcon,
  Instagram,
  Linkedin,
  Twitter,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const CreatePostForm = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      platforms: [],
    },
  });

  const togglePlatform = (id: string) => {
    const newPlatforms = selectedPlatforms.includes(id)
      ? selectedPlatforms.filter((p) => p !== id)
      : [...selectedPlatforms, id];
    setSelectedPlatforms(newPlatforms);
    setValue("platforms", newPlatforms);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file as File),
      );
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PostFormValues) => {
    console.log("Post data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // alert('Post created successfully!');
  };

  const platforms = [
    {
      id: "facebook",
      icon: Facebook,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "instagram",
      icon: Instagram,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    { id: "twitter", icon: Twitter, color: "text-sky-500", bg: "bg-sky-50" },
    {
      id: "linkedin",
      icon: Linkedin,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
  ];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>
                What would you like to share today?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Campaign Title
                </label>
                <Input
                  placeholder="e.g. Summer Sale 2024"
                  {...register("title")}
                  className={cn(
                    "bg-slate-50/50",
                    errors.title ? "border-red-500" : "",
                  )}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Content
                </label>
                <textarea
                  className={cn(
                    "flex min-h-[200px] w-full rounded-xl border border-black/10 bg-slate-50/50 px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all disabled:cursor-not-allowed disabled:opacity-50",
                    errors.content ? "border-red-500" : "",
                  )}
                  placeholder="Write your post content here..."
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Media Assets</CardTitle>
              <CardDescription>
                Upload images or videos for your post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                <AnimatePresence>
                  {previews.map((url, i) => (
                    <motion.div
                      key={url}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative aspect-square rounded-xl overflow-hidden border border-black/10 bg-slate-100 group shadow-sm"
                    >
                      <img
                        src={url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePreview(i)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <label className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group">
                  <div className="p-3 rounded-full bg-slate-50 group-hover:bg-emerald-100 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 group-hover:text-emerald-600 uppercase tracking-wider">
                    Upload
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-black/5">
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Select Platforms
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border transition-all text-left group",
                        selectedPlatforms.includes(p.id)
                          ? "border-emerald-500 ring-2 ring-emerald-500/10 bg-emerald-50/50"
                          : "border-black/5 bg-slate-50/30 hover:border-slate-300 hover:bg-slate-50",
                      )}
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg bg-white shadow-sm group-hover:scale-110 transition-transform",
                          p.color,
                        )}
                      >
                        <p.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold capitalize text-slate-700">
                        {p.id}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.platforms && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.platforms.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Schedule Time
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="datetime-local"
                    className="pl-12 bg-slate-50/50"
                    {...register("scheduledAt")}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                  Leave empty to publish immediately
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 border-t border-black/5 pt-6">
              <Button
                type="submit"
                className="w-full h-12 text-base shadow-lg shadow-emerald-500/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Schedule Post"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-black/5 rounded-2xl p-5 bg-white shadow-xl shadow-black/5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white shadow-sm"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Your Brand
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Just now • Public
                    </p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-50 rounded-xl border border-black/5 flex items-center justify-center overflow-hidden">
                  {previews.length > 0 ? (
                    <img
                      src={previews[0]}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-slate-200" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-100 rounded-full"></div>
                  <div className="h-3 w-2/3 bg-slate-100 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-black/5">
                  <div className="flex gap-4">
                    <div className="w-4 h-4 rounded bg-slate-100"></div>
                    <div className="w-4 h-4 rounded bg-slate-100"></div>
                    <div className="w-4 h-4 rounded bg-slate-100"></div>
                  </div>
                  <div className="w-4 h-4 rounded bg-slate-100"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </form>
  );
};
