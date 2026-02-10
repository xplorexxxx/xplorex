import { Shield } from "lucide-react";

const TrustHeader = () => {
  return (
    <div className="bg-foreground text-background py-1.5 text-center relative" style={{ zIndex: 60 }}>
      <div className="container-wide flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
        <Shield className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
        <span>
          Certifié conforme RGPD · Infrastructure Souveraine · Hébergement UE
        </span>
      </div>
    </div>
  );
};

export default TrustHeader;
