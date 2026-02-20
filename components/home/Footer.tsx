"use client"

import { Mail, Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/h" },
    { name: "About", href: "/h/about" },
    { name: "Answers", href: "/h/answers" },
    { name: "Guides & Tools", href: "/h/guides-tools" },
    { name: "Blog", href: "/h/blogs" },
    { name: "Resources", href: "/h/resources" },
    { name: "Community", href: "/h/community" },
    { name: "Retreats", href: "/h/retreats" },
    { name: "Contact", href: "/h/contact" },
  ]

  const serviceLinks = [
    { name: "Astrological Chart Reading", href: "/h/astrological-chart-reading" },
    { name: "Meditation And Yoga", href: "/h/meditation-and-yoga" },
    { name: "Spiritual Guidance", href: "/h/spiritual-guidance" },
    { name: "Jyotish Consultancy", href: "/h/jyotish-consultancy" },
  ]

  const legalLinks = [
    { name: "Legal Hub", href: "/h/legal" },
    { name: "Privacy Policy", href: "/h/privacy" },
    { name: "Terms & Conditions", href: "/h/terms-and-conditions" },
    { name: "FAQ", href: "/h/faq" },
  ]

  return (
    <footer className="bg-slate-900 border-primary-600">
      <div className="container mx-auto px-6 pt-12 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/h" className="block">
              <Image
                src="/logo.png"
                alt="AnswerForSelf"
                width={180}
                height={60}
                className="h-12 w-auto rounded-full"
              />
            </Link>
            <p className="text-neutral-300 text-sm">
              A home for self-reflection, spiritual growth, meditation guidance,
              and practical tools to navigate life with clarity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Site Map</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/h/retreats"
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  Retreats & Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="/h/appointment"
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  Book an Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <p className="text-neutral-300 text-sm">
                  Kathmandu, Nepal (Online Available)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary-400 mt-0.5" />
                <p className="text-neutral-300 text-sm">
                  <a
                    href="tel:+9779841647283"
                    className="hover:text-white transition-colors"
                  >
                    +977 9841647283
                  </a>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-400 mt-0.5" />
                <p className="text-neutral-300 text-sm">
                  <a
                    href="mailto:meditationastro1@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    meditationastro1@gmail.com
                  </a>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary-400 mt-0.5" />
                <p className="text-neutral-300 text-sm">Mon–Sat: 10:00–18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p className="text-neutral-400 text-xs">
            © {new Date().getFullYear()} AnswerForSelf. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-neutral-400 hover:text-white transition-colors text-xs"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
