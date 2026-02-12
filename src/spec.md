# Specification

## Summary
**Goal:** Provide uninterrupted background music across the entire app with persistent controls, using a single global audio instance.

**Planned changes:**
- Add a single global background-music player mounted at the app root that uses `/assets/audio/valentine-bg.mp3` (from `valentineContent.questionJourney.backgroundMusicPath`) as the default track and keeps playback state in one place.
- Add persistent, accessible music controls available from any page state (including when the Question Journey overlay is closed): mute/unmute and a “Start/Resume” action for when autoplay is blocked.
- Refactor `QuestionJourneySection` to use the global music state/control actions (no local/duplicate audio instance) while preserving its existing UI behavior for mute/unmute and “Start music” when blocked.
- Ensure the audio asset exists at `frontend/public/assets/audio/valentine-bg.mp3` and handle audio load/play failures gracefully without crashing (controls remain usable and reflect blocked/failed state).

**User-visible outcome:** Music can play continuously while navigating the app and opening/closing the Question Journey overlay, with always-available controls to start/resume (when required) and mute/unmute.
