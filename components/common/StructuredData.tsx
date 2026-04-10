const faqs = [
  {
    q: 'Do you offer free estimates?',
    a: '100% free. We provide a full written estimate before any work begins. You only pay if you accept the quote. No trip fees, no hidden charges.',
  },
  {
    q: 'How fast can you respond to an emergency?',
    a: 'We typically respond within 30 minutes for emergency calls in our service area, 24/7.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. We are fully licensed and insured in both North Carolina and South Carolina.',
  },
  {
    q: 'Will you tear up my floors or yard to find a leak?',
    a: 'No. We use non-invasive acoustic sensors, thermal cameras, and pressure testing to pinpoint leaks with minimal disruption.',
  },
  {
    q: 'Is water leak damage covered by homeowner insurance?',
    a: 'In many cases, yes. We work with insurance adjusters and provide documentation for claims.',
  },
];

export default function StructuredData() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://southcharlotteplumbing.com',
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'South Charlotte Plumbing',
    url: 'https://southcharlotteplumbing.com',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
