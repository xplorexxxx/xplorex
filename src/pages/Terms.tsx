import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
          <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>

          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p>
              <strong className="text-foreground">Last updated:</strong> {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the ROI Leak Calculator, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
              <p>
                The ROI Leak Calculator is a free tool designed to help businesses estimate the time and cost wasted on repetitive tasks. The calculations provided are estimates based on the inputs you provide and should be used for informational purposes only.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Accuracy of Information</h2>
              <p>
                While we strive to provide accurate calculations, the results are estimates and may not reflect actual costs or savings. The accuracy of results depends on the accuracy of the data you input. We make no warranties about the completeness, reliability, or accuracy of this information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. User Responsibilities</h2>
              <p>
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing accurate information when using the calculator</li>
                <li>Providing accurate contact information when submitting forms</li>
                <li>Using the service in compliance with all applicable laws</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and software, is the property of ROI Leak Calculator and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
              <p>
                In no event shall ROI Leak Calculator be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of this service. This includes any decisions made based on the calculator results.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us through the booking form on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Terms;
