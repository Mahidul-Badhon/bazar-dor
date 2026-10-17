# বাজার দর (BazarDor)

## Short Description
বাজার দর (BazarDor) is a modern, real-time daily commodity price tracker tailored for consumers across Bangladesh. The platform aggregates fluctuating market rates, highlights daily price increases and decreases, breaks down regional market price ranges across divisions, and provides authenticated users with personalized profile management.

## Technologies Used
* Frontend Framework: Next.js (App Router, React Server Components)
* Language: TypeScript
* Styling & UI: Tailwind CSS, DaisyUI
* Authentication: Better Auth (Google & GitHub OAuth, Email/Password Credentials)
* Database: MongoDB
* Icons & Animation: React Marquee Text, Next.js Image Optimization

## 5 Key Features
* Real-Time Commodity Marquee & Price Dashboard: Live ticker and dashboard displaying commodity prices with dynamic Bengali numerals, unit definitions, and visual indicators for price surges or drops.
* Sorting Products: Products can be sort based on the price
* Division & Market-Wise Price Comparison: Interactive, fully responsive tables and mobile cards comparing minimum, maximum, and average commodity prices across major markets in different divisions.
* Category-Based Filtering, Marquee animation, Dynamic Routing: Dedicated dynamic routing (/category/[categoryId]), marquee style based products, and integrated notFound() handling for invalid routes.
* Secure Authentication & Profile Management: Multi-provider authentication (Google, GitHub, credentials) powered by Better Auth, protected routes via Next.js middleware, and real-time profile name updates and used necessary toast/notifications.