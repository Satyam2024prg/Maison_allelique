// Maison Allélique — imagery extracted directly from the Visual Strategy brief PDF.
// These are the sculptures, moodboard crops, and material studies that define
// the three worlds. Served locally from /public/brief/.
//
// Audit note (iteration 6): several early crops carried inscribed labels or
// unintended layout artifacts. Only sculpture-clean crops are referenced below.
// Files with text overlays (mycelium-composite, mycelium-glass, original
// master-lattice with Issey Miyake side) are no longer used.

const B = "/brief";

export const IMAGES = {
  host: {
    // Hero is now the actual maison sculpture render — The Artefact 02A,
    // an arch of mycelium cradled in brass. Photographed against the maison's studio grey.
    hero: `${B}/hero-artefact-02a.jpg`,
    // Widened 2.5:1 variant used only on the Home hero, so the title has breathing space on the left.
    home_hero: `${B}/home-hero-host.jpg`,
    hero_alt:
      "The Host — Concept 02A. An arch of mycelium cradled in brass, the pale vessel at its threshold.",
    // Portrait crop of the same sculpture, used for the paired-object study.
    sculpture: `${B}/register-host.jpg`,
    // Authentic moodboards from the concept-refinement brief:
    // travertine slabs (the origin form), the moon-door threshold, the material close.
    detail_1: `${B}/mood-host-travertine.jpg`,
    detail_2: `${B}/mood-host-moondoor.jpg`,
    detail_3: `${B}/mood-host-mycelium.jpg`,
    context: `${B}/host-corridor.jpg`,
  },
  master: {
    // The Monk — Concept 02D. The form is grown, not designed.
    hero: `${B}/hero-monk-02d.jpg`,
    home_hero: `${B}/home-hero-master.jpg`,
    hero_alt:
      "The Master — Concept 02D. A tall grown form of mycelium set against brass — impermanence held upright.",
    sculpture: `${B}/register-master.jpg`,
    // Studio trio: three Monks aligned — used inside the moodboard block.
    trio: `${B}/hero-monk-trio.jpg`,
    // Authentic references from the brief:
    // Suzuki Osamu's Clay Form (1964), cordyceps in the pine litter, and the mycelium seam.
    detail_1: `${B}/mood-master-suzuki.jpg`,
    detail_2: `${B}/mood-master-cordyceps.jpg`,
    detail_3: `${B}/mood-master-mycelium.jpg`,
  },
  observer: {
    // The Father — Concept 02E. Nature creates, we recognise.
    hero: `${B}/hero-father-02e.jpg`,
    home_hero: `${B}/home-hero-observer.jpg`,
    hero_alt:
      "The Observer — Concept 02E. A single obelisk in mycelium and brass — restraint given a form.",
    sculpture: `${B}/register-observer.jpg`,
    trio: `${B}/hero-father-trio.jpg`,
    // Authentic references from the brief:
    // Suzuki Osamu's twisted terracotta (a form recognised), the vessel in its stone frame (Concept 02C),
    // and a Solstice sculpture chosen for its silence.
    detail_1: `${B}/mood-observer-twisted.jpg`,
    detail_2: `${B}/mood-observer-moon-frame.jpg`,
    detail_3: `${B}/mood-observer-solstice.jpg`,
    interior: `${B}/observer-interior.jpg`,
  },
  parfum: {
    // Collection overview render — three grails aligned in the studio.
    still: `${B}/hero-solstice-trio.jpg`,
    alt: "Three grails aligned in the maison's studio — the register of personalised composition.",
    detail: `${B}/observer-void-stone.jpg`,
  },
  skincare: {
    still: `${B}/skincare-portrait.jpg`,
    alt: "A luminous close-up — dewy skin met by a globe of glass. Bio-responsive skincare, worn.",
  },
  ecosystem: {
    still: `${B}/hero-father-trio.jpg`,
    alt: "Three Observer obelisks in reflection — sculptural ritual objects that outlive their contents.",
  },
  sets: {
    // Sets — layering companions, sold in threes. Each family has its own
    // box colour (photographed as separate references) and shares the same
    // trio of MA-labelled flacons inside.
    still: `${B}/set-hero.jpg`,
    alt: "The Sets — a trio of MA-labelled flacons in a black lacquered presentation box.",
    families: {
      florals: `${B}/set-florals.jpg`,   // sage + dusty pink
      citrus: `${B}/set-citrus.jpg`,     // ivory / white
      gourmand: `${B}/set-gourmand.jpg`, // warm cognac
      aromatic: `${B}/set-aromatic.jpg`, // slate grey
      oud: `${B}/set-oud.jpg`,           // jet black
    },
  },
  provenance: {
    // Previously pointed to mycelium-glass (wrong PDF extraction — a library).
    // Swapped for observer-void-stone — the register of living materials, quiet.
    hero: `${B}/observer-void-stone.jpg`,
    alt: "Sculptural void-stones on a wide table — the register of living materials.",
    hand: `${B}/mycelium-collection.jpg`,
  },
  maison: {
    hero: `${B}/sculpture-01.jpg`,
    alt: "A pale sculptural object in Parisian light.",
    interior: `${B}/observer-interior.jpg`,
  },
  register: {
    alma: `${B}/register-alma.jpg`,
    vida: `${B}/register-vida.jpg`,
    sereno: `${B}/register-sereno.jpg`,
    host: `${B}/register-host.jpg`,
    master: `${B}/register-master.jpg`,
    observer: `${B}/register-observer.jpg`,
  },
};

export default IMAGES;
