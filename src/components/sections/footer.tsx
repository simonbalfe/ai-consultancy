import { Facebook, Linkedin, Twitter } from "lucide-react";

const navigation = [
  {
    title: "Product",
    links: [
      { name: "Home", href: "/" },
      { name: "Features", href: "/features" },
      { name: "Blog", href: "/blog" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Faq", href: "/faq" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Settings", href: "/cookie-policy" },
  { name: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="text-foreground bg-obsidian px-2.5 lg:px-0">
      <div className="container p-0">
        {/* top grid */}
        <div className="bg-jet grid border-l border-r border-dark-gray p-0 lg:grid-cols-3">
          {navigation.map((section) => (
            <div
              key={section.title}
              className="border-b border-b-dark-gray px-6 py-10 lg:border-r lg:border-r-dark-gray lg:px-8 lg:py-12"
            >
              <h3 className="mb-4 text-2xl font-bold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-muted-foreground lg:text-lg"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* social icons */}
          <div className="border-b border-b-dark-gray px-6 py-10 lg:px-8 lg:py-12">
            <div className="flex items-center gap-6 lg:justify-end">
              {socialLinks.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  aria-label={href}
                  className="transition-colors hover:text-muted-foreground"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* disclaimer + logo */}
        <div className="bg-jet grid border-b border-l border-r border-dark-gray lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-b-dark-gray px-6 py-10 lg:max-w-md lg:border-b-0 lg:px-8 lg:py-12">
            <div className="max-w-md">
              <p className="text-foreground text-sm">Regulatory disclaimer</p>
              <p className="font-inter-tight text-mid-gray text-xs">
                Aspect is a financial technology company, not a bank. Banking
                services are provided by partner institutions and are
                FDIC‑insured up to applicable limits.
              </p>
            </div>
          </div>

          <div className="px-6 py-10 lg:px-8 lg:py-12">
            <img
              src="/images/layout/logo.svg"
              alt="logo"
              width="160"
              height="40"
              className="invert dark:invert-0"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* bottom bar */}
        <div className="bg-jet grid gap-2 border-l border-r border-dark-gray px-6 py-4 sm:grid-cols-2 lg:px-8">
          <p className="text-foreground text-xs">@ 2025 FinSight Demi Inc.</p>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            {legal.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs underline hover:text-muted-foreground"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
