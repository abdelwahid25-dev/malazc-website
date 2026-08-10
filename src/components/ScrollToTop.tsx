import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the very top on every route change.
 * This is required because React Router does not scroll to top by default,
 * especially when AnimatePresence is used in the layout.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use instant scroll so the animation starts from the top,
    // not from whatever position the user was at on the previous page.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
