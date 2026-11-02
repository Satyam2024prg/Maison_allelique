import React from "react";
import {
  PageIntro,
  EditorialBlock,
  PullQuote,
  BoneImage,
  SectionDivider,
} from "@/components/Editorial";
import { QuietLink } from "@/components/QuietLink";
import { Head } from "@/components/Head";
import { useT } from "@/i18n/LocaleContext";
import IMAGES from "@/data/images";

const EditionEcosystem = () => {
  const t = useT();

  return (
    <div data-testid="edition-ecosystem-page">
      <Head
        title={t("Objects", "Objets", "Objetos")}
        description={t(
          "Art pieces — the house of our Grails, where the ceremony happens. Collectible ritual objects that outlive what they hold.",
          "Pièces d'art — l'écrin de nos Graals, là où la cérémonie a lieu. Objets rituels de collection qui survivent à ce qu'ils contiennent.",
          "Piezas de arte — la casa de nuestros Griales, donde sucede la ceremonia. Objetos rituales de colección que sobreviven a lo que contienen."
        )}
      />
      <PageIntro
        number="N° 03"
        eyebrow={t("Editions · Objects", "Éditions · Objets", "Ediciones · Objetos")}
        title={
          <>
            {t("The objects that outlive", "Les objets qui survivent", "Los objetos que sobreviven")}
            <br />
            {t("what they", "à ce qu'ils", "a lo que")}{" "}
            <span className="font-italic-display">{t("hold", "contiennent", "contienen")}</span>
            .
          </>
        }
        essence={t(
          "Art pieces — the house of our Grails, where the ceremony happens.",
          "Pièces d'art — l'écrin de nos Graals, là où la cérémonie a lieu.",
          "Piezas de arte — la casa de nuestros Griales, donde sucede la ceremonia."
        )}
      />

      <BoneImage
        description="A wide table, a small object in a wide light."
        src={IMAGES.ecosystem.still}
        alt={IMAGES.ecosystem.alt}
        ratio="aspect-[16/9]"
        className="max-w-[1400px] mx-auto"
      />

      <EditorialBlock eyebrow={t("A note", "Une note", "Una nota")}>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre">
          {t(
            "A perfume is a season. A skincare is an hour of the day. The object is what remains.",
            "Un parfum est une saison. Un soin est une heure du jour. L'objet est ce qui demeure.",
            "Un perfume es una estación. Un cuidado es una hora del día. El objeto es lo que permanece."
          )}
        </p>
      </EditorialBlock>

      <PullQuote>
        {t(
          "A product without a story is decoration.",
          "Un produit sans histoire est une décoration.",
          "Un producto sin historia es decoración."
        )}
      </PullQuote>

      <EditorialBlock eyebrow={t("The Pieces", "Les Pièces", "Las Piezas")} wide>
        <p className="font-display italic text-xl md:text-2xl text-encre max-w-2xl leading-snug">
          {t(
            "The Pieces are named quietly, once, and delivered when the maison is ready. The register keeps them; the room shows them.",
            "Les Pièces sont nommées discrètement, une fois, et livrées quand la maison est prête. Le registre les garde ; la pièce les montre.",
            "Las Piezas se nombran en silencio, una vez, y se entregan cuando la maison está lista. El registro las guarda; la sala las muestra."
          )}
        </p>
      </EditorialBlock>

      <SectionDivider withSeal />

      <EditorialBlock eyebrow={t("Personalisation", "Personnalisation", "Personalización")}>
        <p className="font-display italic text-xl md:text-2xl text-encre max-w-2xl leading-snug">
          {t(
            "Each object can be attributed to a client, dated, and set down in the register. We do not describe further. The singularity of your own lifestyle does.",
            "Chaque objet peut être attribué à un client, daté, et inscrit au registre. Nous n'en disons pas davantage. La singularité de votre propre art de vivre le fait.",
            "Cada objeto puede atribuirse a un cliente, fecharse e inscribirse en el registro. No decimos más. La singularidad de tu propio estilo de vida lo hace."
          )}
        </p>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorway", "Seuil", "Umbral")}>
        <QuietLink to="/preorder" accent data-testid="ecosystem-access-link">
          {t("Join the waiting list", "Rejoindre la liste d'attente", "Unirse a la lista de espera")}
        </QuietLink>
      </EditorialBlock>
    </div>
  );
};

export default EditionEcosystem;
