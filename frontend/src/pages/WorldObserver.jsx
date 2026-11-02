import React from "react";
import {
  PageIntro,
  EditorialBlock,
  PullQuote,
  BoneImage,
  SectionDivider,
} from "@/components/Editorial";
import { TrackedCaps } from "@/components/TrackedCaps";
import { QuietLink } from "@/components/QuietLink";
import { Head } from "@/components/Head";
import { useT } from "@/i18n/LocaleContext";
import IMAGES from "@/data/images";

const SangSeal = () => (
  <span
    aria-hidden="true"
    data-testid="observer-seal"
    className="inline-block align-middle mx-2"
    style={{ width: 14, height: 14, background: "var(--sang)", transform: "rotate(3deg)" }}
  />
);

const WorldObserver = () => {
  const t = useT();
  return (
    <div data-testid="world-observer-page">
      <Head
        title={t("The Observer", "L'Observateur", "El Observador")}
        description={t(
          "Restraint, recognition, silence — the scholar's stone, the ink-wash, the red seal.",
          "Retenue, reconnaissance, silence — la pierre du lettré, l'encre, le sceau rouge.",
          "Contención, reconocimiento, silencio — la piedra del letrado, la aguada de tinta, el sello rojo."
        )}
      />
      <PageIntro
        number="N° 03"
        eyebrow={t("The Observer", "L'Observateur", "El Observador")}
        title={
          <>
            {t("Nature creates.", "La nature crée.", "La naturaleza crea.")}
            <br />
            {t("We", "Nous", "Nosotros")}{" "}
            <span className="font-italic-display">
              {t("recognise", "reconnaissons", "reconocemos")}
            </span>
            .
          </>
        }
        essence={t(
          "Restraint, recognition, silence — the scholar's stone, the ink-wash, the red seal that authenticates.",
          "Retenue, reconnaissance, silence — la pierre du lettré, l'encre, le sceau rouge qui authentifie.",
          "Contención, reconocimiento, silencio — la piedra del letrado, la aguada de tinta, el sello rojo que autentica."
        )}
      />

      <BoneImage
        description={IMAGES.observer.hero_alt}
        src={IMAGES.observer.hero}
        alt={IMAGES.observer.hero_alt}
        ratio="aspect-[16/9]"
        className="max-w-[1400px] mx-auto"
      />

      <EditorialBlock eyebrow={t("Philosophy", "Philosophie", "Filosofía")}>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre">
          {t(
            "The literati did not carve. They chose. A scholar's stone is not made — it is",
            "Les lettrés ne sculptaient pas. Ils choisissaient. Une pierre de lettré ne se fait pas — elle se",
            "Los letrados no esculpían. Elegían. Una piedra de letrado no se hace — se"
          )}{" "}
          <span className="font-italic-display">{t("seen", "voit", "ve")}</span>.{" "}
          {t(
            "To recognise is a discipline more difficult than to design.",
            "Reconnaître est une discipline plus difficile que dessiner.",
            "Reconocer es una disciplina más difícil que diseñar."
          )}
        </p>
      </EditorialBlock>

      <PullQuote>
        {t(
          "The seal is not decoration. It is the act of saying: this. Yes. This.",
          "Le sceau n'est pas une décoration. C'est l'acte de dire : ceci. Oui. Ceci.",
          "El sello no es decoración. Es el acto de decir: esto. Sí. Esto."
        )}
      </PullQuote>

      <EditorialBlock eyebrow={t("Moodboard", "Planche d'ambiance", "Panel de referencias")} wide>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BoneImage
            description="A form recognised — Suzuki Osamu's terracotta, chosen, not carved."
            src={IMAGES.observer.detail_1}
            ratio="aspect-[3/4]"
          />
          <BoneImage
            description="Concept 02C — the vessel framed by its own stone, a moon-door portrait."
            src={IMAGES.observer.detail_2}
            ratio="aspect-[3/4]"
          />
          <BoneImage
            description="A Solstice sculpture chosen for its silence — the observer's eye."
            src={IMAGES.observer.detail_3}
            ratio="aspect-[3/4]"
          />
        </div>
      </EditorialBlock>

      <SectionDivider />

      <EditorialBlock eyebrow={t("The paired object", "L'objet apparié", "El objeto emparejado")} wide>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5">
            <BoneImage
              description="The Observer — a single obelisk of mycelium beside its brass base. A red seal below."
              src={IMAGES.observer.sculpture}
              ratio="aspect-[4/5]"
            />
          </div>
          <div className="md:col-span-7 space-y-8">
            <div className="flex items-center">
              <TrackedCaps>Édition N° 053 — The Observer</TrackedCaps>
              <SangSeal />
            </div>
            <h3 className="font-display text-4xl md:text-5xl leading-tight text-encre">
              {t("A stone we did not shape.", "Une pierre que nous n'avons pas façonnée.", "Una piedra que no dimos forma.")}
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-encre max-w-xl">
              <div>
                <dt className="tracked mb-2">{t("Material", "Matériau", "Materia")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Lingbi limestone, chosen not carved.", "Calcaire de Lingbi, choisi non sculpté.", "Caliza de Lingbi, elegida y no esculpida.")}
                </dd>
              </div>
              <div>
                <dt className="tracked mb-2">{t("Plinth", "Socle", "Pedestal")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Rosewood, joined without nails.", "Palissandre, assemblé sans clous.", "Palo de rosa, ensamblado sin clavos.")}
                </dd>
              </div>
              <div>
                <dt className="tracked mb-2">{t("Seal", "Sceau", "Sello")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Cinnabar wax on the reverse.", "Cire de cinabre au revers.", "Cera de cinabrio en el reverso.")}
                </dd>
              </div>
              <div>
                <dt className="tracked mb-2">{t("Register", "Registre", "Registro")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("One piece — unrepeatable.", "Une pièce — non reproductible.", "Una pieza — irrepetible.")}
                </dd>
              </div>
            </dl>
            <div className="pt-6">
              <QuietLink to="/preorder" accent data-testid="observer-preorder-link">
                {t("Join the waiting list", "Rejoindre la liste d'attente", "Unirse a la lista de espera")}
              </QuietLink>
            </div>
          </div>
        </div>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorways", "Seuils", "Umbrales")}>
        <div className="flex flex-col gap-6">
          <QuietLink to="/worlds/host" data-testid="observer-to-host">
            {t("Return to: The Host", "Retour à : L'Hôte", "Volver a: El Anfitrión")}
          </QuietLink>
          <QuietLink to="/worlds" data-testid="observer-to-worlds">
            {t("Back to the three worlds", "Retour aux trois mondes", "Volver a los tres mundos")}
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default WorldObserver;
