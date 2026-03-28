export const SITE_TITLE = "HermesOps - AI Systems That Work While You Sleep";
export const SITE_DESCRIPTION =
  "We build custom AI systems that automate your operations, save your team hours every week, and scale with your business.";

export const CALENDLY_URL = "https://calendly.com/simon-simonbalfe/30min";

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: "%s | HermesOps",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI Consultancy",
    "AI Automation",
    "Business Automation",
    "AI Systems",
    "Custom AI",
    "Workflow Automation",
  ],
  authors: [{ name: "HermesOps" }],
  creator: "HermesOps",
  publisher: "HermesOps",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/images/layout/hermesops-icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon/favicon.ico" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "HermesOps",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HermesOps - AI Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: "@hermesops",
  },
};
