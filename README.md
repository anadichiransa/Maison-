<h1> Maison | Luxury Real Estate Portal</h1>h1>
Maison is a high-end property directory designed for Sri Lanka’s most exclusive neighborhoods. This project focuses on a seamless, secure, and responsive user experience, utilizing modern React patterns and high-performance "Glassmorphism" aesthetics.

<h2> Key Features</h2>h2>
Dynamic Property Discovery: Real-time search and filtering across curated listings.

Interactive Favorites Portfolio: A specialized "Drag-and-Drop" style sidebar allowing users to curate their dream home collection.

Luxury 3D UI: Custom Glassmorphism tabs and GPU-accelerated animations for a "boutique" feel.

Fully Responsive: Bespoke hand-written media queries optimized for Desktop, iPad Landscape, and Mobile viewports.

Institutional Security: Robust Content Security Policy (CSP) and JSX auto-encoding to ensure user data integrity.

<h2> Technical Stack</h2>
Frontend: React.js (Hooks & State Management)

Styling: Custom CSS3 with CSS Variables (:root)

Security: Content Security Policy (CSP) headers & JSX Sanitization

Performance: GPU Hardware Acceleration (translateZ)

Icons & Fonts: Google Fonts (Poppins) & Lucide Icons

<h2>Reliability & Security</h2>
"Security is not a feature; it is a foundation."

XSS Protection: Implemented a strict Content Security Policy that whitelists only trusted resources (Google Maps, Fonts), neutralizing Cross-Site Scripting threats.

Data Integrity: All dynamic content is rendered using JSX Encoding, ensuring that user inputs are never executed as HTML.

Availability: The application maintains business continuity through a responsive design that ensures 100% functionality on mobile devices.

<h2>Responsive Design Justification</h2>
I implemented a custom layout strategy to ensure the "Maison" experience is never compromised on smaller screens:

1024px Transition: Switched to a Flexbox column layout, using order: -1 to prioritize the Favorites sidebar at the top of the mobile search page.

Property Details: Integrated horizontally scrollable 3D tabs for floorplans and descriptions, optimizing vertical space while maintaining interactivity.


<h2>Installation</h2>

Clone the Repository:
git clone https://github.com/anadichiransa/Maison-.git

Install Dependencies:
npm install

Launch the Platform:
npm start
