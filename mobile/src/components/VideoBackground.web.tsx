import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import React from 'react';

const CSS_ID = '__spa_video_bg_css__';
const WRAP_ID = '__spa_video_bg_wrap__';
const VIDEO_ID = '__spa_video_bg__';

const css = `
  #${VIDEO_ID} {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: 0;
    pointer-events: none;
    display: block;
  }
  #root {
    z-index: 1 !important;
    background: transparent !important;
  }
  html, body {
    background: #0d0a06 !important;
  }
`;

export function VideoBackground() {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Inject CSS once
    if (!document.getElementById(CSS_ID)) {
      const style = document.createElement('style');
      style.id = CSS_ID;
      style.textContent = css;
      document.head.appendChild(style);
    }

    // Create container div, insert before #root so z-index stacking works
    let wrap = document.getElementById(WRAP_ID);
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = WRAP_ID;
      const root = document.getElementById('root');
      if (root && root.parentNode) {
        root.parentNode.insertBefore(wrap, root);
      } else {
        document.body.insertBefore(wrap, document.body.firstChild);
      }
    }

    setContainer(wrap); // triggers re-render → createPortal runs

    return () => {
      document.getElementById(WRAP_ID)?.remove();
      document.getElementById(CSS_ID)?.remove();
    };
  }, []);

  if (!container) return null;

  return createPortal(
    <video
      id={VIDEO_ID}
      src="/spa-background.mp4"
      autoPlay
      muted
      loop
      playsInline
    />,
    container
  );
}
