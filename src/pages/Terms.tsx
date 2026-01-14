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
          Retour à l'accueil
        </Link>

        <div className="glass-card p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">Conditions d'utilisation</h1>

          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p>
              <strong className="text-foreground">Dernière mise à jour :</strong> {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptation des conditions</h2>
              <p>
                En accédant et en utilisant le Calculateur ROI, vous acceptez d'être lié par les termes et dispositions de cet accord. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Description du service</h2>
              <p>
                Le Calculateur ROI est un outil gratuit conçu pour aider les entreprises à estimer le temps et le coût perdus sur des tâches répétitives. Les calculs fournis sont des estimations basées sur les données que vous fournissez et doivent être utilisés à titre informatif uniquement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Exactitude des informations</h2>
              <p>
                Bien que nous nous efforcions de fournir des calculs précis, les résultats sont des estimations et peuvent ne pas refléter les coûts ou économies réels. La précision des résultats dépend de l'exactitude des données que vous saisissez. Nous ne garantissons pas l'exhaustivité, la fiabilité ou l'exactitude de ces informations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Responsabilités de l'utilisateur</h2>
              <p>
                Vous êtes responsable de :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir des informations exactes lors de l'utilisation du calculateur</li>
                <li>Fournir des informations de contact exactes lors de la soumission de formulaires</li>
                <li>Utiliser le service conformément à toutes les lois applicables</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Propriété intellectuelle</h2>
              <p>
                Tout le contenu de ce site web, y compris le texte, les graphiques, les logos et les logiciels, est la propriété du Calculateur ROI et est protégé par les lois sur la propriété intellectuelle. Vous ne pouvez pas reproduire, distribuer ou créer des œuvres dérivées sans notre autorisation écrite expresse.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Limitation de responsabilité</h2>
              <p>
                En aucun cas le Calculateur ROI ne sera responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs découlant de ou en relation avec votre utilisation de ce service. Cela inclut toute décision prise sur la base des résultats du calculateur.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Modifications des conditions</h2>
              <p>
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet immédiatement après leur publication sur le site. Votre utilisation continue du service après les modifications constitue une acceptation des nouvelles conditions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
              <p>
                Si vous avez des questions concernant ces Conditions d'utilisation, veuillez nous contacter via le formulaire de réservation sur notre site.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Terms;
