import { useEffect } from 'react';

const CSS_ID = '__spa_bg_css__';
const VIDEO_ID = '__spa_bg_video__';
const WRAP_ID = '__spa_bg_wrap__';

export function VideoBackground() {
  useEffect(() => {
    // 1. Inject CSS
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
        #${VIDEO_ID} {
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

    // 2. Create wrapper + video, insert before #root
    let wrap = document.getElementById(WRAP_ID);
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = WRAP_ID;

      const video = document.createElement('video');
      video.id = VIDEO_ID;
      video.muted = true;
      video.loop = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'auto');

      // Listen before setting src to catch early errors
      video.addEventListener('canplay', () => {
        console.log('[SPA] video canplay ✓');
        video.play().catch(() => {});
      });
      video.addEventListener('error', () => {
        const err = (video as any).error;
        console.warn('[SPA] video error code:', err?.code, err?.message);
      });

      // Set src after attaching listeners
      // Use re-encoded 1080p/Level-4.1 version for browser compatibility
      video.src = '/spa-background-web.mp4';

      wrap.appendChild(video);

      const root = document.getElementById('root');
      if (root && root.parentNode) {
        root.parentNode.insertBefore(wrap, root);
      } else {
        document.body.insertBefore(wrap, document.body.firstChild);
      }
    }

    return () => {
      document.getElementById(WRAP_ID)?.remove();
      document.getElementById(CSS_ID)?.remove();
    };
  }, []);

  return null;
}
