import React from 'react';

export const MATOMO_URL: string = process.env.NEXT_PUBLIC_MATOMO_URL || 'http://matomo:8080';
export const MATOMO_SITE_ID: string = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '1';

export function MatomoScript(): React.ReactElement {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
             var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//localhost:8080/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
          `,
        }}
      />
    </>
  );
}