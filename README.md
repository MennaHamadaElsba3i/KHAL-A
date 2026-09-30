<p align="center">
  <img src=".src/public/images/perfumes/banner.png" alt="KHALÉA — The Essence of Her." width="100%">
</p>
# KHALÉA — The Essence of Her.

A cinematic luxury perfume experience built around the idea of fragrance as a woman's invisible signature.

KHALÉA combines an editorial, feminine visual identity with a functional product discovery experience, including search, filtering, sorting, pagination, product details, and performance-focused architecture.

---

## ✦ About KHALÉA

KHALÉA is a fictional haute parfumerie brand created as a frontend project.

The experience was designed around a simple idea:

> A fragrance is more than a scent.  
> It is a memory, a mood, a signature.

Instead of treating the website as a traditional ecommerce catalog, the landing page focuses first on storytelling and brand identity, then gradually guides the user toward discovering the fragrance collection.

The full catalog is available through a dedicated Products experience with search, filters, sorting, and pagination.

---

## ✦ Features

### Brand Experience
- Editorial luxury landing page
- Responsive navigation
- Hero storytelling section
- Brand philosophy section
- Curated Signature Collection
- Fragrance Family discovery
- Newsletter CTA
- Responsive design across desktop, tablet, and mobile

### Product Discovery
- Product catalog
- Search by perfume name, description, and fragrance notes
- Filter by fragrance family
- Filter by mood
- Price range filtering
- Sorting
- Pagination
- Product detail pages
- Related products

### URL-Driven Catalog State
Catalog search, filters, sorting, and pagination are reflected directly in the URL.

Example:

`/products?search=rose&family=floral&sort=price&order=asc&page=2`

This allows users to:
- Refresh the page without losing their current state
- Share a filtered catalog URL
- Bookmark a specific product view
- Navigate naturally with browser Back / Forward

---

## ✦ Tech Stack

- **Next.js 16** — App Router and hybrid rendering
- **React 19**
- **TypeScript** — strict typing
- **Tailwind CSS v4** — design system and responsive styling
- **TanStack Query** — server-state management and caching
- **Axios** — centralized HTTP client
- **Zod** — runtime API and query validation
- **Lucide React** — interface icons
- **Next/Image** — responsive image optimization
- **Next.js Route Handlers** — project-owned Mock API
- **CSS Keyframes** — lightweight editorial animations

---

## ✦ Architecture

The project follows a feature-oriented architecture with a clear separation between UI, data fetching, services, API handling, and mock data.

```text
src/
├── app/
│   ├── (storefront)/
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── ...
│   │
│   ├── api/
│   │   ├── home/
│   │   ├── products/
│   │   └── categories/
│   │
│   └── layout.tsx
│
├── features/
│   ├── home/
│   ├── products/
│   ├── product-details/
│   └── categories/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── services/
├── mocks/
├── lib/
├── types/
└── config/

## ✦ Data Flow
The application keeps UI components separated from the API implementation.
UI Component
      ↓
Feature Hook
      ↓
TanStack Query
      ↓
Service Layer
      ↓
Axios
      ↓
Next.js Route Handler
      ↓
Mock Engine
      ↓
Mock Data
      ↓
Zod Validation
      ↓
UI
For the product catalog, the URL is the source of truth:
Browser URL
      ↓
useSearchParams()
      ↓
Product Query Parameters
      ↓
TanStack Query
      ↓
Products Service
      ↓
Axios
      ↓
/api/products
      ↓
Search / Filter / Sort / Pagination
      ↓
Validated Response
      ↓
Product Grid

```

## ✦ Rendering Strategy
KHALÉA uses different rendering strategies depending on the purpose of each page.

Landing Page — ISR

The landing page uses Incremental Static Regeneration with a one-hour revalidation period.

This keeps the marketing experience fast while still allowing content to be regenerated periodically.

Product Details — SSG

Individual perfume pages are statically generated using generateStaticParams.

This provides fast page delivery and allows product-specific metadata to be generated for SEO.

Products Page — Hybrid

The catalog uses a pre-rendered page shell while interactive product discovery is handled on the client through TanStack Query.

This keeps the initial structure lightweight while allowing search, filtering, sorting, and pagination to remain interactive.

✦ Performance

Performance was treated as part of the architecture rather than something added at the end.

Image Optimization
next/image
Responsive image sizes
Explicit aspect ratios
Above-the-fold image prioritization
Lazy loading for below-the-fold images

Data Performance
TanStack Query caching
Granular query keys
Configured stale times
Request deduplication
Previous data retained during pagination transitions

Rendering Performance
Server Components where interactivity is not required
Client Components only for interactive UI
Automatic Next.js route-level code splitting
Suspense-based loading boundaries

Animation Performance
Animations use lightweight CSS transitions and keyframes instead of a heavy animation library.

The interface also respects:
prefers-reduced-motion


## ✦ Loading, Empty & Error States
The product experience includes dedicated states for different network conditions:
Loading skeletons
Empty search results
API error state
Retry functionality
Product not-found handling

The Mock API can also simulate:
Network delays
Empty responses
Server errors

This makes the frontend behavior closer to a real-world application rather than assuming the API always responds instantly.

## ✦ Mock API

The project includes a project-owned Mock API built with Next.js Route Handlers.
Available endpoints:
GET /api/home
GET /api/categories
GET /api/products
GET /api/products/[slug]
The products endpoint supports:
search
family
mood
minPrice
maxPrice
sort
order
page
limit
The API performs filtering, sorting, pagination, and facet generation before returning the response.

The mock layer can also simulate delayed responses and server errors for testing loading and error states.

## ✦ Design Direction
The visual identity of KHALÉA is inspired by:

Quiet luxury
French haute parfumerie
Editorial fashion photography
Cinematic composition
Feminine minimalism
Warm neutral tones
Deep burgundy accents
Elegant serif typography

The design intentionally avoids:
Generic ecommerce layouts
Excessive cards
Neon colors
Heavy gradients
Overly decorative UI
Excessive animation
Generic AI-generated visual patterns

The goal was to make the interface feel like a luxury fragrance house first, and an ecommerce experience second.

## ✦ Accessibility

The interface includes accessibility considerations such as:
Semantic HTML
ARIA labels
Keyboard-friendly interactions
Escape-key drawer dismissal
Current navigation states
Reduced-motion support

## ✦ Getting Started
Clone the repository and install the dependencies:
npm install

Run the development server:
npm run dev

Open:
http://localhost:3000

To create a production build:
npm run build

## ✦ Project Status
KHALÉA is a frontend-focused project created to demonstrate:
Modern Next.js architecture
TypeScript
Server and Client Components
Hybrid rendering
API abstraction
Server-state management
URL-driven state
Runtime validation
Responsive UI
Image optimization
Performance-conscious frontend development

## ✦ Credits
Designed and developed as a frontend project by Menna Elsbaei.

KHALÉA
The Essence of Her.
