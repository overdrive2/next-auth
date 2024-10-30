import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">🔐 Auth</h1>
      </div>
      <p className="text-white">
        A simple authentication service
      </p>
      <div>
      <Link href="/sign-in">
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
      </Link>
      </div>
    </main>
  );
}
