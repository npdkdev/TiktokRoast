import RoastForm from "@/components/RoastForm";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  return (
    <main className="bg-gray-200 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center mb-8">
          Tiktok Roaster
        </h1>
        <RoastForm />
      </div>
    <Analytics/>
    <SpeedInsights/>
      <footer className="text-center m-8">
        <p>
          Developed by{" "}
          <a
            href="https://www.instagram.com/nppddkk"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            @nppddkk
          </a>
        </p>
      </footer>
    </main>
  );
}
