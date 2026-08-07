import { Github, Twitter, Linkedin, Dribbble } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Custom Development', href: '#services' },
    { label: 'Landing Pages', href: '#services' },
    { label: 'Portfolio Sites', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  connect: [
    { label: 'Telegram', href: 'https://t.me/yourusername' },
    { label: 'Email', href: 'mailto:hello@pixelstudio.dev' },
    { label: 'GitHub', href: '#' },
    { label: 'Dribbble', href: '#' },
  ],
}

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] pt-16 pb-8 px-5 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-start flex-wrap gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-[320px]">
            <a href="#" className="flex items-center gap-2.5 font-heading text-2xl font-bold text-text-primary no-underline mb-4">
              <img src="/assets/logo-icon.png" alt="Pixel Studio" width="30" height="30" className="object-contain flex-shrink-0" />
              Pixel Studio
            </a>
            <p className="text-sm text-text-secondary leading-relaxed">
              Premium freelance web development. Building digital experiences that look expensive,
              feel intuitive, and drive results.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 flex-wrap">
            <div>
              <h4 className="font-heading text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                Services
              </h4>
              {footerLinks.services.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-text-secondary hover:text-accent transition-colors mb-2.5 no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                Company
              </h4>
              {footerLinks.company.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-text-secondary hover:text-accent transition-colors mb-2.5 no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                Connect
              </h4>
              {footerLinks.connect.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block text-sm text-text-secondary hover:text-accent transition-colors mb-2.5 no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.08] pt-6 flex justify-between items-center flex-wrap gap-4">
          <p className="text-[13px] text-text-secondary">
            © {new Date().getFullYear()} Pixel Studio. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-text-secondary hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
