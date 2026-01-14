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
          Retour à l'accueil
        </Link>

        <div className="glass-card p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">Politique de confidentialité</h1>

          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p>
              <strong className="text-foreground">Dernière mise à jour :</strong> {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Informations que nous collectons</h2>
              <p>
                Lorsque vous utilisez le Calculateur ROI, nous pouvons collecter les informations suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adresse email (lorsque vous demandez un rapport ou réservez un appel)</li>
                <li>Nom et entreprise (lorsque vous réservez un appel)</li>
                <li>Entrées et résultats du calculateur (stockés localement dans votre navigateur)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Comment nous utilisons vos informations</h2>
              <p>
                Nous utilisons les informations collectées pour :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Vous envoyer le rapport ROI détaillé que vous avez demandé</li>
                <li>Vous contacter pour planifier votre appel de consultation</li>
                <li>Améliorer notre calculateur et nos services</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Stockage des données</h2>
              <p>
                Les données du calculateur sont stockées localement dans votre navigateur en utilisant localStorage. Ces données ne quittent jamais votre appareil sauf si vous soumettez explicitement un formulaire. Lorsque vous soumettez votre email ou une demande de réservation, ces informations sont stockées en toute sécurité.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Partage des données</h2>
              <p>
                Nous ne vendons, n'échangeons ni ne transférons autrement vos informations personnelles identifiables à des tiers. Nous pouvons partager des informations avec des tiers de confiance qui nous aident à exploiter notre site web et à mener nos activités, à condition que ces parties acceptent de garder ces informations confidentielles.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Vos droits</h2>
              <p>
                Vous avez le droit de :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accéder aux informations personnelles que nous détenons à votre sujet</li>
                <li>Demander la correction de toute donnée inexacte</li>
                <li>Demander la suppression de vos données</li>
                <li>Retirer votre consentement à tout moment</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Cookies</h2>
              <p>
                Ce site web n'utilise pas de cookies de suivi. Nous utilisons uniquement les cookies essentiels nécessaires au bon fonctionnement du site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Nous contacter</h2>
              <p>
                Si vous avez des questions concernant cette Politique de confidentialité, veuillez nous contacter via le formulaire de réservation sur notre site.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
