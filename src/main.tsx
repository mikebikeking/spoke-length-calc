import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Prevent browser scroll restoration and ensure page starts at top
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Remove any hash from URL that might cause scrolling
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}

// Function to scroll to top
const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }
};

// Set initial scroll position before anything renders
if (document.documentElement) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.documentElement.scrollTop = 0;
}
if (document.body) {
  document.body.style.scrollBehavior = 'auto';
  document.body.scrollTop = 0;
}

// Scroll to top immediately
scrollToTop();

// Also scroll on window load to catch any late content
window.addEventListener('load', () => {
  scrollToTop();
  // Force scroll one more time after load
  setTimeout(scrollToTop, 0);
});

// Also scroll when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scrollToTop);
} else {
  scrollToTop();
}

// Use MutationObserver to catch any layout changes that might cause scrolling
const observer = new MutationObserver(() => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 0) {
    scrollToTop();
  }
});

// Start observing after a brief delay
setTimeout(() => {
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Stop observing after 3 seconds
    setTimeout(() => {
      observer.disconnect();
    }, 3000);
  }
}, 100);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
