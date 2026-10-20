# Archie's Design Studio

Build a polished, responsive portfolio website for Archie Saluja, a design student at NIFT Panchkula working across UI/UX design, branding, and social media design.

REFERENCE
https://finn.framer.media/

Use this reference for its bold typographic hierarchy, editorial composition, restrained navigation, and playful cursor interaction. Inspect it if accessible. Adapt the direction to Archie’s identity and work; write original content and use her supplied assets.

Build all page routes and fully develop the homepage first.

VISUAL DIRECTION

The website should feel sophisticated, expressive, and personal, with clean layouts and playful motion.

Use this initial design system:
- Background: warm off-white #F6F4EF.
- Primary text: near-black #202020.
- Secondary text: #62625E.
- Accent: deep burgundy #772D3E, used sparingly for links, active states, and small details.
- Borders: #DEDCD5.
- Typography: use Manrope or a similar contemporary sans-serif with strong display weights and readable body text.
- Use the actual project images to bring colour into the website.

Keep the composition editorial: strong typography, generous image areas, deliberate whitespace, thin dividers, and small category labels. Avoid decorative gradients, excessive rounded cards, heavy shadows, and generic stock photography.

LAYOUT SYSTEM

- Maximum content width: 1280px.
- Horizontal page padding: 64px on large desktops, 32px on tablets, 20px on mobile.
- Section spacing: 96px desktop and 56px mobile.
- Body text: 17–18px desktop and 16px mobile, line height approximately 1.6.
- Small labels: 12–14px.
- Standard interactive targets: at least 44 × 44px.
- Buttons: approximately 48px tall with 20–24px horizontal padding.
- Align headings, images, dividers, and body copy to a consistent grid.
- Use fluid heading sizes that remain readable without overflowing at any viewport width.

SITE STRUCTURE

Create:
1. Home: /
2. Work: /work
3. Individual project pages: /work/:slug
4. Resume: /resume
5. Contact: /contact

Navigation:
- Archie Saluja on the left, linking to Home.
- Work, Resume, Contact on the right.
- Show the current page clearly.
- Keep navigation visible when scrolling, using a solid background for legibility.
- On mobile, use an accessible menu with keyboard support and clear open/close states.

HOMEPAGE

1. HERO

Create a spacious hero approximately 80–90vh tall on desktop, including the header. On mobile, let content determine its height.

Small introductory line:
“Hi, I’m Archie Saluja.”

Main headline, across two or three deliberate lines:
“Thoughtful interfaces.
Expressive identities.”

Supporting copy:
“A design student at NIFT Panchkula, exploring UI/UX, branding, and social media through curiosity, storytelling, and attention to detail.”

Small discipline line:
“UI/UX Design · Branding · Social Media”

Primary action:
“Explore my work” — smoothly scrolls to Selected Work.

Secondary action:
“View resume” — opens /resume.

Keep the text as real HTML, with strong contrast and a readable line length.

2. CURSOR IMAGE TRAIL — ESSENTIAL INTERACTION

Implement a working cursor image trail inside the desktop hero.

As the visitor moves the pointer through the hero, project images briefly appear along its path, creating a playful sequence of floating previews.

Starting behaviour:
- Trigger a new image after approximately 80px of pointer travel, with a minimum interval of 120ms.
- Cycle through the supplied project images.
- Preview width: approximately 180–240px on desktop.
- Preserve each image’s aspect ratio.
- Apply subtle rotations between -8 and +8 degrees.
- Animate entrance from scale 0.85 to 1 with a quick fade-in.
- Hold briefly, then fade out and shrink slightly.
- Total lifetime: approximately 900ms.
- Maximum of five visible previews.
- Clear remaining previews when the pointer leaves the hero.
- Position previews relative to the hero and contain them within its bounds.

Protect headline legibility and keep buttons clickable. Use pointer-events: none on decorative previews. Keep the normal system cursor.

Use requestAnimationFrame and transform/opacity animations. Avoid continuous component rerenders on pointer movement.

Enable this only for devices with a fine pointer and hover support. On touch devices, show a compact static arrangement of project previews beneath the hero copy. Respect prefers-reduced-motion by replacing the trail with static imagery.

3. SELECTED WORK

Title:
“Selected work”

Supporting line:
“A selection of interfaces, identities, and visual explorations.”

Start with these three projects, in this order:
- Numa — Brand Identity
  Category: Branding
  Route: /work/numa-brand-identity
- Numa — Website Design
  Category: UI/UX Design
  Route: /work/numa-website
- Semiotics — Visual Exploration
  Category: Visual Communication
  Route: /work/semiotics

Map the uploaded images in the same order:
1. Numa branding project.
2. Numa website UI/UX project.
3. Semiotics project.

If the asset mapping is unclear, keep it easy to replace rather than guessing based on filenames.

Use large project images with titles and category labels beneath them. On desktop, create a two-column grid, with the third project spanning the full width if its image suits that layout. Stack projects on mobile.

Preserve image content and avoid cropping embedded text. Use contain where needed for presentation boards.

On hover:
- Gently scale the cover image to approximately 1.025 within its frame.
- Animate a small arrow beside the project title.
- Provide an equivalent visible keyboard focus state.

Entire project links should be usable with keyboard and touch.

Add:
“View all work” — links to /work.

4. ABOUT PREVIEW

Title:
“Curious by nature. Intentional by design.”

Copy:
“I’m Archie, a design student at NIFT Panchkula with an interest in how brands look, how interfaces work, and how both connect with people. My practice spans UI/UX, branding, and social media design, bringing together clear thinking and visual storytelling.”

Second paragraph:
“During my internship at Frodoh World, I worked across website UI/UX, social media creatives, and branding. As Cultural Club Secretary at NIFT Panchkula, I’ve also helped organise campus events, including Converge and Spectrum—experiences that have shaped how I collaborate, communicate, and take ideas into execution.”

Use a spacious two-column text layout on desktop and a single column on mobile. Leave room for a future portrait without inserting a stock

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eb2ea500-9448-44cf-a878-286120b89380).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
