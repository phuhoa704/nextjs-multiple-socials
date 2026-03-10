import { CreatePostForm } from "@/components/pages/create-post/form";

export default function CreatePost() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-bold tracking-tight gradient-text">
          Create New Post
        </h2>
        <p className="text-slate-500">
          Craft and schedule your content across multiple platforms.
        </p>
      </div>
      <CreatePostForm />
    </div>
  );
}
