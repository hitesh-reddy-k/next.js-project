name:-hitesh reddy kadiri
date:-28-10-2025


Ecommerce Mini Project

(SSG + SSR + ISR + On-Demand Revalidation + Admin Panel)

This project is a small ecommerce web application built using Next.js 13. It demonstrates hybrid rendering using both the Pages Router and the App Router, along with static generation, server-side rendering, incremental static regeneration, and on-demand revalidation after updates.

Features Implemented
1. Static Site Generation (SSG)

The homepage (pages/index.js) is generated at build time using getStaticProps. The product list is fetched from MongoDB and stored as static content to provide fast load times.

2. Incremental Static Regeneration (ISR)

The homepage uses a revalidate interval so it can be automatically regenerated in the background after a set time window, without requiring a full rebuild.

3. On-Demand ISR (Manual Revalidation)

When a new product is added from the Admin Panel, the application triggers a call to a revalidation API route (/api/revalidate). This forces the homepage to regenerate immediately, demonstrating real-time content updates without waiting for the scheduled revalidate timer.

4. Server-Side Rendering (SSR)

The dashboard page uses getServerSideProps, which means it always serves the latest data from the database on each request. This is suitable for admin statistics that should not be cached.

5. Server Components (App Router)

The recommendations page is implemented in the app/recommendations/page.js file. Because it is in the App Router and does not use use client, it is rendered as a server component by default.

6. Admin Panel (Client Component)

The admin panel is implemented as a client component. It allows adding new products to the database and requires an admin key for security. After inserting a new product, it triggers ISR revalidation so that the homepage is updated instantly.

7. Dynamic Metadata

The individual product detail pages in the App Router can dynamically set the HTML metadata (title and meta description) based on data from the database.

Rendering Strategy

The homepage uses SSG with ISR.

The dashboard uses SSR via getServerSideProps.

The recommendations page uses server components in the App Router.

The admin panel is a client-rendered page.

The product detail page is dynamically generated and can be server-rendered.

Revalidation is done on-demand after updates through a dedicated API route.

On-Demand Revalidation Workflow

The admin adds or updates a product.

The /api/products route saves the product to MongoDB.

After saving, it requests /api/revalidate.

The homepage is instantly regenerated.

Returning to the home page now displays the updated content immediately.

Project Structure Summary

pages/index.js : SSG + ISR (static catalog)

pages/dashboard.js : SSR (live statistics)

pages/admin.js : Client component admin form

app/recommendations/page.js : Server component (App Router)

pages/api/products.js : Creates new products in the database

pages/api/revalidate.js : Triggers on-demand ISR

lib/database.js and models/product.js : Database connection and schema

Setup Instructions

Install dependencies:

npm install


Create a .env.local file with database credentials and server configuration:

MONGODB_URI=your_mongodb_url
ADMIN_SECRET=some-secret-key

npm run dev

Architecture Overview

The project uses a hybrid architecture that combines both the Pages Router and the App Router, which is a requirement of the assignment. The home page, admin panel, and dashboard are part of the Pages Router, while the recommendations feature is implemented using the App Router.

Data is stored in MongoDB and accessed through a Mongoose model. The application uses both server-rendered and statically rendered pages depending on the requirements of performance and data freshness.

The key architectural principle demonstrated in this project is choosing the appropriate rendering strategy based on the nature of the content:

Static pages for content that does not change frequently

Server-rendered pages for content that must always be up-to-date

Incremental static regeneration for a balance of performance and freshness

On-demand revalidation for immediate updates after writes or admin actions

Why Each Rendering Method Was Used
Home Page (SSG + ISR)

The home page shows a list of all products. Product lists do not need to be regenerated on every request, so static rendering provides better performance. At the same time, new products should eventually appear on the page, which is why incremental static regeneration is added. This achieves both fast performance and periodic freshness.

On-Demand Revalidation

Scheduled ISR alone is not enough to satisfy the requirement of demonstrating cache invalidation on update. Therefore, an API endpoint was created to trigger manual regeneration immediately after new data is inserted by the admin. This allows updates to appear in real-time.

Dashboard (SSR)

The dashboard displays inventory and stock warnings. Since stock data can be considered "real-time" and administrators should always see the latest numbers, server-side rendering is used. The page is regenerated on every request.

Recommendations Page (Server Component in App Router)

This page is implemented in the App Router to demonstrate the required use of server components. Server components render on the server by default and do not ship JavaScript to the browser for UI elements that do not require client interactivity.

Admin Panel (Client Component)

The admin panel includes a form and user interaction logic, so it must be a client component. It sends POST requests to the API to modify the database and triggers revalidation.

Product Detail Page

The product detail page can dynamically generate metadata (such as the HTML title and description) based on product data. This ensures the page is more SEO-optimized and feels dynamic even though it is still statically generated or server-rendered depending on implementation.

Data Flow

A user visits the home page.

The home page is served as a static page generated by getStaticProps.

An admin logs in to the admin panel and adds a new product.

The product is saved to MongoDB using an API route.

After saving, a request is made to the revalidation route.

The revalidation route instructs Next.js to regenerate the static home page.

The next time a user requests the home page, it serves the updated version.

Deployment Notes

This application is compatible with Vercel deployment. On Vercel, ISR and on-demand revalidation work natively without additional server configuration. Environment variables should be configured through the Vercel dashboard.

The revalidate API endpoint must be protected using a secret token environment variable to prevent unauthorized triggering of regeneration.

Future Improvements (Optional)

The following improvements could be made to extend the project further if desired:

Add pagination to the home page to handle large product lists

Add user authentication for the admin panel

Add image upload functionality for each product

Add product filtering or sorting capability on the home page

Add "related products" to the product detail page based on category

Add low-inventory email notifications

Convert styling to Tailwind CSS for consistency with App Router best practices

Run the development server:

npm run dev
