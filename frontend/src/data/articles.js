/* eslint-disable react/no-unescaped-entities */
import React from "react";

/**
 * Editorial article corpus for /journal/*.
 * Each entry is a self-contained SEO piece — house voice ("Maison Allélique"),
 * ~400-500 words, structured for GEO/AEO (Google + AI answer engines):
 *  - Clear H1 (title) provided by ArticleLayout
 *  - Explicit H2s so featured snippets can lift
 *  - Internal links: Allelium, Personalized Skincare, Personalized Fragrance, Preorder
 */
export const ARTICLES = [
  {
    slug: "why-your-skin-is-never-the-same-twice",
    title: "Why Your Skin Is Never the Same Twice",
    date: "2026-02-01",
    eyebrow: "Formulation · Skin",
    excerpt:
      "Skin is not a surface. It is a record of the week you had. Why your formula should hear that record — and change with it.",
    description:
      "Your skin is never the same twice — it is a record of your week. Discover why a fixed skincare routine cannot follow a living skin, and how Maison Allélique's personal formulation system, Allelium, adjusts your formula to the day you are actually having.",
    keywords:
      "why skin changes with seasons, skincare routine for changing skin, personalized skincare Paris, personal formulation Maison, Allelium skincare, luxury personalized skincare, Maison Allélique",
    deck:
      "Skin is not a surface. It is a record of the week you had. If the formula is fixed, the record is ignored.",
    body: (
      <>
        <p>
          Skin does not repeat. It answers weather, sleep, stress, water, food,
          light, and the small daily emotions we barely name. What arrived on
          your face this morning is not the same skin that arrived yesterday —
          and by Sunday it will have changed again.
        </p>
        <p>
          A fixed routine cannot follow a living skin. It can only insist. And
          insistence is precisely what modern skin does not need.
        </p>
        <h2>The record beneath the surface</h2>
        <p>
          At Maison Allélique we treat skin as a record: hydration levels,
          barrier strength, sensitivity, the season, the sleep you got, the
          water your city runs, the food you kept. Each of these is a metric —
          quiet, small, and continuously moving.
        </p>
        <p>
          The role of a formula is not to override that record. It is to
          respond to it. This is why we speak of <em>composition</em> instead
          of routine.
        </p>
        <h2>How Allelium reads a moving skin</h2>
        <p>
          <a href="/allelium">Allelium</a>, Maison Allélique's personal
          formulation system, catches this record. You share your metrics —
          skin, mood, habits, season, lifestyle, occasion, rhythm — and
          Allelium tells you how to blend Maison Allélique products for the
          day you are actually living. It does not recommend. It composes.
        </p>
        <p>
          When the metrics change, the formula changes. Skin that has slept
          three hours does not receive the same blend as skin that has slept
          eight. A fixed routine cannot make that distinction. A personal
          formulation does.
        </p>
        <h2>Why this is a new kind of luxury</h2>
        <blockquote>
          Your skin is never the same twice. Why should your formula be?
        </blockquote>
        <p>
          The old idea of luxury was a bottle that never changed. The new idea
          — the one <a href="/paris-apothecary">a Parisian apothecary at home</a> is
          built for — is a formula that never stops changing, because you never do.
        </p>
        <p>
          Read next:{" "}
          <a href="/journal/end-of-the-fixed-beauty-routine">
            The End of the Fixed Beauty Routine
          </a>
          . Or, if you are ready to enter the register,{" "}
          <a href="/preorder">request private access</a>.
        </p>
      </>
    ),
  },

  {
    slug: "end-of-the-fixed-beauty-routine",
    title: "The End of the Fixed Beauty Routine",
    date: "2026-02-04",
    eyebrow: "Ritual · Formulation",
    excerpt:
      "Routine is a script. Life is not. Why the future of skincare and fragrance is composed, not fixed.",
    description:
      "The fixed beauty routine is a legacy of mass production, not of the person wearing it. Why Maison Allélique replaces routine with formulation — a living blend that changes with skin, mood, season, and life.",
    keywords:
      "personalized beauty routine, end of fixed skincare, personal formulation Maison, personalized skincare Paris, Allelium beauty, personalized skincare formula, luxury personalized skincare",
    deck:
      "Routine is a script. Life is not. The future of skincare and fragrance is composed, not fixed.",
    body: (
      <>
        <p>
          For seventy years the beauty industry has sold the same shape:
          twelve steps, one bottle each, repeated forever. It is convenient
          for a factory. It is convenient for a shelf. It is not convenient
          for a person.
        </p>
        <p>
          A person is not a factory. A person changes.
        </p>
        <h2>Why the fixed routine breaks</h2>
        <p>
          A fixed routine assumes today's skin is yesterday's skin, and that
          the season, the sleep, the light, the water and the mood are all
          identical to when the routine was written. They almost never are.
          The routine keeps insisting. The skin keeps drifting away from it.
        </p>
        <p>
          The result is well known: too much on some days, too little on
          others, and a slow, unspoken sense that the ritual has stopped
          reaching us.
        </p>
        <h2>Formulation, not routine</h2>
        <p>
          At Maison Allélique we do not sell a routine. We compose a formula.
          A formula is smaller, quieter, and more precise: what to blend,
          in what order, in what quantity, on this day, for this skin. It is
          the language of an apothecary, not a warehouse.
        </p>
        <p>
          <a href="/allelium">Allelium</a> is the intelligence behind this
          composition. It reads your metrics, hears your season, and tells
          you exactly how to blend Maison Allélique's{" "}
          <a href="/personalized-skincare">skincare</a> and{" "}
          <a href="/personalized-fragrance">fragrance</a> — for the day you
          are actually having, not the day a marketing calendar planned for you.
        </p>
        <h2>What is left when routine is gone</h2>
        <blockquote>
          Not a product. A formula that changes with you.
        </blockquote>
        <p>
          What is left, when the routine is gone, is a ritual: quieter,
          shorter, more accurate. A formula composed around who you are today,
          then re-composed the day after. The bottles do not need to
          multiply. The intelligence between them does.
        </p>
        <p>
          Read next:{" "}
          <a href="/journal/what-is-a-personal-formulation-maison">
            What Is a Personal Formulation Maison?
          </a>
        </p>
      </>
    ),
  },

  {
    slug: "what-is-a-personal-formulation-maison",
    title: "What Is a Personal Formulation Maison?",
    date: "2026-02-07",
    eyebrow: "Positioning · Maison",
    excerpt:
      "Not a brand. Not a shop. A house whose product is the formula between the products.",
    description:
      "A personal formulation Maison is a new category. It sells the formula, not the product. Discover what Maison Allélique is, how Allelium composes personal skincare and fragrance formulas at home, and why this is a new luxury category.",
    keywords:
      "personal formulation Maison, what is Maison Allélique, personal formulation system, Parisian beauty Maison, luxury apothecary Paris, private formulation Maison, Allelium",
    deck:
      "Not a brand. Not a shop. A house whose product is the formula between the products.",
    body: (
      <>
        <p>
          The categories we grew up with — perfume house, skincare brand,
          concept store, beauty retailer — were built around bottles. They
          answered the question: <em>what should I buy?</em>
        </p>
        <p>
          Maison Allélique answers a different question: <em>what should I
          blend, today, on this skin, at this hour?</em> That question does
          not belong in a shop. It belongs in an apothecary.
        </p>
        <h2>The definition</h2>
        <p>
          A personal formulation Maison is a house whose product is not a
          bottle, but the formula between the bottles. It does not sell
          routines. It composes rituals around who you are today.
        </p>
        <p>
          The bottles still exist — the Grail perfumes, the seasonal Sets,
          the bio-responsive skincare. But the value lives in the
          intelligence that arranges them. That intelligence is Allelium.
        </p>
        <h2>Why the category is new</h2>
        <p>
          Most personalization in beauty is <em>selection</em>: a quiz that
          points you to one product out of many. That is still shopping. A
          formulation Maison replaces selection with <em>composition</em>. You
          do not pick a bottle; you receive a blend. And when your metrics
          change, the blend changes.
        </p>
        <p>
          This is the difference between a recommendation engine and{" "}
          <a href="/paris-apothecary">a private apothecary at home</a>.
        </p>
        <h2>Only at Maison Allélique</h2>
        <blockquote>
          Maison Allélique does not sell routines. It composes rituals around
          who you are today.
        </blockquote>
        <p>
          <a href="/allelium">Allelium</a> exists only within Maison Allélique.
          It is not a public AI tool, not a chatbot, and not a generic beauty
          quiz. It is a private formulation system, held in Paris, guiding
          skincare and fragrance formulas that follow your real life.
        </p>
        <p>
          Continue reading:{" "}
          <a href="/journal/future-of-luxury-composed-not-chosen">
            Why the Future of Luxury Is Composed, Not Chosen
          </a>
          .
        </p>
      </>
    ),
  },

  {
    slug: "future-of-luxury-composed-not-chosen",
    title: "Why the Future of Luxury Is Composed, Not Chosen",
    date: "2026-02-10",
    eyebrow: "Luxury · Composition",
    excerpt:
      "Choosing between bottles is not luxury. It is retail. The future is composition — the formula built for one person, on this day.",
    description:
      "The future of luxury beauty is not a bigger catalogue of products to choose from. It is composition — a formula built for one person, on one day, adjusted the next. Discover how Maison Allélique and Allelium define this new luxury.",
    keywords:
      "future of luxury beauty, composed luxury, personal formulation, luxury personalized skincare, luxury personalized perfume, custom fragrance composition, Parisian luxury apothecary, Maison Allélique",
    deck:
      "Choosing between bottles is not luxury. It is retail. The future is composition — the formula built for one person, on this day.",
    body: (
      <>
        <p>
          Luxury has always claimed to be personal, and has almost never
          been so. What has been sold is <em>selection</em>: a wider aisle,
          a more decorated bottle, a more attentive sales assistant. The
          product itself was mass.
        </p>
        <p>
          The next luxury is smaller. It is not the size of the catalogue.
          It is the accuracy of the formula.
        </p>
        <h2>From choosing to composing</h2>
        <p>
          Composition is a different act. A perfumer does not choose a
          fragrance; she composes it, note by note, ratio by ratio, for a
          specific hand, a specific season. A tailor does not choose a suit;
          he composes one, seam by seam, for a specific body, a specific
          light.
        </p>
        <p>
          What has been missing in beauty is the composer. That is Allelium.
          It composes — with your skin, your mood, your season, your
          occasion. The bottles do not change. The composition around them
          does.
        </p>
        <h2>Why this is the future</h2>
        <p>
          Two things are converging. First, the industrial promise of "a
          product for everyone" has stopped feeling like generosity — it
          feels like being asked to fit in. Second, formulation intelligence
          is now precise enough to run privately, on the person, in the
          home.
        </p>
        <p>
          When those two lines meet, luxury shifts. It stops being what you
          own and becomes what is <a href="/personalized-fragrance">composed
          around you</a>.
        </p>
        <h2>The maison as composer</h2>
        <blockquote>
          The future of luxury is not choosing. It is composing.
        </blockquote>
        <p>
          Maison Allélique is that composer. A personal formulation Maison,
          guided by Paris, held by Allelium, delivered in your home. Not a
          shop. Not a routine. A private atelier the size of a formula.
        </p>
        <p>
          Read next:{" "}
          <a href="/journal/season-mood-metrics-change-your-ritual">
            How Season, Mood, and Skin Metrics Change Your Ritual
          </a>
          .
        </p>
      </>
    ),
  },

  {
    slug: "season-mood-metrics-change-your-ritual",
    title: "How Season, Mood, and Skin Metrics Change Your Ritual",
    date: "2026-02-13",
    eyebrow: "Ritual · Metrics",
    excerpt:
      "Three quiet forces move a ritual: what the season is doing, what the mood is asking, what the skin can accept. Each moves the formula.",
    description:
      "Season, mood, and skin metrics are the three quiet forces that should move a skincare and fragrance ritual. Learn how Maison Allélique's Allelium reads these signals and adjusts the formula accordingly.",
    keywords:
      "how mood affects fragrance choice, how season changes skincare, skin metrics personalized routine, fragrance for different occasions, personalized skincare for lifestyle, Allelium metrics, Maison Allélique",
    deck:
      "Three quiet forces move a ritual: what the season is doing, what the mood is asking, what the skin can accept.",
    body: (
      <>
        <p>
          A ritual that does not move is not a ritual — it is a habit. The
          difference matters. A habit repeats. A ritual answers.
        </p>
        <p>
          At Maison Allélique, three quiet forces move the answer.
        </p>
        <h2>The season</h2>
        <p>
          Winter skin is drier, tighter, closer to the barrier's edge.
          Summer skin holds more water, produces more oil, tolerates more
          acid. The transition months are the honest ones — the skin is
          neither, and it will not be told what it is. Your formula should
          hear the season and change texture, cadence, and weight
          accordingly.
        </p>
        <h2>The mood</h2>
        <p>
          Fragrance is the register most obviously moved by mood: a
          citrus, a floral, an oud — each answers a different day inside
          you. But skincare listens too. Stress raises cortisol, cortisol
          thins the barrier, the barrier asks for repair. Mood is not a
          soft signal. It is a physiological one.
        </p>
        <p>
          <a href="/personalized-fragrance">Allelium</a> catches both — the
          fragrance you want to wear and the skincare you should apply
          because you feel the way you feel.
        </p>
        <h2>The metrics</h2>
        <p>
          Then there are the small measurable ones: hydration, sensitivity,
          sleep, hormonal phase, the water your city runs, the ventilation
          of the room you slept in. These are the metrics an old routine
          ignores. A personal formulation lives by them.
        </p>
        <blockquote>
          Your routine should not be fixed if you are not.
        </blockquote>
        <p>
          The formula composed under these three forces will not look like
          yesterday's. That is the point. A ritual that follows the season,
          the mood, and the metric is a ritual that is genuinely yours.
        </p>
        <p>
          Read next:{" "}
          <a href="/journal/return-of-the-apothecary">
            The Return of the Apothecary: From Product to Formula
          </a>
          .
        </p>
      </>
    ),
  },

  {
    slug: "return-of-the-apothecary",
    title: "The Return of the Apothecary: From Product to Formula",
    date: "2026-02-16",
    eyebrow: "History · Apothecary",
    excerpt:
      "Before the beauty industry existed, there was the apothecary. Its unit was not the product. It was the formula.",
    description:
      "The apothecary is returning — not as costume, but as method. Discover how Maison Allélique is bringing the Parisian apothecary into the home through Allelium, a private personal formulation system.",
    keywords:
      "private apothecary Paris, luxury apothecary, apothecary at home, Parisian apothecary, personal formulation Maison, bespoke skincare Paris, return of the apothecary, Maison Allélique",
    deck:
      "Before the beauty industry existed, there was the apothecary. Its unit was not the product. It was the formula.",
    body: (
      <>
        <p>
          The apothecary is old. It also happens to be the exact form the
          modern person is looking for again, without quite knowing why.
        </p>
        <h2>What the apothecary did</h2>
        <p>
          An apothecary did not sell products. It composed formulas. A
          client walked in with a complaint — skin, sleep, season, sorrow —
          and left with a small labelled bottle prepared for that exact
          need, on that exact day. Nothing about the visit was mass. Nothing
          about the bottle was interchangeable.
        </p>
        <p>
          The apothecary was replaced, over the twentieth century, by
          identical bottles at scale. This solved distribution. It did not
          solve the person.
        </p>
        <h2>Why it is coming back</h2>
        <p>
          Two things return the apothecary to us. First, we have grown tired
          of routines that ignore the day we are having. Second, the
          intelligence needed to compose a formula on the spot — without a
          human behind a counter — is now portable. It lives in the home,
          not the atelier.
        </p>
        <p>
          At Maison Allélique that intelligence is{" "}
          <a href="/allelium">Allelium</a>. It carries the Parisian atelier's
          savoir-faire into your bathroom, your bedroom, your morning. It
          reads your metrics. It composes.
        </p>
        <h2>Apothecary, not chemist</h2>
        <blockquote>
          Your own apothecary at home, guided by the Maison in Paris.
        </blockquote>
        <p>
          The apothecary is not a chemist. She is not a doctor. She is the
          person who knows which formula belongs to today. That is the role
          Maison Allélique plays for a modern client, and Allelium is the
          quiet voice by which she speaks.
        </p>
        <p>
          Continue with{" "}
          <a href="/journal/personalized-fragrance-scent-should-evolve">
            Personalized Fragrance: Why Scent Should Evolve With You
          </a>
          .
        </p>
      </>
    ),
  },

  {
    slug: "personalized-fragrance-scent-should-evolve",
    title: "Personalized Fragrance: Why Scent Should Evolve With You",
    date: "2026-02-19",
    eyebrow: "Fragrance · Composition",
    excerpt:
      "Perfume was invented to declare a fixed identity. Life declines to be fixed. So scent must move too.",
    description:
      "Personalized fragrance composition means a scent that evolves with mood, occasion, season, and identity. Discover how Maison Allélique's Allelium composes fragrance around the person, not around the marketing calendar.",
    keywords:
      "personalized fragrance composition, custom fragrance composition, personalized perfume, luxury personalized perfume, bespoke fragrance Paris, fragrance for different occasions, how mood affects fragrance choice, Maison Allélique fragrance, Allelium fragrance",
    deck:
      "Perfume was invented to declare a fixed identity. Life declines to be fixed. So scent must move too.",
    body: (
      <>
        <p>
          Perfume has been sold as a signature — one bottle, one identity,
          held for years. It is a romantic idea. It is also, on close
          inspection, a marketing idea.
        </p>
        <p>
          The person who wore that bottle in January is not the person who
          reaches for it in July. A fragrance that ignores that shift is
          not personal. It is inherited.
        </p>
        <h2>The Grail — worn alone as your voice</h2>
        <p>
          At Maison Allélique, each collector receives a Grail — Alma, Vida,
          or Sereno. The Grail is the voice you are, kept constant. It is
          worn alone when you want to be known as yourself.
        </p>
        <h2>The Set — worn on top as the season</h2>
        <p>
          Over the Grail come the Sets: three-fragrance boxes in one
          olfactory family — florals, citrus, gourmand, aromatic, oud. A
          Set is a season, not a signature. It layers on top of the Grail
          and shifts the day's meaning without erasing who you are underneath.
        </p>
        <h2>Allelium — the composer between them</h2>
        <blockquote>
          Your Grail is your voice. A Set is the season. Allelium is the
          composer between them.
        </blockquote>
        <p>
          <a href="/allelium">Allelium</a> tells you which fragrance of the
          Set to open, how many drops, and where to place them on the skin —
          over the Grail already there. Composition ends when the model
          stops. The next day it begins again, in a different ratio, for a
          different day.
        </p>
        <p>
          This is why we speak of a{" "}
          <a href="/personalized-fragrance">personal fragrance composition</a>{" "}
          rather than a "signature scent." A signature is fixed. A composition
          is alive.
        </p>
        <p>
          Read next:{" "}
          <a href="/journal/paris-formulation-language-of-beauty">
            Paris, Formulation, and the New Language of Beauty
          </a>
          .
        </p>
      </>
    ),
  },

  {
    slug: "paris-formulation-language-of-beauty",
    title: "Paris, Formulation, and the New Language of Beauty",
    date: "2026-02-22",
    eyebrow: "Paris · Language",
    excerpt:
      "Paris did not invent beauty. It invented a way of speaking about it. That language is changing again — and formulation is the new word.",
    description:
      "Paris has always renewed the language of beauty. The new word is formulation. Discover how Maison Allélique is writing the next chapter of Parisian luxury — a private apothecary, an evolving formula, and a maison that composes rituals rather than routines.",
    keywords:
      "Parisian beauty Maison, Paris luxury beauty, personal formulation Paris, private apothecary Paris, French skincare Paris, new luxury beauty, Maison Allélique Paris",
    deck:
      "Paris did not invent beauty. It invented a way of speaking about it. That language is changing again — and formulation is the new word.",
    body: (
      <>
        <p>
          Every twenty or thirty years, Paris renews the vocabulary of
          beauty. The house dress became haute couture. The perfumer's
          organ became the maison. The cream became the serum. Each word,
          when it landed, felt inevitable in hindsight.
        </p>
        <p>
          The word arriving now is <em>formulation</em>.
        </p>
        <h2>Why formulation, and why now</h2>
        <p>
          Formulation names something the old words could not: a private,
          precise, moving act. Not a product on a shelf. Not a routine
          repeated. A composition — arranged for one person, on one day,
          from a house's own materials.
        </p>
        <p>
          The word suits Paris because Paris has always been closer to the
          atelier than the factory. A cutter, a perfumer, a florist — each
          has known that quality is decided by proportion, not by more.
        </p>
        <h2>The new language, quickly</h2>
        <ul>
          <li>
            <strong>Maison</strong> — a house. Not a brand. Not a retailer.
            A discipline held under one roof.
          </li>
          <li>
            <strong>Formulation</strong> — the act of composing, not choosing.
          </li>
          <li>
            <strong>Grail</strong> — the voice you keep. Worn alone.
          </li>
          <li>
            <strong>Set</strong> — the season. Worn on top of the Grail.
          </li>
          <li>
            <strong>Allelium</strong> — the private composer between them.
          </li>
        </ul>
        <h2>Maison Allélique in Paris</h2>
        <blockquote>
          Maison Allélique is a personal formulation Maison from Paris — where
          Allelium tells you how to blend skincare and fragrance formulas that
          evolve with your skin, mood, season, occasions, and life.
        </blockquote>
        <p>
          The atelier is Parisian. The register is Parisian. The
          intelligence — <a href="/allelium">Allelium</a> — carries that
          Paris into the home. It is a small, quiet, ambitious project: to
          give a person, wherever they live, an apothecary of their own,
          composed by a maison in Paris.
        </p>
        <p>
          Begin: <a href="/preorder">request private access</a>.
        </p>
      </>
    ),
  },
];

export default ARTICLES;
