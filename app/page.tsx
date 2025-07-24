"use client"

import { useState, useEffect } from "react"
import { Menu, Phone, Mail, MapPin, Sparkles, Gem, Crown, Award, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ProductGrid } from "@/components/product-grid"
import { realProducts } from "@/lib/product-data"

export default function HomePage() {
  const [products, setProducts] = useState(realProducts)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Contact form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("Sending...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setFormStatus("Message sent!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } else {
      setFormStatus("Failed to send. Try again.");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  {/* <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <Gem className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                  </div> */}
                </div>
                <Image
                  src="/logo.png"
                  alt="AAB Studio Logo"
                  width={160}
                  height={60}
                  className="object-contain h-10 w-auto lg:h-32"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#collections"
                className="text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 relative group"
              >
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#about"
                className="text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#collections"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  Collections
                </Link>
                <Link
                  href="#about"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/AJ.jpg"
            alt="Timeless Elegance"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white space-y-6 lg:space-y-8 max-w-5xl mx-auto px-4">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-6">
              <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-amber-400 animate-pulse" />
              <span className="text-amber-400 font-medium tracking-wider uppercase text-xs lg:text-sm">
                Handcrafted Excellence
              </span>
              <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-amber-400 animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-serif font-light leading-tight">
              Timeless{" "}
              <span className="italic font-normal bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Elegance
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed opacity-90">
              Discover handcrafted jewelry that transcends time and tells your unique story. Each piece is meticulously
              designed and created in our studio with passion and precision.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center pt-6 lg:pt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 lg:px-10 py-3 lg:py-4 text-base lg:text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Collections
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 lg:px-10 py-3 lg:py-4 text-base lg:text-lg font-medium bg-transparent backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            >
              Our Craftsmanship
            </Button>
          </div>
        </div>
      </section>

      {/* Signature Collections */}
      <section id="collections" className="py-16 lg:py-24 bg-gradient-to-b from-white to-amber-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 lg:space-y-6 mb-16 lg:mb-20">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
              <Crown className="h-6 w-6 lg:h-8 lg:w-8 text-amber-600" />
              <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <h2 className="text-3xl lg:text-5xl font-serif font-light text-gray-900">Signature Collections</h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our curated selection of handcrafted jewelry, where each collection tells a unique story of
              artisanal excellence and timeless beauty.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                title: "Rings",
                subtitle: "Engagement, Wedding & Statement",
                image: "/images/rings.jpg",
                count: "45 Pieces",
              },
              {
                title: "Necklaces",
                subtitle: "Pendants, Chains & Statement Pieces",
                image: "/images/necklaces.jpg",
                count: "62 Pieces",
              },
              {
                title: "Earrings",
                subtitle: "Studs, Drops & Chandelier Earrings",
                image: "/images/earrings.jpg",
                count: "38 Pieces",
              },
              {
                title: "Bracelets",
                subtitle: "Tennis, Charm & Cuff Bracelets",
                image: "/images/bracelets.jpg",
                count: "55 Pieces",
              },
            ].map((collection, index) => (
              <div key={index} className="group cursor-pointer">
                {/* Only Image in Card */}
                <div className="aspect-square overflow-hidden relative rounded-lg shadow-lg bg-white mb-4 lg:mb-6 group-hover:shadow-xl transition-shadow">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs lg:text-sm font-medium">{collection.count}</span>
                  </div>
                </div>

                {/* Text Content Outside Card */}
                <div className="text-center space-y-2 lg:space-y-3">
                  <h3 className="text-lg lg:text-xl font-serif font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">{collection.subtitle}</p>
                  <div className="pt-2">
                    <span className="inline-block w-6 lg:w-8 h-0.5 bg-amber-400 group-hover:w-12 lg:group-hover:w-16 transition-all duration-500"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Crafting Dreams into Reality */}
      <section id="about" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h2 className="text-3xl lg:text-5xl font-serif font-light text-gray-900">
                  Crafting Dreams into <span className="text-amber-600 italic font-normal">Reality</span>
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                Arjas Studio is where India’s timeless artistry meets the world’s modern elegance.
Rooted in the Sanskrit word "Ārjas", meaning nobility, virtue, and purity of purpose, our name reflects the values we stand for — honest craftsmanship, elevated design, and integrity in creation.

                </p>
                <p className="text-gray-600 leading-relaxed">
                Every piece of jewellery we curate is handcrafted by skilled Indian artisans and designed to resonate globally — an expression of authentic beauty shaped by human hands, heritage, and heart.
                </p>
                <p className="text-gray-600 leading-relaxed">
                We believe that jewellery isn’t just ornamentation — it’s a bridge between cultures, a whisper of the past carried into the future, and a personal talisman of identity. At Arjas Studio, we craft treasures that travel — from Indian hands to global hearts.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-amber-600 mb-2">2021</div>
                  <div className="text-gray-600 text-sm lg:text-base">Year Established</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-amber-600 mb-2">15</div>
                  <div className="text-gray-600 text-sm lg:text-base">Master Artisans</div>
                </div>
              </div>

              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 lg:px-8 py-2 lg:py-3">
                Learn Our Story
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="space-y-3 lg:space-y-4">
                <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/about/arjas1.jpg"
                    alt="Artisan at work"
                    width={320}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/about/arjas2.jpg"
                    alt="Jewelry tools"
                    width={320}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 lg:space-y-4 pt-6 lg:pt-8">
                <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/about/arjas3.jpg"
                    alt="Polishing jewelry"
                    width={320}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/about/arjas4.jpg"
                    alt="Finished pieces"
                    width={320}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creations with Working Pagination */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#f8e6c0] via-[#f2cc8f] to-[#e8b05e]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 lg:space-y-6 mb-16 lg:mb-20">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
              <Award className="h-6 w-6 lg:h-8 lg:w-8 text-amber-600" />
              <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <h2 className="text-3xl lg:text-5xl font-serif font-light text-gray-900">Featured Creations</h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each piece in our featured collection represents the pinnacle of our craftsmanship and artistic vision.
              Discover over 200 unique handcrafted pieces.
            </p>
          </div>

          <ProductGrid products={products} itemsPerPage={12} />
        </div>
      </section>

      {/* Extraordinary Services Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-24 h-24 lg:w-32 lg:h-32 bg-amber-500/10 rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-16 h-16 lg:w-24 lg:h-24 bg-amber-400/10 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-32 h-32 lg:w-40 lg:h-40 bg-amber-600/10 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-1/3 w-20 h-20 lg:w-28 lg:h-28 bg-amber-300/10 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 lg:space-y-6 mb-16 lg:mb-20">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
              <Sparkles
                className="h-6 w-6 lg:h-8 lg:w-8 text-amber-400 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <h2 className="text-3xl lg:text-5xl font-serif font-light text-white">Exclusive Services</h2>
            <p className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Beyond creating exceptional jewelry, we offer personalized services to create your dream piece and
              maintain your treasured collection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Crown className="h-8 w-8 lg:h-12 lg:w-12" />,
                title: "Custom Design",
                description:
                  "Work directly with our master craftsmen to create a truly unique piece that reflects your personal style and story.",
                color: "from-amber-400 to-amber-600",
              },
              {
                icon: <Gem className="h-8 w-8 lg:h-12 lg:w-12" />,
                title: "Restoration",
                description:
                  "Breathe new life into your treasured heirloom pieces with our expert restoration and repair services.",
                color: "from-amber-500 to-amber-700",
              },
              {
                icon: <Sparkles className="h-8 w-8 lg:h-12 lg:w-12" />,
                title: "Personal Consultation",
                description:
                  "Schedule a private appointment to explore our collections and receive personalized guidance for your jewelry needs.",
                color: "from-amber-600 to-amber-800",
              },
            ].map((service, index) => (
              <div key={index} className="group text-center space-y-4 lg:space-y-6">
                {/* Icon with Animation - Only this highlights */}
                <div className="relative">
                  <div
                    className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center text-white mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl group-hover:shadow-amber-500/25`}
                  >
                    {service.icon}
                  </div>
                  <div
                    className={`absolute inset-0 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${service.color} rounded-full mx-auto animate-ping opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>
                </div>

                <h3 className="text-xl lg:text-2xl font-serif font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 text-sm lg:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Contact Section */}
      <section
        id="contact"
        className="py-16 lg:py-20 bg-gradient-to-br from-[#fdf6e3] via-[#f5c97b] to-[#c9972b] relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                  <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
                  <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-amber-600" />
                  <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
                </div>
                <h2 className="text-3xl lg:text-5xl font-serif font-light text-gray-900 text-center lg:text-left">
                  Begin Your <span className="text-amber-600 italic font-normal">Journey</span>
                </h2>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                  Whether you're seeking the perfect engagement ring, a meaningful gift, or a custom creation that tells
                  your unique story, we're here to guide you every step of the way.
                </p>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-amber-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 lg:h-5 lg:w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm lg:text-base">Visit Our Studio</div>
                    <div className="text-gray-600 text-xs lg:text-sm">Schedule a private consultation</div>
                    <div className="text-amber-600 font-medium text-xs lg:text-sm">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-amber-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 lg:h-5 lg:w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm lg:text-base">Email Us</div>
                    <div className="text-gray-600 text-xs lg:text-sm">Get in touch anytime</div>
                    <div className="text-amber-600 font-medium text-xs lg:text-sm">hello@aabstudio.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-amber-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 lg:h-5 lg:w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm lg:text-base">Find Us</div>
                    <div className="text-gray-600 text-xs lg:text-sm">Jewelry shows across USA</div>
                    <div className="text-amber-600 font-medium text-xs lg:text-sm">See our show schedule</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 lg:pt-4">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 lg:px-8 py-2 lg:py-3 w-full lg:w-auto">
                  Schedule Consultation
                </Button>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-6 lg:p-8 space-y-4 lg:space-backdrop-blur-sm bg-white/30 border border-white/30 shadow-xl ring-1 ring-white/10 rounded-xl p-6 lg:p-8 space-y-4 lg:space-y-4">
              <div className="text-center space-y-2 lg:space-y-3">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>

 <h3 className="text-xl lg:text-2xl font-serif font-semibold text-gray-900">Get In Touch</h3>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
    <div className="space-y-1">
      <Input
        name="firstName"
        placeholder="First Name"
        className="bg-[#fff3e0] border-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-sm lg:text-base"
        value={form.firstName}
        onChange={handleFormChange}
      />
    </div>
    <div className="space-y-1">
      
      <Input
        name="lastName"
        placeholder="Last Name"
        className="bg-[#fff3e0] border-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-sm lg:text-base"
        value={form.lastName}
        onChange={handleFormChange}
      />
    </div>
  </div>

  <div className="space-y-1">
  
    <Input
      name="email"
      type="email"
      placeholder="Email Address"
      className="bg-[#fff3e0] border-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-sm lg:text-base"
      value={form.email}
      onChange={handleFormChange}
    />
  </div>

  <div className="space-y-1">
   
    <Input
      name="phone"
      type="tel"
      placeholder="Phone Number"
      className="bg-[#fff3e0] border-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-sm lg:text-base"
      value={form.phone}
      onChange={handleFormChange}
    />
  </div>

  <div className="space-y-1">
    
    <select
      name="service"
      className="w-full px-3 py-2 border rounded-md text-sm bg-[#fff3e0] border-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-sm lg:text-base"
      value={form.service}
      onChange={handleFormChange}
    >
      <option value="">Select Interest</option>
      <option>Custom Design</option>
      <option>Engagement Ring</option>
      <option>Restoration</option>
      <option>General Inquiry</option>
    </select>
  </div>

  <div className="space-y-1">

    <Textarea
      name="message"
      placeholder="Tell us about your vision..."
      className="bg-[#fff3e0] border-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-sm lg:text-base"
      value={form.message}
      onChange={handleFormChange}
    />
  </div>

  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 lg:py-3 text-sm lg:text-base">
    Send Message
    <Sparkles className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
  </Button>

  {formStatus && (
    <div className="text-center text-sm text-amber-600 pt-2">{formStatus}</div>
  )}
</form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div className="col-span-2 md:col-span-1 space-y-1">
              <div className="flex items-center space-x-3">
                {/* <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Gem className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div> */}
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
</div>
              <div className="flex space-x-3">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">i</span>
                </div>
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">t</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-base lg:text-lg">Collections</h4>
              <div className="space-y-2 text-gray-400 text-sm lg:text-base">
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Engagement Rings
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Wedding Bands
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Necklaces
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Earrings
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Bracelets
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-base lg:text-lg">Support</h4>
              <div className="space-y-2 text-gray-400 text-sm lg:text-base">
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Size Guide
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Care Instructions
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Warranty
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Returns
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  FAQ
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-base lg:text-lg">Company</h4>
              <div className="space-y-2 text-gray-400 text-sm lg:text-base">
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  About Us
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Our Story
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Careers
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Press
                </Link>
                <Link href="#" className="block hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm lg:text-base text-center md:text-left">
              &copy; 2024 AAB Studio. All rights reserved. Handcrafted with love in the USA.
            </p>
            <div className="flex flex-wrap justify-center space-x-4 lg:space-x-6">
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm lg:text-base">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm lg:text-base">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm lg:text-base">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
