---
name: RN Web video background
description: How to render a video background in React Native Web (Expo) on the Welcome screen
---

## The working approach

1. **Transcode for browser**: Original 4K H.264 Level 5.2 fails (`DEMUXER_ERROR_NO_SUPPORTED_STREAMS`). Must re-encode to max Level 4.1 (1080p) with ffmpeg `-profile:v main -level 4.1`.
2. **DOM injection** (not `'video' as any`, not `createPortal`): Use `useEffect` to create `<video>` element via `document.createElement`, insert it as a `<div>` wrapper BEFORE `#root` in the body. CSS: wrapper `position:fixed; inset:0; z-index:0`, `#root { z-index:1 !important; background:transparent !important }`.
3. **NavigationContainer**: Must set `theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'transparent' } }}` — default theme is `rgb(242,242,242)` gray which blocks video.
4. **All screen layers**: Set `contentStyle: { backgroundColor: 'transparent' }` on Auth stack screen + RootNavigator Auth screen.
5. **WelcomeScreen root View**: `backgroundColor: 'transparent'` — NOT a solid color.

**Why:**
- `'video' as any` in RN Web: src prop is NOT passed as HTML attribute → "no supported source" error
- NavigationContainer gray default = invisible video even with correct z-index
- H.264 Level 5.2 unsupported in many browser builds (Chromium headless, older Chrome)

**How to apply:**
Whenever adding video background to a React Native Web screen: re-encode first, then DOM-inject the video, make all ancestor layers transparent.
