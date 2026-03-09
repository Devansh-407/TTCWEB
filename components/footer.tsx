import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { getFooter, getSiteConfig, getContact } from "@/lib/data-loader"

export function Footer() {
  const footer = getFooter()
  const siteConfig = getSiteConfig()
  const contact = getContact()
  const navItems = siteConfig.navigation
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">{siteConfig.siteName}</h3>
            <p className="text-gray-300 text-sm">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{footer.quickLinksTitle}</h4>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{footer.contactInfoTitle}</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
              <p>{contact.address}</p>
            </div>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{footer.followUsTitle}</h4>
            <div className="flex space-x-4">
              {contact.socialMedia.map((social) => (
                <Link key={social.platform} href={social.link} className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  {social.platform === 'Facebook' && <Facebook className="h-5 w-5" />}
                  {social.platform === 'Instagram' && <Instagram className="h-5 w-5" />}
                  {social.platform === 'Twitter' && <Twitter className="h-5 w-5" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
