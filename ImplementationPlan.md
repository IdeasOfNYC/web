# Remaining Issues Implementation Plan

## Scope
This plan covers the active unchecked items in `IssueTracker.md` before the `OLD STUFF DONT WORRY ABOUT THESE FOR NOW` divider:

- Line 7: allow click whitespace in the map to center a borough
- Line 8: change the font to the CEC standard
- Line 10: fix the incorrect implemented-project count
- Line 11: make About page videos scale to their native aspect ratio
- Line 14: fix the timeline finalist/BA bug
- Line 15: adjust idea panel spacing so the close button does not cover content
- Line 21: replace the redundant filter design

Explicit exclusions:

- Line 17 (`Figure out how to add previous years`)
- Anything below the `OLD STUFF` divider, except where it helps explain an active bug

## Audit Summary
- `public/2024Ideas.json` currently contains `3728` ideas, `438` ideas with non-null `status`, `46` ideas with `FinalBallot: true`, and `97` ideas with `Final20Ideas: true`.
- The app currently interprets those status flags inconsistently across `app/routes/timeline.tsx`, `app/components/IdeaPanel.tsx`, `app/components/SidebarIdea.tsx`, `app/components/PhaseCircles.tsx`, `app/components/PhaseScatter.tsx`, and `app/utils.ts`.
- `app/routes/about.tsx` hard-codes every embedded video to `h-64`, which is why the iframes appear vertically compressed.
- `app/components/IdeaPanel.tsx` still uses an absolutely positioned close button with only a small right margin on the title, so long content can still crowd that corner.
- `app/routes/map.tsx` only centers when a borough path or the borough `<select>` is used; whitespace clicks inside the SVG are ignored.
- Filter controls are duplicated between `app/components/FilterPopup.tsx` and the inline controls in `app/routes/map.tsx` and `app/routes/timeline.tsx`.
- The font system is split across Ronzino, `Edu SA Beginner`, and an unused Inter preload in `app/root.tsx`, so the eventual CEC swap should be handled as a token-level change, not component-by-component overrides.

## Recommended Implementation Order
1. Resolve the phase/finalist/implemented semantics first. Lines 10 and 14 are the highest-risk issues because the wrong interpretation will keep leaking into labels, counts, and status chips.
2. Ship the low-risk layout fixes next. The About video sizing and idea panel spacing changes are isolated and should be straightforward once the status work is stable.
3. Replace the redundant filter UX after the data/status cleanup. That avoids redesigning around labels or counts that may still change.
4. Do the font migration last unless the CEC font assets arrive earlier. It touches multiple routes and should happen after the UI structure is settled.

## Workstream 1: Normalize Status, Counts, and Timeline Copy
This workstream resolves line 10 and line 14 together.

### Primary files
- `public/2024Ideas.json`
- `app/types.ts`
- `app/utils.ts`
- `app/root.tsx`
- `app/routes/timeline.tsx`
- `app/components/IdeaPanel.tsx`
- `app/components/SidebarIdea.tsx`
- `app/components/PhaseCircles.tsx`
- `app/components/PhaseScatter.tsx`

### Implementation steps
1. Confirm the source-of-truth meaning of `status !== null`, `FinalBallot`, and `Final20Ideas`.
2. If the JSON export is wrong, fix the upstream conversion and regenerate `public/2024Ideas.json` before changing UI copy.
3. Add a single shared status helper module or expand `app/utils.ts` with explicit derived helpers such as `isInBA`, `isOnFinalBallot`, `isImplemented`, and `getIdeaPhaseLabel`.
4. Replace all direct inline flag checks in the UI with those helpers so the app stops using different meanings in different places.
5. Refactor timeline counts so each displayed count is backed by the same helper logic used by chips and idea-panel progress indicators.
6. Rename any misleading local variables. For example, the current `final20` variable in `app/routes/timeline.tsx` should only exist if that field really is the implementation set.
7. Update copy strings so the app consistently distinguishes `Advanced to BA`, `Added to Final Ballot`, and `Chosen for Implementation` only if the data truly supports those phases.
8. Add a small validation script or one-off data audit step that prints the counts for each derived status before release.

### Acceptance criteria
- The same idea shows the same status label in the sidebar, idea panel, timeline, and circle/scatter views.
- The timeline no longer mixes up BA, ballot, finalist, and implementation states.
- The “implemented projects” count matches the approved source-of-truth number.
- No UI component reaches directly into `idea.status.FinalBallot` or `idea.status.Final20Ideas` for user-facing copy without going through shared helpers.

## Workstream 2: Make Map Whitespace Clickable for Centering
This workstream resolves line 7.

### Primary files
- `app/routes/map.tsx`

