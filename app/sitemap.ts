// app/sitemap.ts
import { MetadataRoute } from 'next';

const baseUrl = 'https://www.klickstock.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // You can put your static URLs directly
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as 'daily', // Use 'as' for type assertion
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'daily' as 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contributor`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/license`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.5,
    },
    // Note: Remove the /sitemap entry, it's not needed if sitemap.xml is at root
    // {
    //   url: `${baseUrl}/sitemap`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.4,
    // },
  ];

  // For your dynamic gallery pages, you MUST fetch them here.
  // This is a placeholder for your actual data fetching logic.
  // Replace this with how you get your gallery item IDs and their last modification dates.
  const galleryItems = await fetchGalleryData(); // Implement this function!

  const dynamicUrls = galleryItems.map(item => ({
    url: `${baseUrl}/gallery/${item.id}`,
    lastModified: new Date(item.lastModifiedDate), // Use your actual date field
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.6,
  }));

  return [...staticUrls, ...dynamicUrls];
}

// Dummy function - REPLACE THIS WITH YOUR ACTUAL DATA FETCHING LOGIC
async function fetchGalleryData() {
  // This is where you would fetch data from your database, CMS, or API.
  // Example with dummy data:
  return [
    { id: 'cmd4zr6vn0001l804wt0c9rc5', lastModifiedDate: '2025-07-15T20:36:40.943Z' },
    { id: 'cmd4zr6xm0003l804go1dsbmp', lastModifiedDate: '2025-07-15T20:36:40.425Z' },
    { id: 'cmd4zr6yp0005l804ic5kjem0', lastModifiedDate: '2025-07-15T20:36:39.943Z' },
    // ... and so on for all your gallery items
    { id: 'cmd4za32u002tla04zcm9axrs', lastModifiedDate: '2025-07-15T20:23:23.470Z' },
    // Add all your real dynamic gallery IDs and their last modification dates here
  ];
  // Example if fetching from an API:
  // const res = await fetch('YOUR_API_ENDPOINT_FOR_GALLERY_ITEMS');
  // const data = await res.json();
  // return data.items; // Assuming your API returns an array of items with 'id' and 'lastModifiedDate'
}
