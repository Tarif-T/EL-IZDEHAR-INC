/**
 * Google Analytics and tracking components
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

interface GoogleAnalyticsProps {
  trackingId: string;
}

export function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  const [location] = useLocation();

  useEffect(() => {
    // Load Google Analytics script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}', {
        page_location: window.location.href,
        page_title: document.title,
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);

    // Cleanup
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [trackingId]);

  // Track page views
  useEffect(() => {
    if (typeof gtag !== "undefined") {
      gtag("config", trackingId, {
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location, trackingId]);

  return null;
}

/**
 * Custom event tracking hook
 */
export function useGoogleAnalytics() {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof gtag !== "undefined") {
      gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPageView = (page_title: string, page_location: string) => {
    if (typeof gtag !== "undefined") {
      gtag("event", "page_view", {
        page_title,
        page_location,
      });
    }
  };

  const trackConversion = (conversionId: string, value?: number, currency = "USD") => {
    if (typeof gtag !== "undefined") {
      gtag("event", "conversion", {
        send_to: conversionId,
        value: value,
        currency: currency,
      });
    }
  };

  const trackContactForm = (method: string) => {
    trackEvent("contact_form_submit", "engagement", method);
  };

  const trackServiceInterest = (service: string) => {
    trackEvent("service_interest", "engagement", service);
  };

  const trackLanguageChange = (language: string) => {
    trackEvent("language_change", "user_interaction", language);
  };

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackContactForm,
    trackServiceInterest,
    trackLanguageChange,
  };
}

/**
 * Google Tag Manager component
 */
interface GoogleTagManagerProps {
  containerId: string;
}

export function GoogleTagManager({ containerId }: GoogleTagManagerProps) {
  useEffect(() => {
    // Google Tag Manager script
    const script = document.createElement("script");
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
    `;
    document.head.appendChild(script);

    // Google Tag Manager noscript
    const noscript = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${containerId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);
    document.body.appendChild(noscript);

    return () => {
      document.head.removeChild(script);
      document.body.removeChild(noscript);
    };
  }, [containerId]);

  return null;
}

/**
 * Facebook Pixel component
 */
interface FacebookPixelProps {
  pixelId: string;
}

export function FacebookPixel({ pixelId }: FacebookPixelProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);

    return () => {
      document.head.removeChild(script);
      document.body.removeChild(noscript);
    };
  }, [pixelId]);

  return null;
}

// Declare gtag for TypeScript
declare global {
  function gtag(...args: any[]): void;
}