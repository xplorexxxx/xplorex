import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <main className="min-h-screen py-20 px-4" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-narrow">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="glass-card p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p>
              <strong className="text-foreground">Last updated:</strong> {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
              <p>
                When you use the ROI Leak Calculator, we may collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address (when you request a report or book a call)</li>
                <li>Name and company (when you book a call)</li>
                <li>Calculator inputs and results (stored locally in your browser)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send you the detailed ROI report you requested</li>
                <li>Contact you to schedule your consultation call</li>
                <li>Improve our calculator and services</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Data Storage</h2>
              <p>
                Calculator data is stored locally in your browser using localStorage. This data never leaves your device unless you explicitly submit a form. When you submit your email or booking request, that information is stored securely.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Data Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may share information with trusted third parties who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of any inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Cookies</h2>
              <p>
                This website does not use tracking cookies. We only use essential cookies required for the website to function properly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us through the booking form on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
