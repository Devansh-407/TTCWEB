import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getContact } from "@/lib/data-loader"

export default function ContactPage() {
  const contact = getContact()
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contact.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {contact.description}
          </p>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">{contact.phone}</p>
              <p className="text-gray-500 text-sm">Available 24/7</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">{contact.email}</p>
              <p className="text-gray-500 text-sm">We respond within 24 hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">{contact.address}</p>
              <p className="text-gray-500 text-sm">
                {contact.hours.weekdays}<br />
                {contact.hours.saturday}<br />
                {contact.hours.sunday}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Looking for something specific?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
                <Link href="/gifts">Browse Gifts</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/about">About Us</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/signin">My Account</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contact.connectWithUs.title}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {contact.connectWithUs.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {contact.socialMedia.map((social) => (
                <div key={social.platform} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 ${
                    social.platform === 'Facebook' ? 'bg-blue-500' :
                    social.platform === 'Instagram' ? 'bg-purple-500' :
                    social.platform === 'Twitter' ? 'bg-sky-400' :
                    'bg-blue-600'
                  } rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {social.platform === 'Facebook' && <Facebook className="w-8 h-8 text-white" />}
                    {social.platform === 'Instagram' && <Instagram className="w-8 h-8 text-white" />}
                    {social.platform === 'Twitter' && <Twitter className="w-8 h-8 text-white" />}
                    {social.platform === 'LinkedIn' && <Linkedin className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{social.platform}</h3>
                  <p className="text-gray-600 text-sm mb-4">{social.followers}</p>
                  <Button asChild className={`w-full ${
                    social.platform === 'Facebook' ? 'bg-blue-500 hover:bg-blue-600' :
                    social.platform === 'Instagram' ? 'bg-purple-500 hover:bg-purple-600' :
                    social.platform === 'Twitter' ? 'bg-sky-400 hover:bg-sky-500' :
                    'bg-blue-600 hover:bg-blue-700'
                  } text-white`}>
                    <Link href={social.link} target="_blank" rel="noopener noreferrer">
                      Follow
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Recent Posts Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contact.recentPosts.title}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {contact.recentPosts.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contact.recentPosts.posts.map((post, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt="Post"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        {post.platform}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">{post.timeAgo}</p>
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    {post.redirectLink && (
                      <Button asChild variant="outline" className="w-full text-purple-600 border-purple-300 hover:bg-purple-50">
                        <Link href={post.redirectLink} target="_blank" rel="noopener noreferrer">
                          View on {post.platform} →
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
