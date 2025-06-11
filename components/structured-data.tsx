'use client'

import Script from 'next/script'

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'creativework'
  data?: Record<string, any>
}

export function StructuredData({ type = 'website', data = {} }: StructuredDataProps) {
  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Klick Stock",
    "alternateName": "Klick Stock - Premium Creative Resources",
    "description": "Discover high-quality images, graphics, and digital assets for your creative projects",
    "url": "https://klickstock.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://klickstock.com/gallery?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Klick Stock",
      "url": "https://klickstock.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://klickstock.com/icon.svg",
        "width": 64,
        "height": 64
      },
      "sameAs": [
        "https://twitter.com/klickstock",
        "https://instagram.com/klickstock",
        "https://facebook.com/klickstock"
      ]
    },
    "author": {
      "@type": "Organization",
      "name": "Klick Stock Team"
    },
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Klick Stock"
    },
    "copyrightYear": new Date().getFullYear(),
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "keywords": "stock photos, digital assets, creative resources, graphics, illustrations, vectors, design assets, premium images, royalty free, creative content, photography, digital art",
    ...data
  })

  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Klick Stock",
    "alternateName": "Klick Stock Platform",
    "description": "Premium creative resources platform offering high-quality images, graphics, and digital assets",
    "url": "https://klickstock.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://klickstock.com/icon.svg",
      "width": 64,
      "height": 64
    },
    "foundingDate": "2024",
    "knowsAbout": [
      "Stock Photography",
      "Digital Assets",
      "Creative Resources",
      "Graphic Design",
      "Vector Graphics",
      "Illustrations"
    ],
    "sameAs": [
      "https://twitter.com/klickstock",
      "https://instagram.com/klickstock",
      "https://facebook.com/klickstock"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://klickstock.com/contact",
      "availableLanguage": "English"
    },
    "offers": {
      "@type": "Offer",
      "category": "Creative Resources",
      "description": "Premium digital assets and creative resources"
    },
    ...data
  })

  const getCreativeWorkSchema = () => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": data.title || "Creative Asset",
    "description": data.description || "High-quality creative resource",
    "url": data.url || "https://klickstock.com",
    "image": data.image,
    "author": {
      "@type": "Person",
      "name": data.author || "Klick Stock Contributor"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Klick Stock",
      "url": "https://klickstock.com"
    },
    "dateCreated": data.dateCreated,
    "dateModified": data.dateModified,
    "license": "https://klickstock.com/license",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Klick Stock"
    },
    "keywords": data.keywords || "creative, digital asset, stock",
    "genre": data.genre || "Digital Art",
    "isAccessibleForFree": false,
    "usageInfo": "https://klickstock.com/license",
    ...data
  })

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return getOrganizationSchema()
      case 'creativework':
        return getCreativeWorkSchema()
      default:
        return getWebsiteSchema()
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema())
      }}
    />
  )
} 