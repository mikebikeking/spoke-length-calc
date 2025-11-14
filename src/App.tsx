import { useEffect, useRef } from 'react';
import SpokeLengthCalculator from './components/SpokeLengthCalculator';
import { BeamsBackground } from './components/ui/beams-background';

function App() {
  const scrollCheckRef = useRef<number | null>(null);

  useEffect(() => {
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Scroll to top function
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };
    
    // Block scrolling for the first second
    let scrollBlocked = true;
    const blockScroll = (e: Event) => {
      if (scrollBlocked) {
        e.preventDefault();
        scrollToTop();
        return false;
      }
    };
    
    // Prevent any scrolling attempts
    window.addEventListener('scroll', blockScroll, { passive: false, capture: true });
    window.addEventListener('wheel', blockScroll, { passive: false, capture: true });
    window.addEventListener('touchmove', blockScroll, { passive: false, capture: true });
    
    // Immediate scroll
    scrollToTop();
    
    // Aggressively check and reset scroll position for the first 2 seconds
    let checkCount = 0;
    const maxChecks = 120; // Check for ~2 seconds at 60fps
    
    const checkScroll = () => {
      if (checkCount < maxChecks) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          scrollToTop();
        }
        checkCount++;
        scrollCheckRef.current = requestAnimationFrame(checkScroll);
      } else {
        // After 2 seconds, allow scrolling
        scrollBlocked = false;
        window.removeEventListener('scroll', blockScroll, { capture: true });
        window.removeEventListener('wheel', blockScroll, { capture: true });
        window.removeEventListener('touchmove', blockScroll, { capture: true });
      }
    };
    
    // Start checking after a brief delay to let initial render complete
    setTimeout(() => {
      scrollCheckRef.current = requestAnimationFrame(checkScroll);
    }, 10);
    
    // Also scroll on various events
    window.addEventListener('load', scrollToTop);
    window.addEventListener('DOMContentLoaded', scrollToTop);
    
    return () => {
      if (scrollCheckRef.current !== null) {
        cancelAnimationFrame(scrollCheckRef.current);
      }
      window.removeEventListener('load', scrollToTop);
      window.removeEventListener('DOMContentLoaded', scrollToTop);
      window.removeEventListener('scroll', blockScroll, { capture: true });
      window.removeEventListener('wheel', blockScroll, { capture: true });
      window.removeEventListener('touchmove', blockScroll, { capture: true });
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <BeamsBackground intensity="medium">
        <SpokeLengthCalculator />
      </BeamsBackground>
    </div>
  );
}

export default App;