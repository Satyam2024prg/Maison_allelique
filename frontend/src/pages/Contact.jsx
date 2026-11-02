import React from "react";
import { PageIntro, EditorialBlock, SectionDivider } from "@/components/Editorial";
import { TrackedCaps } from "@/components/TrackedCaps";
import { QuietLink } from "@/components/QuietLink";
import { Head } from "@/components/Head";

const Contact = () => {
  return (
    <div data-testid="contact-page">
      <Head
        title="Contact"
        description="Maison Allélique — Parisian niche perfume maison. Correspondence with the maison: touch, press."
        keywords="Maison Allélique contact, niche perfume Paris, Parisian perfumer correspondence, haute parfumerie contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://maisonallelique.ai/contact#organization",
          "name": "Maison Allélique",
          "url": "https://maisonallelique.ai/contact",
          "parentOrganization": { "@id": "https://maisonallelique.ai/#organization" },
          "contactPoint": [
            { "@type": "ContactPoint", "email": "touch@maisonallelique.ai", "contactType": "customer service", "availableLanguage": ["English","French","Spanish"] },
            { "@type": "ContactPoint", "email": "press@maisonallelique.ai", "contactType": "press" }
          ]
        }}
      />
      <PageIntro
        number="N° 07"
        eyebrow="Contact"
        title={
          <>
            A quiet
            <br />
            <span className="font-italic-display">correspondence</span>.
          </>
        }
        essence="The maison keeps a small register and a slow inbox."
      />

      <EditorialBlock eyebrow="Correspondence" wide>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-10">
            <div>
              <TrackedCaps className="block mb-3">Touch</TrackedCaps>
              <a
                href="mailto:touch@maisonallelique.ai"
                className="font-display text-2xl md:text-3xl text-encre hover:text-sang transition-colors duration-700"
                data-testid="contact-email-main"
              >
                touch@maisonallelique.ai
              </a>
              <p className="mt-3 font-sans text-xs text-cendre max-w-xs leading-relaxed">
                For questions, correspondence, and everything that is not press.
              </p>
            </div>

            <div>
              <TrackedCaps className="block mb-3" tone="sang">
                Press & Partnerships
              </TrackedCaps>
              <a
                href="mailto:press@maisonallelique.ai"
                data-testid="contact-email-press"
                className="font-display text-xl md:text-2xl text-encre hover:text-sang transition-colors duration-700"
              >
                press@maisonallelique.ai
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-display italic text-xl md:text-2xl text-encre max-w-md leading-snug">
              Received. We reply personally, in our own time.
            </p>
            <p className="font-sans text-sm text-cendre max-w-md leading-relaxed">
              Correspondence is read by the maison, not by a machine. Please
              write one line — the shorter the note, the shorter our silence.
            </p>
          </div>
        </div>
      </EditorialBlock>

      <SectionDivider withSeal />

      <EditorialBlock eyebrow="A doorway">
        <div className="mt-2 flex flex-col gap-6">
          <QuietLink to="/preorder" accent data-testid="contact-access-link">
            Join the waiting list
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default Contact;
