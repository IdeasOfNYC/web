Issue Tracking for IoNYC

**Handoff**

Tech Fixes

- [ ] \[ETHAN\] Allow click whitespace in map to center  
- [ ] \[SARAH\] Change font to CEC standard (depends on when design guidelines get sent to us)  
- [x] \[ETHAN\] Prevent text overlap of close button on idea box  
- [ ] \[Vincent\] Incorrect number of implemented projects (46 final projects thing)  
- [ ] \[SARAH\] Videos on the about the process page are vertically to small; make them scale according to their original aspect ratio  
- [x] \[Vincent\] Change text on the ‘hover to preview, click to open’ to ‘hover over circles to preview, click to open’  
- [x] \[Ethan\] Timeline should use design system colors for different stages  
- [ ] Timeline finalist/ba bug  
- [ ] \[RYAN\] Add some padding to the idea panel so close button doesn’t cover content, or move close button to be on the corner  
- [x] \[Vincent\] Change ‘stage’ to phase across the app to match their copy   
- [ ] \[RYAN\] Figure out how to add previous years

Design Tasks

- [ ] Design replacement for redundant filter

---

OLD STUFF DONT WORRY ABOUT THESE FOR NOW

Data

- [ ] The timeline currently says that all ballot ideas were selected (there should only be 20). Probably issue with conversion from csv to json; see the script in the data repo

Functionality

- [x] \[Vincent\] Filter should automatically update the app when option changed; there shouldn’t be an apply button.  
- [x] \[Vincent\] Filter should be closed when user clicks outside of border  
- [ ] Filter should change color when the filter value is not default (to let the user know that they are viewing a subset of ideas, rather than all). Default is all boroughs, submitted (all) ideas, all categories, all audiences  
- [x] Filter audiences should filter by inclusion; if I select ‘youth’, it should include ideas that have youth *in addition to* other audiences. Right now it doesn’t load audiences correctly  
- [x] \[RYAN\] move the categorization/borough thing at the center top of map to be shared in timeline  
- [x] \[SARAH\] Stage Circles in map (breakdown by stage) should include ballot ideas  
- [x] \[SARAH\] Timeline stage descriptions  
- [x] \[SARAH\] Previous stage should be disabled and grayed out when at the first stage in the timeline. Same idea for last stage and next button  
- [x] \[SARAH\] Selected ideas page should link to ideas on pb site  
- [x] \[SARAH\] Selected ideas page and about the process page should keep the header \+ navigation in home  
- [x] \[Vincent\] The people’s money link on the home screen should redirect to the pb site  
- [ ] Submitted/Advance to BA/Finalist

Style/UI

- [x] \[RYAN\] Load figma color variables  
- [x] \[RYAN\] Change sans-serif font to ronzino globally (the font used in figma)  
- [x] \[RYAN\] Sidebar idea UI does not match figma  
      - [x] Chips (padding on left and right not enough, uncolored chips should have neutral background)  
      - [x] Truncate (shorten with ellipses) text to be max two lines  
      - [ ] \[RYAN\] Pagination at the bottom (0 of 1, next button) should display an idea count instead of the page (i.e ideas 0-10 of 2000 vs 0 of 1\)  
- [x] \[RYAN\] General Sidebar UI does not match figma  
      - [x] Sidebar search does not match figma style  
      - [x] Spacing b/w search and filter inconsistent with border  
      - [x] Spacing of all elements inconsistent with border (refer to the circle breakdown/key on the bottom right of the map; the spacing of the ideas and sidebar is much smaller compared to the key’s spacing  
      - [x] Background of sidebar ui should not be a different color from the background of the page  
      - [x] Stage colors (submitted, BA, Ballot) should be standardized according to figma  
      - [x] Search bg should be white  
      - [x] \[Vincent\] Filter should not be scrollable; all of the filter options should be visible when the popup/dropdown is opened  
- [ ] (Kalia) Create a reusable button component(s); style defined within component for consistency  
      - [ ] Make component  
      - [x] \[Vincent\] Fonts and button sizes on homepage for the buttons (peoples’ money button vs two middle buttons) are different  
      - [ ] map/timeline toggles do not match figma  
      - [ ] Back to home does not match figma   
- [ ] Map  
      - [ ] Colors of the circle counts on map (IACircles.tsx, StageCircles.tsx) (the ones that change size as you load) do not match the figma colors  
- [ ] Timeline  
      - [x] \[Vincent\] Timeline lines (connecting curvy rectangles in figma)  
- [ ] Idea Panel  
      - [x] Timeline should use timelineCircle component (see Timeline.tsx) for consistency