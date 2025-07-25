"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Logo + Description + Socials */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex flex-col items-left sm:items-start gap-2 sm:gap-3">
              <div className="relative w-24 sm:w-32 lg:w-40 h-[50px] sm:h-[60px] lg:h-[100px]">
                <Image
                  src="/logo.png"
                  alt="Arjas Studio Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-gray-400 text-center sm:text-left text-sm lg:text-base leading-relaxed">
                Creating timeless luxury jewelry pieces that celebrate life's most precious moments.
              </p>
            </div>

            <div className="flex space-x-3">
  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
      <Facebook className="w-4 h-4 text-white" />
    </div>
  </Link>
  <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
      <Instagram className="w-4 h-4 text-white" />
    </div>
  </Link>
  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
      <Twitter className="w-4 h-4 text-white" />
    </div>
  </Link>
</div>

          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base lg:text-lg">Collections</h4>
            <div className="space-y-2 text-gray-400 text-sm lg:text-base">
              {["Engagement Rings", "Wedding Bands", "Necklaces", "Earrings", "Bracelets"].map((item) => (
                <Link key={item} href="#" className="block hover:text-amber-400 transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base lg:text-lg">Support</h4>
            <div className="space-y-2 text-gray-400 text-sm lg:text-base">
              {["Size Guide", "Care Instructions", "Warranty", "Returns", "FAQ"].map((item) => (
                <Link key={item} href="#" className="block hover:text-amber-400 transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base lg:text-lg">Company</h4>
            <div className="space-y-2 text-gray-400 text-sm lg:text-base">
              {["About Us", "Our Story", "Careers", "Press", "Contact"].map((item) => (
                <Link key={item} href="#" className="block hover:text-amber-400 transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm lg:text-base text-center md:text-left">
            &copy; {new Date().getFullYear()} Arjas Studio. All rights reserved. Handcrafted with love in the USA.
          </p>
          <div className="flex flex-wrap justify-center space-x-4 lg:space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link key={item} href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm lg:text-base">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
