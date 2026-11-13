// Default content values for public pages in Samarth Electronics Hub
// Used when database records have not yet been customized

export interface FAQItemData {
  id?: string;
  tag: string;
  question: string;
  answer: string;
  isActive?: boolean;
}

export interface PartnerData {
  name: string;
  role: string;
  phone: string;
  email: string;
  focus: string;
  bio: string;
}

export interface MilestoneData {
  date: string;
  title: string;
  detail: string;
}

export const defaultPageContents = {
  global: {
    announcement: {
      enabled: true,
      text: "💡 LED Lighting & Electrical Solutions — Dahod, Gujarat",
      actionText: "Download Trade Catalogue (PDF)",
      actionUrl: "/catalogue/samarth-electronics-catalogue.pdf",
      highlightOffer: "Wholesale B2B Supply Available",
    },
    faqs: [
      {
        tag: "Orders & MOQ",
        question: "What is the Minimum Order Quantity (MOQ) for wholesale or dealer pricing?",
        answer:
          "We cater to both commercial lighting contractors and regional electrical retail shops. For standard lines like LED panels, downlights, and regular bulbs, orders can start from single master cartons (typically 10 to 50 pieces per carton depending on the fixture). We also support flexible mixed-carton trial orders for contractors fitting out specific architectural or site requirements.",
        isActive: true,
      },
      {
        tag: "Warranty & Replacement",
        question: "What warranty and replacement guarantees are provided on LED fixtures and SMPS drivers?",
        answer:
          "We stand firmly behind our build quality. Fixtures and solid-state SMPS drivers carry standard 1-year to 2+ years (up to 27 months on select premium panel, cob spotlight, and floodlight series) replacement guarantee. For verified electrical or driver defects, we provide fast, direct piece-to-piece replacement from our Limdi, Dahod depot.",
        isActive: true,
      },
      {
        tag: "Logistics & Transport",
        question: "How are orders dispatched and delivered across Gujarat, MP, Rajasthan, and pan-India?",
        answer:
          "Located strategically in Limdi (Dahod district, close to the Gujarat-MP-Rajasthan transit corridor), we dispatch daily through leading road transport partners including V-Trans, TCI Freight, Maruti, and trusted regional parcel carriers. Bilty / LR tracking details are shared immediately on WhatsApp once the shipment leaves our depot.",
        isActive: true,
      },
      {
        tag: "GST & Invoicing",
        question: "Do you supply official GST Tax Invoices for Input Tax Credit (ITC)?",
        answer:
          "Yes, 100%. SAMARTH ELECTRONICS HUB is an officially registered partnership startup holding active GST registration (GSTIN: 24AGBFS1171R1ZM) and MSME Udyam registration (UDYAM-GJ-07-0040753). Every commercial supply is accompanied by an authentic tax invoice with accurate HSN codes (9405 / 8504) for full ITC claims.",
        isActive: true,
      },
      {
        tag: "Custom Technical Specs",
        question: "Can we request custom wattages, color temperatures (CCT), or specialized SMPS ratings?",
        answer:
          "Yes. In addition to standard 6500K (Cool Day Light), we supply 3000K (Warm White), 4000K (Neutral White), and 3-in-1 multi-colour toggle panel lights. For SMPS power supplies, we offer ratings from 2A up to 33A in perforated metal, waterproof IP67, sleek pencil, and eco rainproof variants suitable for LED strips, signage, and automation.",
        isActive: true,
      },
      {
        tag: "Trade Price Lists",
        question: "Why are prices not listed publicly and how do I receive the wholesale rate list?",
        answer:
          "As a B2B supplier, our quotations depend on order volumes, delivery location, and custom technical specifications. To protect our retail partners and project contractors, trade discounts are shared directly via WhatsApp or official quotation. Simply click 'Inquire on WhatsApp' or build your list using our 'Add to Inquiry' tool for instant partner rates.",
        isActive: true,
      },
    ],
    seo: {
      siteTitle: "Samarth Electronics Hub | Commercial LED Lighting & SMPS Drivers",
      siteDescription:
        "Wholesale manufacturer & B2B distributor of architectural LED panels, downlights, COBs, highbay floodlights, street lights, and regulated solid-state SMPS drivers in Limdi, Dahod, Gujarat.",
      keywords:
        "Samarth Electronics Hub, LED Lighting Dahod, Wholesale LED Panels Gujarat, SMPS Drivers India, COB Spotlights, Floodlights Dahod, Bhammar Gopalbhai",
    },
  },
  home: {
    hero: {
      badgeText: "Limdi, Dahod, Gujarat • Commercial & Architectural LED Solutions",
      title: "Lighting Up Every Space with",
      titleHighlight: "Smart Electrical",
      subtitle:
        "Explore high-performance LED panel lights, COBs, downlights, heavy-duty floodlights, streetlights, and dependable SMPS power drivers engineered for residential, commercial, and industrial demands.",
      stats: [
        { label: "Product Lines", value: "30+" },
        { label: "Wattage Options", value: "3W – 600W" },
        { label: "Power Ratings", value: "2A – 33A" },
        { label: "Driver Warranty", value: "Up to 27 Mo" },
      ],
    },
    overview: {
      tagline: "About Samarth Electronics Hub",
      title: "Engineered for Efficiency, Built for Endurance",
      description1:
        "Based in Limdi, Dahod District, Gujarat, Samarth Electronics Hub was founded by partners Bhammar Gopalbhai Rambhai and Solanki Lokesh Kumar Rameshbhai to deliver robust commercial illumination products and power drivers to contractors, builders, and retailers.",
      description2:
        "Holding active GST registration (24AGBFS1171R1ZM), MSME Udyam Micro Enterprise certification (UDYAM-GJ-07-0040753), and a registered trademark application under Class 9 (No. 7993579), we offer genuine commercial billing with full input tax credit eligibility.",
      highlightTitle: "Commercial & Project Scale",
      highlightSubtitle: "Reliable B2B LED Solutions • Dahod, Gujarat",
    },
    whyChooseUs: {
      tagline: "Why Choose Us",
      title: "Built for Performance & Value",
      items: [
        { title: "Tested Reliability", desc: "Select product families supported by up to 27 months driver and replacement guarantee." },
        { title: "Broad Catalogue", desc: "Covers architectural slim panels, downlights, COBs, high-power floodlights, and street lights." },
        { title: "Regulated Drivers", desc: "Heavy-duty metal, waterproof IP67, sleek pencil, and eco SMPS drivers built for continuous use." },
        { title: "Transparent Billing", desc: "Fully registered enterprise supplying official commercial tax invoices on all trade orders." },
        { title: "Fast Trade Inquiries", desc: "Direct response on WhatsApp for quick bill of materials estimation and volume discounts." },
        { title: "Wholesale Delivery", desc: "Competitive trade pricing for electrical retailers, contractors, and project builders." },
      ],
    },
    cta: {
      title: "Looking for Bulk or Trade Inquiries?",
      subtitle:
        "Get in touch with Samarth Electronics Hub today. Contact Gopalbhai Bhammar for instant trade quotations and technical specifications.",
      phoneButtonText: "Request a Quote",
      whatsappButtonText: "WhatsApp: +91 96242 34603",
    },
  },
  about: {
    header: {
      tagline: "About Samarth Electronics Hub",
      title: "Engineered LED Fixtures & Heavy-Duty Drivers",
      subtitle:
        "Based in Limdi, Dahod District, Gujarat, Samarth Electronics Hub supplies high-grade LED fixtures, floodlights, street lights, and SMPS power supplies for commercial and residential applications.",
    },
    story: {
      tagline: "Our Journey & Foundation",
      title: "Committed to Energy Efficiency & Genuine Build Quality",
      p1: "SAMARTH ELECTRONICS HUB was formally established on 31 August 2026 in Limdi, Dahod District, Gujarat, by visionary partners Bhammar Gopalbhai Rambhai and Solanki Lokesh Kumar Rameshbhai.",
      p2: "Registered as a Micro Enterprise under MSME Udyam (UDYAM-GJ-07-0040753) and verified under regular GST registration (24AGBFS1171R1ZM), the enterprise bridges the gap between premium build quality and wholesale affordability.",
      p3: "Every fixture undergoes rigorous driver voltage testing, surge evaluation (up to 4kV - 6kV), and thermal dissipation inspection before leaving our Dahod depot for client delivery.",
    },
    partners: [
      {
        name: "Bhammar Gopalbhai Rambhai",
        role: "Managing Partner",
        phone: "+91 96242 34603",
        email: "bhammargopal3@gmail.com",
        focus: "Technical oversight, product catalogue selection, OEM supplier relations, and key trade accounts.",
        bio: "Driving the operational and product vision for Samarth Electronics Hub. Gopalbhai oversees quality assurance, driver compatibility testing, and wholesale dispatch operations.",
      },
      {
        name: "Solanki Lokesh Kumar Rameshbhai",
        role: "Partner",
        phone: "+91 93130 62650",
        email: "smarthelectronicshub9@gmail.com",
        focus: "Client partnerships, regional trade distribution, customer inquiries, and commercial logistics.",
        bio: "Focusing on market expansion, trade relationships with electrical retailers and contractors across Gujarat, and streamlined order fulfillment.",
      },
    ],
    milestones: [
      {
        date: "31 August 2026",
        title: "Commencement of Business",
        detail: "Official inception and operational commencement of SAMARTH ELECTRONICS HUB in Limdi, Dahod District, Gujarat.",
      },
      {
        date: "11 September 2026",
        title: "MSME Udyam Micro Enterprise Registration",
        detail: "Formally registered under Udyam (UDYAM-GJ-07-0040753) under Major Activity 'Manufacturing' and NIC 47594 for retail electrical & lighting goods.",
      },
      {
        date: "12 September 2026",
        title: "Trademark Application Class 9",
        detail: "Computer Generated TM application (App No. 7993579) filed for brand protection of 'SAMARTH ELECTRONICS HUB' across Class 9 apparatus.",
      },
      {
        date: "07 October 2026",
        title: "Regular GST Registration Approved",
        detail: "Form GST REG-06 issued by Government of India approving regular partnership registration under GSTIN 24AGBFS1171R1ZM.",
      },
      {
        date: "Present",
        title: "Catalogue & Wholesale Supply",
        detail: "Active distribution of 32+ product families spanning LED panels, downlights, COBs, streetlights, floodlights, and SMPS power supplies.",
      },
    ],
  },
  contact: {
    header: {
      tagline: "Get in Touch",
      title: "Connect with Samarth Electronics Hub",
      subtitle:
        "Reach out directly to Gopalbhai Bhammar or Lokeshkumar Solanki for product quotations, wholesale trade orders, or lighting inquiries.",
    },
    whatsappCard: {
      title: "Prefer Instant WhatsApp?",
      desc: "Chat directly with our team for quickest rates, stock inquiries, and catalogue photos.",
      buttonText: "Chat on WhatsApp",
    },
    depot: {
      tagline: "Physical Depot Location",
      title: "Visit Our Limdi Hub",
      desc: "Our operational depot and registered place of business is located in Limdi, Dahod district, conveniently accessible from the Karamba-Jhalod road.",
      fullAddress: "Ambli Faliyu, Karamba Road, Jhalod, Limdi / Limadi, Dahod, Gujarat — 389180",
      landmark: "Karamba Road Junction • Direct transport dispatch to MP & Rajasthan border corridors",
      timings: "Monday – Saturday: 10:00 AM – 7:00 PM (IST)",
    },
  },
};
