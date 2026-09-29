import Hero from "@/components/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <section className="border-t-[3px] border-ink bg-sun px-6 py-24 text-center">
        <h2 className="mx-auto max-w-4xl font-display text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.95]">
          Get found on search. Get followed on Instagram.
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#" className="btn btn-white">Book a call</a>
          <a href="#" className="btn btn-pink">See the work</a>
        </div>
      </section>
    </main>
  );
}
