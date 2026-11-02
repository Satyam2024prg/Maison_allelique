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

const Voice = ({ n, name, essence, line, sang }) => (
  <li className="py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-6">
    <div className="md:col-span-2">
      <TrackedCaps tone={sang ? "sang" : "cendre"}>{n}</TrackedCaps>
    </div>
    <div className="md:col-span-4">
      <h3 className="font-display italic text-5xl md:text-6xl text-encre leading-none">
        {name}
      </h3>
    </div>
    <div className="md:col-span-6 space-y-4">
      <p className="font-display text-xl md:text-2xl text-encre leading-snug">
        {essence}
      </p>
      <p className="font-display italic text-lg text-cendre">
        &ldquo;{line}&rdquo;
      </p>
    </div>
  </li>
);

const Maison = () => {
  const t = useT();

  return (
    <div data-testid="maison-page">
      <Head
        title={t("The Maison", "La Maison", "La Maison")}
        description={t(
          "Maison Allélique — Parisian niche perfume maison at the intersection of biology and new technologies. Home of the three Grails (Alma, Vida, Sereno), seasonal layering Sets, and Allelium, the private AI that prescribes the layering formula.",
          "Maison Allélique — maison de parfums de niche parisienne à la croisée de la biologie et des nouvelles technologies. Maison des trois Graals (Alma, Vida, Sereno), des Sets de superposition saisonniers, et d'Allelium, l'IA privée qui prescrit la formule de superposition.",
          "Maison Allélique — maison de perfumes de nicho parisina en la intersección de la biología y las nuevas tecnologías. Casa de los tres Griales (Alma, Vida, Sereno), de los Sets de superposición de temporada, y de Allelium, la IA privada que prescribe la fórmula de superposición."
        )}
        keywords={t(
          "Maison Allélique, Parisian niche perfume house, haute parfumerie, biology technology, Silent Biome, Alma Vida Sereno, layering perfume set, Allelium, bespoke fragrance",
          "Maison Allélique, maison de parfums de niche Paris, haute parfumerie, biologie technologies, Biome Silencieux, Alma Vida Sereno, coffret de superposition, Allelium, parfum sur mesure",
          "Maison Allélique, casa de perfumes de nicho París, alta perfumería, biología tecnologías, Biome Silencioso, Alma Vida Sereno, set de superposición, Allelium, perfume a medida"
        )}
      />

      <PageIntro
        number="N° 00"
        eyebrow={t("About Us", "À propos", "Nosotros")}
        title={
          <>
            {t("The planet speaks.", "La planète parle.", "El planeta habla.")}
            <br />
            <span className="font-italic-display">
              {t("Maison Allélique translates", "Maison Allélique traduit", "Maison Allélique traduce")}
            </span>
            .
          </>
        }
        essence={t(
          "A Parisian maison at the intersection of biology and new technologies — a house that listens to the unseen life of matter and turns your daily products into art and rituals.",
          "Une maison parisienne à la croisée de la biologie et des nouvelles technologies — une maison qui écoute la vie invisible de la matière et transforme vos produits du quotidien en art et en rituels.",
          "Una maison parisina en la intersección de la biología y las nuevas tecnologías — una casa que escucha la vida invisible de la materia y transforma tus productos cotidianos en arte y rituales."
        )}
      />

      <EditorialBlock eyebrow={t("The Silent Biome", "Le Biome Silencieux", "El Biome Silencioso")}>
        <div className="space-y-10 md:space-y-14 text-encre">
          <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl">
            {t(
              "The rarest luxury is not in a product produced — it lives in your memories.",
              "Le luxe le plus rare n'est pas dans un produit fabriqué — il vit dans vos souvenirs.",
              "El lujo más raro no está en un producto fabricado — vive en tus recuerdos."
            )}
          </p>
          <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-xl">
            {t(
              "Maison Allélique lives in the Silent Biome — a world where nature does not shout, but communicates through invisible signals. Mycelium grows beneath the surface. Skin recognises another skin before language. Rain wakes the forest. Calm remains after the world becomes too fast.",
              "Maison Allélique vit dans le Biome Silencieux — un monde où la nature ne crie pas, mais communique par des signaux invisibles. Le mycélium croît sous la surface. La peau reconnaît une autre peau avant le langage. La pluie éveille la forêt. Le calme demeure quand le monde devient trop rapide.",
              "Maison Allélique vive en el Biome Silencioso — un mundo donde la naturaleza no grita, sino que comunica mediante señales invisibles. El micelio crece bajo la superficie. La piel reconoce a otra piel antes que el lenguaje. La lluvia despierta el bosque. La calma permanece cuando el mundo se vuelve demasiado rápido."
            )}
          </p>
        </div>
      </EditorialBlock>

      <figure className="max-w-[900px] mx-auto px-6 md:px-0">
        <div
          className="relative aspect-[5/6] overflow-hidden bg-[var(--encre)]"
          data-testid="maison-silent-biome-video"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/maison-poster.jpg"
            aria-label={t(
              "A figure crosses the silent water beside a lone tree on an island — the planet speaking.",
              "Une silhouette traverse l'eau silencieuse près d'un arbre solitaire sur une île — la planète qui parle.",
              "Una figura cruza el agua silenciosa junto a un árbol solitario en una isla — el planeta hablando."
            )}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/maison.webm" type="video/webm" />
            <source src="/video/maison.mp4" type="video/mp4" />
          </video>
        </div>
        <figcaption className="mt-6 font-sans text-[10px] tracking-[0.4em] uppercase text-cendre text-center">
          {t(
            "A silent language — the planet before it named itself.",
            "Un langage silencieux — la planète avant qu'elle ne se nomme.",
            "Un lenguaje silencioso — el planeta antes de nombrarse a sí mismo."
          )}
        </figcaption>
      </figure>

      <PullQuote>
        {t(
          "We do not live in the present — we take from the past and walk toward the future.",
          "Nous ne vivons pas le présent — nous prenons du passé et marchons vers le futur.",
          "No vivimos el presente — tomamos del pasado y caminamos hacia el futuro."
        )}
      </PullQuote>

      <EditorialBlock eyebrow={t("The Brand Myth", "Le Mythe", "El Mito")}>
        <div className="space-y-8 max-w-3xl">
          <p className="font-display text-xl md:text-2xl leading-snug text-encre">
            {t(
              "A woman travelled the world. She had seen every city, every coast, every language. And then, at one stop, she no longer recognised where she was.",
              "Une femme parcourait le monde. Elle avait vu chaque ville, chaque littoral, chaque langue. Et puis, à un arrêt, elle ne reconnut plus l'endroit où elle se trouvait.",
              "Una mujer recorría el mundo. Había visto cada ciudad, cada costa, cada lengua. Y entonces, en una parada, dejó de reconocer el lugar en el que estaba."
            )}
          </p>
          <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-xl">
            {t(
              "The place was unknown to her. A forest where light crossed through the trees. Rain drops so wide they looked like diamonds. Birds singing in the branches.",
              "Le lieu lui était inconnu. Une forêt où la lumière traversait les arbres. Des gouttes de pluie si larges qu'elles ressemblaient à des diamants. Des oiseaux qui chantaient dans les branches.",
              "El lugar le era desconocido. Un bosque donde la luz atravesaba los árboles. Gotas de lluvia tan anchas que parecían diamantes. Pájaros que cantaban en las ramas."
            )}
          </p>
          <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-xl">
            {t(
              "And in this world, souls recognised each other without speaking. A crossed glance was enough; a scent on the skin was enough. Mothers and sons, lovers, friends of a lifetime — no one had to be introduced.",
              "Et dans ce monde, les âmes se reconnaissaient sans se parler. Un regard croisé suffisait ; un parfum sur la peau suffisait. Mères et fils, amants, amis de toujours — personne n'avait à se présenter.",
              "Y en ese mundo, las almas se reconocían sin hablarse. Bastaba una mirada cruzada; bastaba un aroma en la piel. Madres e hijos, amantes, amigos de toda la vida — nadie tenía que ser presentado."
            )}
          </p>
          <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-xl">
            {t(
              "At its centre stood a temple, where sound was silence and silence smelled of flowers. Peace, there, was not the absence of noise. Peace, there, was joy.",
              "En son centre se dressait un temple, où le son était silence et le silence sentait la fleur. La paix, là, n'était pas l'absence de bruit. La paix, là, était la joie.",
              "En su centro se alzaba un templo, donde el sonido era silencio y el silencio olía a flores. La paz, allí, no era la ausencia de ruido. La paz, allí, era la alegría."
            )}
          </p>
          <p className="font-display italic text-xl md:text-2xl text-encre leading-snug max-w-2xl pt-4">
            {t(
              "That world is Maison Allélique.",
              "Ce monde est Maison Allélique.",
              "Ese mundo es Maison Allélique."
            )}
          </p>
          <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-xl">
            {t(
              "Some who tell the story dare to say it is the future — because in it, there is a voice that tells each person how to nourish themselves in the right sequence and the right balance. A voice tuned to skin, to season, to the day at hand. Its name is Allelium.",
              "Certains, en racontant l'histoire, osent dire que c'est l'avenir — car il s'y trouve une voix qui dit à chacun comment se nourrir dans la juste séquence et le juste équilibre. Une voix accordée à la peau, à la saison, au jour présent. Elle s'appelle Allelium.",
              "Algunos, al contarla, se atreven a decir que es el futuro — porque en ella existe una voz que le dice a cada persona cómo nutrirse en la secuencia justa y el equilibrio justo. Una voz afinada a la piel, a la temporada, al día presente. Se llama Allelium."
            )}
          </p>
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-cendre pt-6">
            {t(
              "Past or future — we do not decide. We open the door.",
              "Passé ou avenir — nous ne tranchons pas. Nous ouvrons la porte.",
              "Pasado o futuro — no decidimos. Abrimos la puerta."
            )}
          </p>
        </div>
      </EditorialBlock>

      <SectionDivider withSeal />

      {/* THE REFUSAL — the villain the maison stands against */}
      <EditorialBlock eyebrow={t("The Refusal", "Le Refus", "El Rechazo")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-6xl text-encre leading-[0.98] mb-8">
              {t("There is a kind of luxury we", "Il y a un luxe que nous", "Hay un lujo que")}{" "}
              <span className="font-italic-display">
                {t("do not make.", "ne faisons pas.", "no hacemos.")}
              </span>
            </h2>
            <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-md">
              {t(
                "One that ships by the ton. That advertises louder than the object itself. That promises everything to everyone. That designs one bottle for a million lives, and calls it desire.",
                "Un luxe qui se livre à la tonne. Qui parle plus fort que l'objet. Qui promet tout à tout le monde. Qui dessine un seul flacon pour un million de vies, et appelle cela le désir.",
                "Un lujo que se envía por toneladas. Que anuncia más alto que el objeto. Que promete todo a todo el mundo. Que diseña un solo frasco para un millón de vidas, y lo llama deseo."
              )}
            </p>
          </div>
          <div className="space-y-8 max-w-md">
            <p className="font-display italic text-2xl md:text-3xl text-encre leading-snug">
              {t(
                "We compose against noise. Against excess. Against the identical.",
                "Nous composons contre le bruit. Contre l'excès. Contre l'identique.",
                "Componemos contra el ruido. Contra el exceso. Contra lo idéntico."
              )}
            </p>
            <p className="font-sans text-sm md:text-base text-cendre leading-relaxed">
              {t(
                "What is made once, for one person, is the opposite of what is made everywhere, for anyone. Our answer to overconsumption is a smaller answer. A slower one. One object. One register. One voice.",
                "Ce qui est fait une fois, pour une seule personne, est l'inverse de ce qui est fait partout, pour n'importe qui. Notre réponse à la surconsommation est une réponse plus petite. Plus lente. Un objet. Un registre. Une voix.",
                "Lo que se hace una vez, para una persona, es lo contrario de lo que se hace en todas partes, para cualquiera. Nuestra respuesta al sobreconsumo es una respuesta más pequeña. Más lenta. Un objeto. Un registro. Una voz."
              )}
            </p>
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-sang pt-2">
              {t(
                "The empty promise ends here.",
                "La promesse vide s'arrête ici.",
                "La promesa vacía termina aquí."
              )}
            </p>
          </div>
        </div>
      </EditorialBlock>

      <SectionDivider withSeal />

      <EditorialBlock eyebrow={t("The Three Voices", "Les Trois Voix", "Las Tres Voces")} wide>
        <p className="font-display italic text-xl md:text-2xl text-cendre max-w-2xl leading-snug mb-12">
          {t(
            "The Silent Biome speaks in three registers. Each is a being with an emotional essence — recognition, awakening, stillness.",
            "Le Biome Silencieux parle en trois registres. Chacun est un être doué d'une essence émotionnelle — reconnaissance, éveil, calme.",
            "El Biome Silencioso habla en tres registros. Cada uno es un ser con una esencia emocional — reconocimiento, despertar, quietud."
          )}
        </p>
        <ul className="flex flex-col divide-y divide-encre/10">
          <Voice
            n="N° 01"
            name="Alma"
            essence={t(
              "The planet speaks through recognition — skin, closeness, belonging.",
              "La planète parle par la reconnaissance — la peau, la proximité, l'appartenance.",
              "El planeta habla a través del reconocimiento — piel, cercanía, pertenencia."
            )}
            line={t("I know you.", "Je te connais.", "Te conozco.")}
          />
          <Voice
            n="N° 02"
            name="Vida"
            essence={t(
              "The planet speaks through awakening — rain, roots, moss, light returning after the storm.",
              "La planète parle par l'éveil — la pluie, les racines, la mousse, la lumière qui revient après l'orage.",
              "El planeta habla a través del despertar — lluvia, raíces, musgo, luz que regresa tras la tormenta."
            )}
            line={t("I am alive.", "Je suis vivante.", "Estoy viva.")}
          />
          <Voice
            n="N° 03"
            name="Sereno"
            essence={t(
              "The planet speaks through stillness — warm silence, a refuge carried on the skin.",
              "La planète parle par le calme — un silence chaud, un refuge porté sur la peau.",
              "El planeta habla a través de la quietud — silencio cálido, refugio llevado sobre la piel."
            )}
            line={t("Stay.", "Reste.", "Quédate.")}
            sang
          />
        </ul>
        <div className="mt-16">
          <QuietLink to="/editions/parfum" accent data-testid="maison-parfum-link">
            {t("Meet the three Grail perfumes →", "Rencontrer les trois parfums Graal →", "Conocer los tres perfumes Grial →")}
          </QuietLink>
        </div>
      </EditorialBlock>

      <SectionDivider />

      <EditorialBlock eyebrow={t("Method", "Méthode", "Método")}>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre mb-12">
          {t(
            "We do not sell products. We compose",
            "Nous ne vendons pas de produits. Nous composons des",
            "No vendemos productos. Componemos"
          )}{" "}
          <span className="font-italic-display">
            {t("ceremonies", "cérémonies", "ceremonias")}
          </span>
          .{" "}
          {t(
            "Composition is a conversation between a chosen material and a chosen person. Everything we make is named, sourced, dated, and set down in our register.",
            "La composition est une conversation entre une matière choisie et une personne choisie. Tout ce que nous faisons est nommé, sourcé, daté, et inscrit à notre registre.",
            "La composición es una conversación entre una materia elegida y una persona elegida. Todo lo que hacemos está nombrado, procedente, fechado e inscrito en nuestro registro."
          )}
        </p>
        <QuietLink to="/layering" data-testid="maison-layering-link">
          {t("Compose your signature — the model", "Composez votre signature — le modèle", "Compón tu firma — el modelo")}
        </QuietLink>
      </EditorialBlock>

      <SectionDivider withSeal />

      <EditorialBlock eyebrow={t("Paris", "Paris", "París")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-display italic text-xl md:text-2xl text-encre leading-snug">
              {t(
                "The maison keeps its address in Paris because Paris knows how to be timeless.",
                "La maison garde son adresse à Paris parce que Paris sait être intemporelle.",
                "La maison mantiene su dirección en París porque París sabe ser atemporal."
              )}
            </p>
            <p className="mt-8 font-sans text-sm text-cendre leading-relaxed max-w-md">
              {t(
                "Our atelier is by appointment only. We do not receive without an introduction; we do not deliver without a ceremony.",
                "Notre atelier n'ouvre que sur rendez-vous. Nous ne recevons pas sans introduction ; nous ne livrons pas sans cérémonie.",
                "Nuestro atelier abre solo con cita previa. No recibimos sin presentación; no entregamos sin ceremonia."
              )}
            </p>
          </div>
          <BoneImage
            description="A pale sculpture in Parisian light."
            src={IMAGES.maison.hero}
            ratio="aspect-[4/5]"
          />
        </div>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorways", "Seuils", "Umbrales")}>
        <div className="flex flex-col gap-6">
          <QuietLink to="/values" data-testid="maison-values-link">
            {t("Read our values", "Lire nos valeurs", "Leer nuestros valores")}
          </QuietLink>
          <QuietLink to="/worlds" data-testid="maison-worlds-link">
            {t("Enter the three worlds", "Entrer dans les trois mondes", "Entrar en los tres mundos")}
          </QuietLink>
          <QuietLink to="/preorder" accent data-testid="maison-access-link">
            {t("Join the waiting list", "Rejoindre la liste d'attente", "Unirse a la lista de espera")}
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default Maison;
