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

const WorldHost = () => {
  const t = useT();
  return (
    <div data-testid="world-host-page">
      <Head
        title={t("The Host", "L'Hôte", "El Anfitrión")}
        description={t(
          "Ritual, generosity, presence — the Gulf majlis, the dallah, the second cup.",
          "Rituel, générosité, présence — le majlis du Golfe, la dallah, la deuxième tasse.",
          "Ritual, generosidad, presencia — el majlis del Golfo, la dallah, la segunda taza."
        )}
      />
      <PageIntro
        number="N° 01"
        eyebrow={t("The Host", "L'Hôte", "El Anfitrión")}
        title={
          <>
            {t("The pour is short.", "La verse est courte.", "El vertido es breve.")}
            <br />
            {t("A quarter cup means", "Un quart de tasse veut dire", "Un cuarto de taza significa")}{" "}
            <span className="font-italic-display">{t("stay", "reste", "quédate")}</span>.
          </>
        }
        essence={t(
          "Ritual, generosity, presence — the Gulf majlis, the dallah, the second cup.",
          "Rituel, générosité, présence — le majlis du Golfe, la dallah, la deuxième tasse.",
          "Ritual, generosidad, presencia — el majlis del Golfo, la dallah, la segunda taza."
        )}
      />

      <BoneImage
        description={IMAGES.host.hero_alt}
        src={IMAGES.host.hero}
        alt={IMAGES.host.hero_alt}
        ratio="aspect-[16/9]"
        className="max-w-[1400px] mx-auto"
      />

      <EditorialBlock eyebrow={t("Philosophy", "Philosophie", "Filosofía")}>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre">
          {t(
            "Hospitality here is not service. It is a form of",
            "L'hospitalité, ici, n'est pas un service. C'est une forme d'",
            "La hospitalidad, aquí, no es un servicio. Es una forma de"
          )}{" "}
          <span className="font-italic-display">{t("attention", "attention", "atención")}</span>{" "}
          {t(
            "that pre-dates the transaction. A cup poured short is an invitation. A cup poured full is a farewell. The maison keeps the pour short.",
            "qui précède la transaction. Une tasse versée courte est une invitation. Une tasse versée pleine est un adieu. La maison garde la verse courte.",
            "que precede a la transacción. Una taza servida corta es una invitación. Una taza servida llena es una despedida. La maison mantiene el vertido corto."
          )}
        </p>
      </EditorialBlock>

      <PullQuote source={t("A saying of the majlis", "Un dicton du majlis", "Un dicho del majlis")}>
        {t("Coffee is patience made warm.", "Le café est la patience rendue chaude.", "El café es paciencia hecha calor.")}
      </PullQuote>

      <EditorialBlock eyebrow={t("Moodboard", "Planche d'ambiance", "Panel de referencias")} wide>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BoneImage
            description="Two eroded travertine slabs cradling a pale disc — the origin form of the host object."
            src={IMAGES.host.detail_1}
            ratio="aspect-[3/4]"
          />
          <BoneImage
            description="A moon-door threshold, plum blossom held inside — the room around the object."
            src={IMAGES.host.detail_2}
            ratio="aspect-[3/4]"
          />
          <BoneImage
            description="Mycelium composite, seen close — the material that holds the vessel."
            src={IMAGES.host.detail_3}
            ratio="aspect-[3/4]"
          />
        </div>
      </EditorialBlock>

      <SectionDivider withSeal />

      <EditorialBlock eyebrow={t("The paired object", "L'objet apparié", "El objeto emparejado")} wide>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5">
            <BoneImage
              description="The Host — Concept 02A. An arch of mycelium cradled in brass."
              src={IMAGES.host.sculpture}
              ratio="aspect-[4/5]"
            />
          </div>
          <div className="md:col-span-7 space-y-8">
            <TrackedCaps>Édition N° 021 — The Host</TrackedCaps>
            <h3 className="font-display text-4xl md:text-5xl leading-tight text-encre">
              {t("A vessel that keeps company.", "Un objet qui tient compagnie.", "Un recipiente que hace compañía.")}
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-encre max-w-xl">
              <div>
                <dt className="tracked mb-2">{t("Material", "Matériau", "Materia")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Eroded travertine, unpolished.", "Travertin érodé, non poli.", "Travertino erosionado, sin pulir.")}
                </dd>
              </div>
              <div>
                <dt className="tracked mb-2">{t("Hand", "Main", "Mano")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Atelier in the Chianciano hills.", "Atelier des collines de Chianciano.", "Atelier en las colinas de Chianciano.")}
                </dd>
              </div>
              <div>
                <dt className="tracked mb-2">{t("Weight", "Poids", "Peso")}</dt>
                <dd className="font-sans text-sm text-encre">42 kg.</dd>
              </div>
              <div>
                <dt className="tracked mb-2">{t("Register", "Registre", "Registro")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Nine pieces set down.", "Neuf pièces inscrites.", "Nueve piezas inscritas.")}
                </dd>
              </div>
            </dl>
            <div className="pt-6">
              <QuietLink to="/preorder" accent data-testid="host-access-link">
                {t("Join the waiting list", "Rejoindre la liste d'attente", "Unirse a la lista de espera")}
              </QuietLink>
            </div>
          </div>
        </div>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorways", "Seuils", "Umbrales")}>
        <div className="flex flex-col gap-6">
          <QuietLink to="/worlds/master" data-testid="host-to-master">
            {t("Next: The Master", "Suivant : Le Maître", "Siguiente: El Maestro")}
          </QuietLink>
          <QuietLink to="/worlds" data-testid="host-to-worlds">
            {t("Back to the three worlds", "Retour aux trois mondes", "Volver a los tres mundos")}
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default WorldHost;
