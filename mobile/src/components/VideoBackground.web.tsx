import { useEffect } from 'react';

const CSS_ID = '__spa_bg_css__';
const WRAP_ID = '__spa_bg_wrap__';
const VIDEO_ID = '__spa_bg_video__';
const IMG_ID = '__spa_bg_img__';

export function VideoBackground() {
  useEffect(() => {
    // Inject CSS once
    if (!document.getElementById(CSS_ID)) {
      const style = document.createElement('style');
      style.id = CSS_ID;
      style.textContent = `
        html, body { background: #0d0a06 !important; }
        #${WRAP_ID} {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          background: #0d0a06;
        }
        #${IMG_ID} {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        #${VIDEO_ID} {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        #${VIDEO_ID}.ready {
          opacity: 1;
        }
        #root {
          position: relative;
          z-index: 1;
          background: transparent !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Only create wrap once
    if (document.getElementById(WRAP_ID)) return;

    const wrap = document.createElement('div');
    wrap.id = WRAP_ID;

    // 1) Always show static image immediately
    const img = document.createElement('img');
    img.id = IMG_ID;
    img.src = '/assets/images/hero-spa.jpg';
    img.alt = '';
    wrap.appendChild(img);

    // 2) Try to play video silently on top; fade in if it works
    const video = document.createElement('video');
    video.id = VIDEO_ID;
    video.muted = true;
    video.loop = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');
    video.src = '/spa-background-web.mp4';

    video.addEventListener('canplay', () => {
      video.play().then(() => {
        video.classList.add('ready');
      }).catch(() => {
        // autoplay blocked — image fallback already visible
      });
    });

    wrap.appendChild(video);

    // Insert before #root so it sits behind the app
    const root = document.getElementById('root');
    if (root?.parentNode) {
      root.parentNode.insertBefore(wrap, root);
    } else {
      document.body.insertBefore(wrap, document.body.firstChild);
    }

    return () => {
      document.getElementById(WRAP_ID)?.remove();
      document.getElementById(CSS_ID)?.remove();
    };
  }, []);

  return null;
}