### Implementation steps
1. Add an SVG-level click handler so clicks on blank map space can still resolve to a borough selection.
2. Use the existing centroid data in `midpoints` or path geometry to map a whitespace click to the nearest borough.
3. Keep direct path clicks working exactly as they do now.
4. Make the behavior deterministic near borough boundaries so users do not get a different result depending on whether they clicked the path or nearby whitespace.
5. Preserve the current zoom-and-center behavior after the borough is resolved.

### Acceptance criteria
- Clicking the visible whitespace nearest a borough centers that borough the same way a direct path click does.
- Clicking an already selected borough still exits back to the all-city view if that behavior is retained.
- The top control bar, borough dropdown, and map clicks all produce the same selected-borough state.

## Workstream 3: Fix About Page Video Sizing
This workstream resolves line 11.

### Primary files
- `app/routes/about.tsx`

### Implementation steps
1. Replace the fixed `h-64` iframe sizing with an aspect-ratio wrapper such as `aspect-video`.
2. Make the iframe fill that wrapper with `w-full h-full`.
3. Keep the existing rounded corners and shadow styling.
4. Verify the layout at mobile, tablet, and desktop widths so the videos scale without creating awkward vertical gaps.

### Acceptance criteria
- Each video maintains its original aspect ratio.
- No embedded video looks vertically squashed on desktop.
- The About page still fits comfortably on smaller screens without horizontal overflow.

## Workstream 4: Fix Idea Panel Header Spacing
This workstream resolves line 15.

### Primary files
- `app/components/IdeaPanel.tsx`

### Implementation steps
1. Replace the current absolute close-button treatment with a real header row or reserve enough padding for the button.
2. Make the title block wrap naturally without sitting underneath the close control.
3. Re-check the chips immediately below the title so the new spacing does not create a cramped first fold.
4. Verify the modal at narrow widths and with long solution text.

### Acceptance criteria
- The close button never overlaps the title or the first row of content.
- Long idea titles remain readable without manual line breaks.
- The panel still closes via both the button and outside click.

## Workstream 5: Replace the Redundant Filter Design
This workstream resolves line 21.

### Primary files
- `app/routes/sidebar.tsx`
- `app/components/FilterPopup.tsx`
- `app/routes/map.tsx`
- `app/routes/timeline.tsx`

### Recommended direction
Keep borough selection in the inline top-bar controls for map and timeline, and reduce the popup to the filters that are not already visible there.

### Implementation steps
1. Remove duplicate borough filtering from `FilterPopup` if the inline selector remains the primary borough control.
2. Rename the popup trigger to something more explicit if needed, such as `More filters`, to clarify that it contains secondary filters only.
3. Add a visible non-default state to the filter trigger so users can tell when impact-area or audience filters are active.
4. Consider adding compact active-filter chips with a `Clear all` action beneath the search row if the final layout needs stronger filter visibility.
5. Share the top-bar control structure between map and timeline so the borough/filter layout does not diverge again.

### Acceptance criteria
- Users do not see the same filter control in two different places with different visual treatments.
- The filter popup only contains controls that are not already exposed inline.
- Active filters are visible without reopening the popup.

## Workstream 6: Swap to the CEC Font Standard
This workstream resolves line 8 and is the only blocked item in the active list.

### Primary files
- `app/root.tsx`
- `app/app.css`
- `app/components/Button.tsx`
- `app/components/Header.tsx`
- `app/components/Landing.tsx`
- `app/routes/about.tsx`
- `app/routes/timeline.tsx`

### Dependency
CEC font files, fallback rules, and usage guidance need to be provided first. The current tracker note already calls this dependency out.

### Implementation steps
1. Obtain the approved font family, weights, and whether the standard uses separate body and display fonts.
2. Replace the unused Inter preload in `app/root.tsx`.
3. Update `app/app.css` theme tokens and `@font-face` declarations so typography is controlled centrally.
4. Remove `Edu SA Beginner` if it is not part of the approved standard.
5. Verify headings, buttons, chips, and navigation after the swap, since several components rely on `font-display`.

### Acceptance criteria
- All typography uses the approved CEC font stack.
- There are no leftover imports or theme variables for superseded fonts.
- Button and heading styles remain visually consistent after the swap.

## Verification Checklist
- Run `npm run typecheck`
- Run `npm run build`
- Manually test `/`, `/about`, `/map`, and `/timeline`
- Manually verify status counts against the approved source data after the JSON/helper changes
- Confirm the map whitespace behavior with mouse clicks at borough edges and empty SVG regions
- Confirm the About videos and idea panel layout on both desktop and mobile widths

## Recommended Release Slice
If these changes need to be split into reviewable PRs, use this order:

1. Status/data normalization plus timeline/status-label cleanup
2. Map whitespace centering
3. About video sizing and idea-panel spacing
4. Filter redesign
5. CEC font migration after design assets arrive
