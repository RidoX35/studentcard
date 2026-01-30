import { useMemo, useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import "./studentcard.css";
import photoMalo from "../assets/photomalo.jpg";
const HEADER_IMAGE = "/header.jpeg";


/* ---- Faux code-barres (visuel) ---- */
function FakeBarcode({ value = "202130305" }) {
  // Réglages simples à ajuster
  const LINES_PER_DIGIT = 4; // ↓ moins de lignes = rendu plus aéré (ex: 5 ou 6)
  const UNIT = 1;            // largeur de base d'une barre (px virtuels dans le viewBox)
  const GAP = 2;             // espace entre barres (met 2 pour encore plus d'air)

  const pattern = useMemo(() => {
    const digits = (value + "2025").split("").map((d) => parseInt(d, 10) || 0);
    const bars = [];

    digits.forEach((d, i) => {
      let seed = (d * 13 + i * 17) % 97;
      for (let j = 0; j < LINES_PER_DIGIT; j++) {
        seed = (seed * 31 + j * 7) % 97;
        // largeur relative 1..3 (évite les très fines trop nombreuses)
        const w = 1 + (seed % 3); 
        bars.push({ w });
      }
    });

    return bars;
  }, [value]);

  // largeur totale = somme (barre + gap)
  const totalWidth = useMemo(() => {
    return pattern.reduce((sum, b) => sum + (b.w * UNIT + GAP), 0);
  }, [pattern]);

  return (
    <div className="barcode-container">
      <svg
        className="barcode-svg"
        viewBox={`0 0 ${totalWidth} 140`}
        preserveAspectRatio="none"
      >
        <rect x="0" y="0" width={totalWidth} height="140" fill="#fff" />
        {(() => {
          let x = 0;
          return pattern.map((b, i) => {
            const w = b.w * UNIT;
            const rect = (
              <rect key={i} x={x} y="0" width={w} height="140" fill="#000" />
            );
            x += w + GAP; // ajoute l'espacement
            return rect;
          });
        })()}
      </svg>
      <div className="barcode-text">*{value}*</div>
    </div>
  );
}

/* ---- Photo 44×60 (×4 => 176×240), coins droits ---- */
function Photo({ src }) {
  return (
    <div className="photo-container">
      {src ? (
        <img src={src} alt="Portrait" className="photo-img" />
      ) : (
        <div className="photo-placeholder" />
      )}
    </div>
  );
}

/* ---- Horloge en direct ---- */
function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const dateStr = now.toLocaleDateString("fr-CA", { day: "numeric", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("fr-CA", { hour12: false });
  return <span>{dateStr} à {timeStr}</span>;
}

export default function StudentCardPage() {
  const [form] = useState({
    name: "Malo Lecorvaisier",
    program: "TECHNIQUES DE L'INFORMATIQUE",
    cycle: "Éducation régulière",
    session: "H2026 (Expire le 2026-05-22)",
    id: "202130305",
    estId: "LECM0707803",
    photoUrl: photoMalo, // mets l'URL de ta photo si tu en as une
  });

  return (
    
      <div className="card">

         {/* ===== Header avec burger + image rectangle ===== */}
        <header className="app-header">
          <button className="burger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>

          <div className="brand-slot">
            {HEADER_IMAGE ? (
              <img src={HEADER_IMAGE} alt="En-tête" />
            ) : (
              <div className="brand-placeholder">En-tête</div>
            )}
          </div>

          {/* Espace réservé à droite (pour symétrie) */}
          <div className="header-right-space"></div>
        </header>
        {/* ================================================= */}

        {/* Nom (gauche, non gras) */}
        <h1 className="student-name">{form.name}</h1>

        {/* Photo centrée */}
        <div className="photo-row">
          <Photo src={form.photoUrl} />
        </div>

        {/* Code-barres large */}
        <FakeBarcode value={form.id} />

        {/* Infos alignées à gauche */}
        <div className="info-block">
          <div className="info-line strong">{form.program}</div>
          <div className="info-line">{form.cycle}</div>
          <div className="info-line">{form.session}</div>
          <div className="info-line">{form.id}</div>
          <div className="info-line">{form.estId}</div>
        </div>

        {/* Horloge verte centrée */}
        <div className="clock"><LiveClock /></div>

        {/* Retour */}
        
      </div>
    
  );
}
