import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/layout/landing-navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40">
          {/* Background Gradient Blur */}
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-1155/678 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
                Submit your project. <br className="hidden sm:block" />
                <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Get real feedback.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                The streamlined platform for students to showcase their work and
                mentors to review, approve, and guide projects efficiently.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base"
                  render={<Link href="/register" />}
                  nativeButton={false}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base"
                  render={<Link href="/login" />}
                  nativeButton={false}
                >
                  Log in
                </Button>
              </div>
            </div>

            {/* Dashboard Mockup (CSS only) */}
            <div className="mx-auto mt-16 flex max-w-4xl flex-col overflow-hidden rounded-xl border bg-card/50 shadow-2xl backdrop-blur-sm sm:mt-24">
              <div className="flex h-10 items-center gap-2 border-b bg-muted/50 px-4">
                <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="grid grid-cols-1 gap-6 bg-muted/20 p-6 md:grid-cols-3">
                <div className="col-span-1 space-y-4 md:col-span-2">
                  <div className="h-8 w-1/3 animate-pulse rounded-md bg-muted" />
                  <div className="h-32 w-full animate-pulse rounded-md bg-muted" />
                  <div className="h-32 w-full animate-pulse rounded-md bg-muted" />
                </div>
                <div className="space-y-4">
                  <div className="h-24 w-full animate-pulse rounded-md bg-muted" />
                  <div className="h-48 w-full animate-pulse rounded-md bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to succeed
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Designed to eliminate friction between students and mentors.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <Zap className="h-5 w-5 text-primary" />
                    Fast Submissions
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Students can submit their GitHub repository and live links
                      in seconds. No complicated forms.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Streamlined Review
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Mentors get a powerful dashboard to filter, approve, or
                      reject projects with detailed feedback.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Secure & Reliable
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Role-based access control ensures data is only accessible
                      to the right people.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 DevSubmit. Built for programming bootcamps.</p>
      </footer>
    </div>
  );
}
