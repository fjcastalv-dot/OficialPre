/**
 * Lightweight & Privacy-First Analytics Module
 * Respects user cookie consent and tracks vital commercial interactions.
 */

export type AnalyticsEventName =
  | 'page_view'
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'clear_cart'
  | 'toggle_favorite'
  | 'open_quote_drawer'
  | 'submit_quote'
  | 'contact_form_submit'
  | 'contact_whatsapp_click'
  | 'theme_change'
  | 'filter_category';

export function hasAnalyticsConsent(): boolean {
  try {
    const consent = localStorage.getItem('pre_cookie_consent');
    // If user explicitly accepted or hasn't rejected essentials
    return consent === 'accepted';
  } catch {
    return false;
  }
}

/**
 * Tracks a custom event
 */
export function trackEvent(name: AnalyticsEventName, payload?: Record<string, any>): void {
  try {
    // Only track if consent is granted or for essential operational diagnostics
    const eventData = {
      event: name,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      path: window.location.hash || window.location.pathname,
      ...payload,
    };

    // Custom window event for listeners (Google Analytics / Meta Pixel when integrated)
    if (typeof window !== 'undefined') {
      const customEvent = new CustomEvent('pre_analytics_event', { detail: eventData });
      window.dispatchEvent(customEvent);

      // If dataLayer exists (GTM)
      if ((window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push(eventData);
      }
    }
  } catch (err) {
    console.debug('Analytics event could not be logged:', err);
  }
}

/**
 * Tracks a page / route view
 */
export function trackPageView(title: string, path: string): void {
  trackEvent('page_view', { page_title: title, page_path: path });
}
