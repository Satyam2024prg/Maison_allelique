/**
 * Analytics helper — pushes events to Google Tag Manager's dataLayer.
 *
 * GTM container `GTM-TLXPZ2NB` is loaded from /public/index.html.
 * Inside GTM you can build triggers on any of these event names and forward
 * them to GA4, Google Ads, Meta, etc.
 *
 * Safe no-op if GTM never loads (e.g. blocked by ad-blocker).
 */

export const pushEvent = (event, params = {}) => {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch (_) {
    /* ignore — analytics must never break the app */
  }
};
