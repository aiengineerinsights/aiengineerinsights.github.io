import NewsletterSignup from "@/components/NewsletterSignup";

// Homepage newsletter capture strip. Sits near the foot of the homepage so
// first-time visitors can subscribe after scrolling the content. Reuses the same
// on-brand beehiiv form; the /newsletter page is the fuller hub.
const NewsletterSection = () => (
  <section className="py-14 sm:py-20 bg-muted/20 border-t border-border">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-2">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Stay sharp on AI engineering</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Join <strong>The AI Engineer's Brief</strong> — one 5-minute email a week on agents, LLMs, tools, and
          career, minus the hype. Plus the free roadmap PDF when you subscribe.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <NewsletterSignup
          heading="Get the weekly brief"
          subtext="Engineering-first, hype-free. Unsubscribe anytime."
        />
      </div>
    </div>
  </section>
);

export default NewsletterSection;
