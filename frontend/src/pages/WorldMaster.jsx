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

const WorldMaster = () => {
  const t = useT();
  return (
    <div data-testid="world-master-page">
      <Head
        title={t("The Master", "Le Maître", "El Maestro")}
        description={t(
          "Material, mastery, impermanence — wabi-sabi, raku, the honest seam of kintsugi.",
          "Matière, maîtrise, impermanence — wabi-sabi, raku, la couture honnête du kintsugi.",
          "Materia, maestría, impermanencia — wabi-sabi, raku, la costura honesta del kintsugi."
        )}
      />
      <PageIntro
        number="N° 02"
        eyebrow={t("The Master", "Le Maître", "El Maestro")}
        title={
          <>
            {t("The form is not designed.", "La forme n'est pas dessinée.", "La forma no se diseña.")}
            <br />
            {t("It is", "Elle est", "Se")}{" "}
            <span className="font-italic-display">{t("grown", "cultivée", "cultiva")}</span>.
          </>
        }
        essence={t(
          "Material, mastery, impermanence — wabi-sabi, raku, the honest seam of kintsugi.",
          "Matière, maîtrise, impermanence — wabi-sabi, raku, la couture honnête du kintsugi.",
          "Materia, maestría, impermanencia — wabi-sabi, raku, la costura honesta del kintsugi."
        )}
      />

      <BoneImage
        description={IMAGES.master.hero_alt}
        src={IMAGES.master.hero}
        alt={IMAGES.master.hero_alt}
        ratio="aspect-[16/9]"
        className="max-w-[1400px] mx-auto"
      />

      <EditorialBlock eyebrow={t("Philosophy", "Philosophie", "Filosofía")}>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre">
          {t(
            "Mastery does not conceal the making. It signs it. When a vessel breaks, the seam is drawn in",
            "La maîtrise ne dissimule pas la fabrication. Elle la signe. Quand un objet se brise, la couture est tracée au",
            "La maestría no oculta la hechura. La firma. Cuando un recipiente se rompe, la costura se traza con"
          )}{" "}
          <span className="font-italic-display" style={{ color: "var(--sang)" }}>
            {t("cinnabar", "cinabre", "cinabrio")}
          </span>{" "}
          —{" "}
          {t(
            "not gold — because we prefer the mark of blood to the mark of currency.",
            "et non à l'or — parce que nous préférons la marque du sang à la marque de la monnaie.",
            "no con oro — porque preferimos la marca de la sangre a la marca de la moneda."
          )}
        </p>
      </EditorialBlock>

      <PullQuote source={t("A note from the atelier", "Une note de l'atelier", "Una nota del atelier")}>
        {t("Repair is not a return. It is a translation.", "La réparation n'est pas un retour. C'est une traduction.", "La reparación no es un regreso. Es una traducción.")}
      </PullQuote>

      <EditorialBlock eyebrow={t("Moodboard", "Planche d'ambiance", "Panel de referencias")} wide>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <BoneImage
              description="Clay Form, 1964 — Suzuki Osamu. A wabi-sabi monolith authored by the fire."
              src={IMAGES.master.detail_1}
              ratio="aspect-[3/4]"
            />
          </div>
          <div className="md:col-span-4">
            <BoneImage
              description="Cordyceps in the pine litter — the living matrix from which we grow the object."
              src={IMAGES.master.detail_2}
              ratio="aspect-[3/4]"
            />
          </div>
          <div className="md:col-span-3 kintsugi-seam pl-6">
            <BoneImage
              description="The Master — a form grown, not designed. Mycelium set upright."
              src={IMAGES.master.sculpture}
              ratio="aspect-[3/4]"
            />
          </div>
        </div>
      </EditorialBlock>

      <SectionDivider />

      <EditorialBlock eyebrow={t("The paired object", "L'objet apparié", "El objeto emparejado")} wide>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5">
            <BoneImage
              description="Three Monks aligned — the register of pieces set down, each unrepeatable."
              src={IMAGES.master.trio}
              ratio="aspect-[4/5]"
            />
          </div>
          <div className="md:col-span-7 space-y-8">
            <TrackedCaps>Édition N° 034 — The Master</TrackedCaps>
            <h3 className="font-display text-4xl md:text-5xl leading-tight text-encre">
              {t("A vessel that remembers its break.", "Un objet qui se souvient de sa fracture.", "Un recipiente que recuerda su rotura.")}
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-encre max-w-xl">
              <div>
                <dt className="tracked mb-2">{t("Material", "Matériau", "Materia")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Raku-fired stoneware.", "Grès cuit au raku.", "Gres cocido al raku.")}
                </dd>
              </div>
              <div>
                <dt className="tracked mb-2">{t("Seam", "Couture", "Costura")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Urushi & cinnabar lacquer, hand-drawn.", "Laque urushi et cinabre, tracée à la main.", "Laca urushi y cinabrio, trazada a mano.")}
                </dd>
              </div>
              <div>
                <dt className="tracked mb-2">{t("Hand", "Main", "Mano")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Kiln in Shigaraki, Shiga.", "Four à Shigaraki, Shiga.", "Horno en Shigaraki, Shiga.")}
                </dd>
              </div>
              <div>
                <dt className="tracked mb-2">{t("Register", "Registre", "Registro")}</dt>
                <dd className="font-sans text-sm text-encre">
                  {t("Seven pieces set down.", "Sept pièces inscrites.", "Siete piezas inscritas.")}
                </dd>
              </div>
            </dl>
            <div className="pt-6">
              <QuietLink to="/preorder" accent data-testid="master-access-link">
                {t("Join the waiting list", "Rejoindre la liste d'attente", "Unirse a la lista de espera")}
              </QuietLink>
            </div>
          </div>
        </div>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorways", "Seuils", "Umbrales")}>
        <div className="flex flex-col gap-6">
          <QuietLink to="/worlds/observer" data-testid="master-to-observer">
            {t("Next: The Observer", "Suivant : L'Observateur", "Siguiente: El Observador")}
          </QuietLink>
          <QuietLink to="/worlds" data-testid="master-to-worlds">
            {t("Back to the three worlds", "Retour aux trois mondes", "Volver a los tres mundos")}
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default WorldMaster;
