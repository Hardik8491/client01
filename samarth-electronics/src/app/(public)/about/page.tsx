import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Award, Users, Factory, ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Samarth Electronics — Rajkot's premier B2B electronics manufacturing company led by Gopal Bhammar.",
};

const MILESTONES = [
  { year: "2012", event: "Founded by Gopal Bhammar in Rajkot, Gujarat" },
  { year: "2015", event: "Expanded to 5,000 sq.ft. dedicated SMT facility" },
  { year: "2018", event: "Crossed ₹1 Crore monthly production milestone" },
  { year: "2020", event: "Launched IoT Gateway product line for Industry 4.0" },
  { year: "2022", event: "250+ B2B clients. 50,000+ units shipped per year" },
  { year: "2024", event: "New 10,000 sq.ft. facility with automated AOI inspection" },
];

const VALUES = [
  { icon: Award, title: "Quality First", desc: "IPC-A-610 Class 2/3 workmanship. Zero-defect culture backed by systematic burn-in testing." },
  { icon: Users, title: "Client Partnership", desc: "We treat every B2B client as a long-term partner, not a one-time transaction." },
  { icon: Factory, title: "In-House Expertise", desc: "Design, firmware, PCB layout, assembly, testing — all under one roof in Rajkot." },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-5">
              Powering India&apos;s Industrial Revolution
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              We are Samarth Electronics — a Rajkot-based B2B electronics manufacturing company engineering
              industrial-grade controllers, power electronics, and IoT hardware for manufacturers across India.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
                alt="Gopal Bhammar - Founder, Samarth Electronics"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Our Founder</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                Gopal Bhammar — Engineer, Entrepreneur, Builder
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Gopal Bhammar started Samarth Electronics in 2012 with a singular vision — to build
                electronics that work reliably in India&apos;s harsh industrial environments. Coming from
                a background in power electronics and embedded systems, Gopal brought engineering
                discipline and manufacturing precision to every product.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                What began as a small assembly unit has grown into a 10,000 sq.ft. manufacturing facility
                serving 250+ B2B clients — from automation panel makers and OEM product companies to
                renewable energy system integrators and textile machinery manufacturers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Today, Gopal personally oversees quality, client partnerships, and new product engineering —
                ensuring every client receives the same precision and care that built Samarth&apos;s reputation.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "12+ years in industrial electronics",
                  "Expertise in SMPS & power electronics",
                  "IoT & embedded systems specialist",
                  "Active member of GIDC Electronics Industry",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">12 Years of Growth</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100" />
            <div className="space-y-8">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex gap-6 relative">
                  <div className="relative z-10 w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {m.year}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5 flex-1 shadow-sm border border-gray-100">
                    <p className="text-gray-700 font-medium">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Join 250+ manufacturers who trust Samarth Electronics for precision electronics manufacturing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              Start a Conversation <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Gopal
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

