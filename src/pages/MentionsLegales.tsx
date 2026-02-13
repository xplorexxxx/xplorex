import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onBookCallClick={() => {}} />
      <main className="container-wide py-32 max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl mb-12" style={{ letterSpacing: "0.03em" }}>
          Mentions Légales
        </h1>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          {/* Éditeur du site */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              1. Éditeur du site
            </h2>
            <ul className="space-y-2 text-sm">
              <li><strong className="text-foreground">Dénomination sociale :</strong> XPLORE X</li>
              <li><strong className="text-foreground">Forme juridique :</strong> Société par actions simplifiée (Société à associé unique)</li>
              <li><strong className="text-foreground">Capital social :</strong> 100,00 euros</li>
              <li><strong className="text-foreground">Siège social :</strong> 60 rue François 1er, 75008 Paris</li>
              <li><strong className="text-foreground">Numéro d'immatriculation :</strong> 990 202 277 R.C.S. Paris</li>
              <li><strong className="text-foreground">Président :</strong> M. Genin Raphael Jean-Pierre René</li>
            </ul>
          </section>

          {/* Activité */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              2. Activité
            </h2>
            <p className="text-sm">
              L'entreprise exerce des activités de formation non continue et non qualifiante (marketing, finance, entrepreneuriat, IA, technologie), de coaching professionnel et de vente en ligne de produits digitaux.
            </p>
          </section>

          {/* Domiciliation */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              3. Domiciliation
            </h2>
            <p className="text-sm">
              L'entreprise est domiciliée auprès de LegalPlace (RCS 814 428 785).
            </p>
          </section>

          {/* Directeur de publication */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              4. Directeur de la publication
            </h2>
            <p className="text-sm">
              M. Genin Raphael Jean-Pierre René, en qualité de Président de la société XPLORE X.
            </p>
          </section>

          {/* Hébergeur */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              5. Hébergeur du site
            </h2>
            <ul className="space-y-2 text-sm">
              <li><strong className="text-foreground">Nom / Raison sociale :</strong>Nom / Raison sociale : Namecheap, Inc.</li>
              <li><strong className="text-foreground">Adresse :</strong>Adresse : 4600 East Washington Street, Suite 305, Phoenix, AZ 85034, USA</li>
              <li><strong className="text-foreground">Numéro de téléphone :</strong>Contact : https://www.namecheap.com/contact-us/</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              6. Contact
            </h2>
            <p className="text-sm">
              Pour toute question relative au site, vous pouvez nous contacter à l'adresse suivante :{" "}
              <a href="mailto:contact@xplorex.io" className="text-primary hover:underline">
                contact@xplorex.io
              </a>
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              7. Propriété intellectuelle
            </h2>
            <p className="text-sm">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) est la propriété exclusive de la société XPLORE X ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, publication, adaptation ou exploitation, totale ou partielle, des contenus du site est strictement interdite sans l'autorisation écrite préalable de XPLORE X.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              8. Données personnelles
            </h2>
            <p className="text-sm">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant. Pour exercer ces droits, veuillez nous contacter à{" "}
              <a href="mailto:contact@xplorex.io" className="text-primary hover:underline">
                contact@xplorex.io
              </a>
              . Pour plus de détails, consultez notre{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Politique de Confidentialité
              </Link>.
            </p>
          </section>

          {/* Limitation de responsabilité */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              9. Limitation de responsabilité
            </h2>
            <p className="text-sm">
              XPLORE X s'efforce de fournir des informations aussi précises que possible sur le site. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait de tiers partenaires qui lui fournissent ces informations. L'utilisation des informations et contenus disponibles sur l'ensemble du site ne saurait en aucun cas engager la responsabilité de XPLORE X.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: "0.03em" }}>
              10. Droit applicable et juridiction compétente
            </h2>
            <p className="text-sm">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, et après une tentative de recherche d'une solution amiable, compétence est attribuée aux tribunaux compétents de Paris.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>);

};

export default MentionsLegales;