import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EditorialBlock, SectionDivider } from "@/components/Editorial";
import { TrackedCaps } from "@/components/TrackedCaps";
import { QuietLink } from "@/components/QuietLink";
import { Head } from "@/components/Head";
import { useT } from "@/i18n/LocaleContext";

const Enter = () => {
  const t = useT();
  const [params] = useSearchParams();
  const reference = params.get("ref") || "";
  const grail = params.get("grail") || "";
  const setChoice = params.get("set") || "";
  const artPiece = params.get("art") || "";
  const track = params.get("track") || "parfum";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const wantsParfum = track === "parfum" || track === "both";
  const wantsArt = track === "art" || track === "both";

  const grailDisplay =
    !grail || grail === "Allelium"
      ? t("Chosen by Allelium", "Choisi par Allelium", "Elegido por Allelium")
      : grail;
  const setDisplay =
    !setChoice || setChoice === "Allelium"
      ? t("Chosen by Allelium", "Choisi par Allelium", "Elegido por Allelium")
      : setChoice;

  // Human-readable label for the art piece
  const ART_LABEL = {
    "solstice-01": t("The Solstice · N° 01 · The Monk", "Le Solstice · N° 01 · Le Moine", "El Solsticio · N° 01 · El Monje"),
    "solstice-02": t("The Solstice · N° 02 · The Father", "Le Solstice · N° 02 · Le Père", "El Solsticio · N° 02 · El Padre"),
    "solstice-03": t("The Solstice · N° 03 · The Trio", "Le Solstice · N° 03 · Le Trio", "El Solsticio · N° 03 · El Trío"),
    "artefact-01": t("The Artefact · N° 01 · Moon-door", "L'Artefact · N° 01 · Porte-lune", "El Artefacto · N° 01 · Puerta-luna"),
    "artefact-02": t("The Artefact · N° 02 · Crescent", "L'Artefact · N° 02 · Croissant", "El Artefacto · N° 02 · Creciente"),
    "artefact-03": t("The Artefact · N° 03 · Chorus", "L'Artefact · N° 03 · Chœur", "El Artefacto · N° 03 · Coro"),
    "spring-2027": t("Second collection · Spring 2027", "Deuxième collection · Printemps 2027", "Segunda colección · Primavera 2027"),
  };
  const artDisplay = artPiece ? (ART_LABEL[artPiece] || artPiece) : t("Undecided", "Non décidé", "Sin decidir");

  return (
    <div data-testid="enter-page">
      <Head
        title={t("Enter the world", "Entrer dans le monde", "Entrar en el mundo")}
        description={t(
          "Your reservation has been set down in the register of Maison Allélique.",
          "Votre réservation est inscrite au registre de Maison Allélique.",
          "Tu reserva ha quedado inscrita en el registro de Maison Allélique."
        )}
      />

      <section
        className="relative min-h-[92vh] flex items-center px-6 md:px-12"
        data-testid="enter-hero"
      >
        <div
          className={`mx-auto max-w-4xl w-full transition-all ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDuration: "1800ms" }}
        >
          <TrackedCaps tone="sang" data-testid="enter-reference">
            {t("Waiting list", "Liste d'attente", "Lista de espera")}{" "}
            {reference || "—"} · {t("Received", "Reçue", "Recibida")}
          </TrackedCaps>

          <h1 className="mt-10 font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-encre">
            {t("You are", "Vous êtes", "Estás")}
            <br />
            <span className="font-italic-display">
              {t("on the list.", "sur la liste.", "en la lista.")}
            </span>
          </h1>

          <p
            className={`mt-14 font-display text-xl md:text-2xl text-encre max-w-2xl leading-snug transition-opacity ease-out ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: "2400ms", transitionDelay: "600ms" }}
          >
            {t(
              "Your place is set down in our register — a Grail, a Set, and Allelium, held in your name for the first edition.",
              "Votre place est inscrite à notre registre — un Graal, un Set et Allelium, gardés à votre nom pour la première édition.",
              "Tu lugar queda inscrito en nuestro registro — un Grial, un Set y Allelium, guardados a tu nombre para la primera edición."
            )}
          </p>

          <div
            className={`mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl transition-opacity ease-out ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: "2400ms", transitionDelay: "1000ms" }}
          >
            {wantsParfum && (
              <>
                <div>
                  <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cendre">
                    {t("Your Grail", "Votre Graal", "Tu Grial")}
                  </p>
                  <p
                    data-testid="enter-grail-value"
                    className="mt-2 font-italic-display text-2xl md:text-3xl text-encre"
                  >
                    {grailDisplay}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cendre">
                    {t("Your first Set", "Votre premier Set", "Tu primer Set")}
                  </p>
                  <p
                    data-testid="enter-set-value"
                    className="mt-2 font-italic-display text-2xl md:text-3xl text-encre"
                  >
                    {setDisplay}
                  </p>
                </div>
              </>
            )}
            {wantsArt && (
              <div className="sm:col-span-2">
                <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cendre">
                  {t("Your art piece", "Votre pièce d'art", "Tu pieza de arte")}
                </p>
                <p
                  data-testid="enter-art-value"
                  className="mt-2 font-italic-display text-2xl md:text-3xl text-encre"
                >
                  {artDisplay}
                </p>
              </div>
            )}
          </div>

          <p
            className={`mt-14 font-sans text-sm md:text-base text-cendre max-w-xl leading-relaxed transition-opacity ease-out ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: "2400ms", transitionDelay: "1400ms" }}
          >
            {t(
              "Nothing is charged today. When the limited edition is ready, we will write personally — with the sequence Allelium has proposed for your skin, and the day it will be delivered.",
              "Rien n'est facturé aujourd'hui. Lorsque l'édition limitée sera prête, nous écrirons personnellement — avec la séquence qu'Allelium aura proposée pour votre peau, et le jour de sa livraison.",
              "Nada se factura hoy. Cuando la edición limitada esté lista, escribiremos personalmente — con la secuencia que Allelium haya propuesto para tu piel, y el día de tu entrega."
            )}
          </p>
        </div>
      </section>

      <SectionDivider withSeal />

      <EditorialBlock eyebrow={t("Doorways", "Seuils", "Umbrales")}>
        <p className="font-display italic text-xl md:text-2xl text-cendre max-w-xl leading-snug mb-12">
          {t(
            "While you wait, the maison is open. Walk through it.",
            "En attendant, la maison est ouverte. Traversez-la.",
            "Mientras espera, la maison está abierta. Recórrala."
          )}
        </p>
        <div className="flex flex-col gap-6">
          <QuietLink to="/editions/parfum" data-testid="enter-grails-link">
            {t("Meet the three Grails", "Rencontrer les trois Graals", "Conocer los tres Griales")}
          </QuietLink>
          <QuietLink to="/editions/sets" data-testid="enter-sets-link">
            {t("Explore the Sets", "Explorer les Sets", "Explorar los Sets")}
          </QuietLink>
          <QuietLink to="/layering" data-testid="enter-layering-link">
            {t("Read how Allelium composes", "Lire comment Allelium compose", "Leer cómo Allelium compone")}
          </QuietLink>
          <QuietLink to="/maison" data-testid="enter-maison-link">
            {t("Return to the maison", "Retour à la maison", "Volver a la maison")}
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default Enter;
