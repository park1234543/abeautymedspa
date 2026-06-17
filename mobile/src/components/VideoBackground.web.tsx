import { useEffect } from 'react';

const CSS_ID = '__spa_bg_css__';
const VIDEO_ID = '__spa_bg_video__';
const IMG_ID = '__spa_bg_img__';
const WRAP_ID = '__spa_bg_wrap__';

const FALLBACK_IMG = require('../../assets/images/hero-spa.jpg');

export function VideoBackground() {
  useEffect(() => {
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
        }
        #${VIDEO_ID}, #${IMG_ID} {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        #root {
          z-index: 1 !important;
          background: transparent !important;
        }
      `;
      document.head.appendChild(style);
    }

    let wrap = document.getElementById(WRAP_ID);
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = WRAP_ID;

      const showFallbackImage = () => {
        document.getElementById(VIDEO_ID)?.remove();
        if (!document.getElementById(IMG_ID)) {
          const img = document.createElement('img');
          img.id = IMG_ID;
          img.src = typeof FALLBACK_IMG === 'string' ? FALLBACK_IMG : String(FALLBACK_IMG);
          img.alt = '';
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
          wrap!.appendChild(img);
        }
      };

      const video = document.createElement('video');
      video.id = VIDEO_ID;
      video.muted = true;
      video.loop = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'auto');

      video.addEventListener('canplay', () => {
        video.play().catch(() => showFallbackImage());
      });
      video.addEventListener('error', () => showFallbackImage());

      video.src = '/spa-background-web.mp4';
      wrap.appendChild(video);

      const root = document.getElementById('root');
      if (root?.parentNode) {
        root.parentNode.insertBefore(wrap, root);
      } else {
        document.body.insertBefore(wrap, document.body.firstChild);
      }

      // If video hasn't started in 3 seconds, show fallback
      setTimeout(() => {
        const v = document.getElementById(VIDEO_ID) as HTMLVideoElement | null;
        if (v && v.paused) showFallbackImage();
      }, 3000);
    }

    return () => {
      document.getElementById(WRAP_ID)?.remove();
      document.getElementById(CSS_ID)?.remove();
    };
  }, []);

  return null;
}
