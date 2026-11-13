const fs = require('fs');
const path = require('path');

// Ensure public/catalogue directory exists
const catalogueDir = path.join(__dirname, '..', 'public', 'catalogue');
if (!fs.existsSync(catalogueDir)) {
  fs.mkdirSync(catalogueDir, { recursive: true });
}

class SimplePDFBuilder {
  constructor() {
    this.objects = [];
    this.pages = [];
  }

  addObject(content) {
    const id = this.objects.length + 1;
    this.objects.push({ id, content });
    return id;
  }

  createPage(width = 595.28, height = 841.89) { // A4
    const page = {
      width,
      height,
      commands: []
    };
    this.pages.push(page);
    return page;
  }

  build() {
    // 1. Catalog object (id: 1)
    // 2. Pages object (id: 2)
    // 3. Font regular (id: 3)
    // 4. Font bold (id: 4)
    // Page objects & Content streams follow...
    
    const fontRegId = 3;
    const fontBoldId = 4;
    
    const pageObjIds = [];
    const contentObjIds = [];

    let currentObjId = 5;

    for (const p of this.pages) {
      const pageId = currentObjId++;
      const contentId = currentObjId++;
      pageObjIds.push(pageId);
      contentObjIds.push(contentId);
    }

    // Build objects
    // Obj 1: Catalog
    const catalogObj = `<< /Type /Catalog /Pages 2 0 R >>`;
    // Obj 2: Pages
    const pagesObj = `<< /Type /Pages /Kids [ ${pageObjIds.map(id => `${id} 0 R`).join(' ')} ] /Count ${this.pages.length} >>`;
    // Obj 3: Font Helvetica
    const fontRegObj = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;
    // Obj 4: Font Helvetica-Bold
    const fontBoldObj = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;

    const allObjects = [
      { id: 1, content: catalogObj },
      { id: 2, content: pagesObj },
      { id: 3, content: fontRegObj },
      { id: 4, content: fontBoldObj },
    ];

    for (let i = 0; i < this.pages.length; i++) {
      const p = this.pages[i];
      const pageId = pageObjIds[i];
      const contentId = contentObjIds[i];

      const streamContent = p.commands.join('\n');
      const streamLen = Buffer.byteLength(streamContent, 'utf-8');

      const pageContentObj = `<< /Length ${streamLen} >>\nstream\n${streamContent}\nendstream`;
      const pageNodeObj = `<< /Type /Page /Parent 2 0 R /MediaBox [ 0 0 ${p.width} ${p.height} ] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;

      allObjects.push({ id: pageId, content: pageNodeObj });
      allObjects.push({ id: contentId, content: pageContentObj });
    }

    // Generate PDF file buffer
    let output = '%PDF-1.4\n%âãÏÓ\n';
    const offsets = [];

    for (const obj of allObjects) {
      offsets.push(output.length);
      output += `${obj.id} 0 obj\n${obj.content}\nendobj\n`;
    }

    const startXref = output.length;
    output += `xref\n0 ${allObjects.length + 1}\n0000000000 65535 f \n`;
    for (const off of offsets) {
      output += `${String(off).padStart(10, '0')} 00000 n \n`;
    }

    output += `trailer\n<< /Size ${allObjects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
    return Buffer.from(output, 'utf-8');
  }
}

// Helper to escape text in PDF string
function esc(str) {
  if (!str) return '';
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function addText(page, text, x, y, size = 10, bold = false, r = 0, g = 0, b = 0) {
  const font = bold ? '/F2' : '/F1';
  page.commands.push(`BT`);
  page.commands.push(`${r} ${g} ${b} rg`);
  page.commands.push(`${font} ${size} Tf`);
  page.commands.push(`1 0 0 1 ${x} ${y} Tm`);
  page.commands.push(`(${esc(text)}) Tj`);
  page.commands.push(`ET`);
}

function addRect(page, x, y, w, h, r, g, b, stroke = false, sr = 0, sg = 0, sb = 0) {
  page.commands.push(`${r} ${g} ${b} rg`);
  if (stroke) {
    page.commands.push(`${sr} ${sg} ${sb} RG`);
    page.commands.push(`1 w`);
    page.commands.push(`${x} ${y} ${w} ${h} re B`);
  } else {
    page.commands.push(`${x} ${y} ${w} ${h} re f`);
  }
}

function addLine(page, x1, y1, x2, y2, r = 0.8, g = 0.8, b = 0.8, width = 1) {
  page.commands.push(`${r} ${g} ${b} RG`);
  page.commands.push(`${width} w`);
  page.commands.push(`${x1} ${y1} m`);
  page.commands.push(`${x2} ${y2} l S`);
}

const pdf = new SimplePDFBuilder();

// ── PAGE 1: COVER & COMPANY PROFILE ───────────────────────────────────────────
{
  const p = pdf.createPage();
  // Header bar (Deep Blue)
  addRect(p, 0, 720, 595.28, 121.89, 0.08, 0.15, 0.35); // Blue-950
  addRect(p, 0, 715, 595.28, 5, 0.95, 0.45, 0.1); // Orange accent

  // Brand Titles
  addText(p, 'SAMARTH ELECTRONICS HUB', 40, 785, 24, true, 1, 1, 1);
  addText(p, 'TRADE PRODUCT CATALOGUE & SPECIFICATION GUIDE', 40, 762, 12, true, 0.95, 0.65, 0.3);
  addText(p, 'Commercial & Residential LED Lighting Fixtures | Regulated SMPS Drivers', 40, 742, 10, false, 0.85, 0.9, 1);

  // Enterprise Credentials Box
  addRect(p, 40, 570, 515.28, 125, 0.96, 0.97, 0.99, true, 0.82, 0.87, 0.95);
  addText(p, 'ENTERPRISE IDENTIFICATION & COMPLIANCE DETAILS', 55, 672, 11, true, 0.08, 0.15, 0.35);
  addLine(p, 55, 664, 535, 664, 0.85, 0.88, 0.95);

  addText(p, 'Entity Name:', 55, 646, 9.5, true, 0.2, 0.2, 0.2);
  addText(p, 'SAMARTH ELECTRONICS HUB (Partnership Startup)', 150, 646, 9.5, false, 0.1, 0.1, 0.1);

  addText(p, 'Trademark No:', 55, 630, 9.5, true, 0.2, 0.2, 0.2);
  addText(p, '7993579 (Class 9 - Commercial Electronics & LED Fixtures)', 150, 630, 9.5, false, 0.1, 0.1, 0.1);

  addText(p, 'GSTIN (Active):', 55, 614, 9.5, true, 0.2, 0.2, 0.2);
  addText(p, '24AGBFS1171R1ZM (Eligible for Full 100% Input Tax Credit / ITC)', 150, 614, 9.5, false, 0.1, 0.1, 0.1);

  addText(p, 'MSME Udyam:', 55, 598, 9.5, true, 0.2, 0.2, 0.2);
  addText(p, 'UDYAM-GJ-07-0040753 (Micro Manufacturing Enterprise)', 150, 598, 9.5, false, 0.1, 0.1, 0.1);

  addText(p, 'Principal Depot:', 55, 582, 9.5, true, 0.2, 0.2, 0.2);
  addText(p, 'Ambli Faliyu, Karamba Road, Jhalod, Limdi / Limadi, Dahod, Gujarat - 389180', 150, 582, 9.5, false, 0.1, 0.1, 0.1);

  // Key Commercial Highlights
  addText(p, 'WHY CONTRACTORS & RETAILERS CHOOSE SAMARTH', 40, 535, 12, true, 0.08, 0.15, 0.35);
  addLine(p, 40, 527, 555, 527, 0.9, 0.5, 0.1, 1.5);

  const pillars = [
    { title: '1. Up to 27 Months Driver & Unit Warranty', desc: 'Robust industrial-grade surge suppression (4kV - 6kV) ensuring minimum failure rate.' },
    { title: '2. High Lumen Efficiency (>100 Lm/W)', desc: 'LM80 certified LED chips for lasting lumen maintenance without yellowing or dimming.' },
    { title: '3. Full Compliance Commercial Invoicing', desc: 'Direct computerized GST invoices with correct HSN 9405 / 8504 codes on all dispatches.' },
    { title: '4. Pan-India Road Transport Connectivity', desc: 'Daily dispatches through V-Trans, TCI, and Maruti Courier from the Gujarat border hub.' },
    { title: '5. Ready Stock & Custom CCT Production', desc: 'Cool White (6500K), Warm White (3000K), Neutral (4000K), and 3-in-1 multi-switchable.' }
  ];

  let yPos = 498;
  for (const item of pillars) {
    addRect(p, 40, yPos - 6, 8, 22, 0.95, 0.45, 0.1);
    addText(p, item.title, 55, yPos + 6, 10, true, 0.1, 0.1, 0.1);
    addText(p, item.desc, 55, yPos - 5, 8.5, false, 0.4, 0.4, 0.4);
    yPos -= 36;
  }

  // Managing Partners Box
  addRect(p, 40, 160, 515.28, 120, 0.93, 0.97, 0.94, true, 0.65, 0.85, 0.7);
  addText(p, 'DIRECT MANAGEMENT CONTACTS FOR WHOLESALE RATES', 55, 260, 11, true, 0.05, 0.4, 0.2);
  addLine(p, 55, 252, 535, 252, 0.7, 0.88, 0.75);

  addText(p, 'Partner 1: Bhammar Gopalbhai Rambhai', 55, 234, 10, true, 0.1, 0.1, 0.1);
  addText(p, 'Phone / WhatsApp: +91 96242 34603  |  Email: smarthelectronicshub9@gmail.com', 55, 220, 9, false, 0.3, 0.3, 0.3);

  addText(p, 'Partner 2: Solanki Lokesh Kumar Rameshbhai', 55, 198, 10, true, 0.1, 0.1, 0.1);
  addText(p, 'Phone: +91 93130 62650  |  Email: bhammargopal3@gmail.com', 55, 184, 9, false, 0.3, 0.3, 0.3);

  // Footer bar
  addRect(p, 0, 0, 595.28, 35, 0.08, 0.15, 0.35);
  addText(p, 'Samarth Electronics Hub - Confidential Trade Catalogue - Dahod, Gujarat', 40, 13, 8.5, false, 0.8, 0.85, 0.9);
  addText(p, 'Page 1 of 3', 520, 13, 8.5, false, 0.8, 0.85, 0.9);
}

// ── PAGE 2: LED LIGHTING FIXTURES LINEUP ──────────────────────────────────────
{
  const p = pdf.createPage();
  // Header
  addRect(p, 0, 780, 595.28, 61.89, 0.08, 0.15, 0.35);
  addText(p, 'SAMARTH ELECTRONICS HUB - PRODUCT SPECIFICATIONS', 40, 808, 14, true, 1, 1, 1);
  addText(p, 'Category: Commercial & Residential LED Lighting Range', 40, 792, 9.5, false, 0.95, 0.7, 0.4);

  // Section 1: Panels & Downlights
  addText(p, '1. LED PANEL LIGHTS & ARCHITECTURAL DOWNLIGHTS', 40, 750, 11, true, 0.08, 0.15, 0.35);
  addLine(p, 40, 742, 555, 742, 0.85, 0.85, 0.85);

  const panelTable = [
    { name: 'Slim LED Panel Light (Round / Square)', watts: '3W, 6W, 9W, 12W, 15W, 18W', lumen: '100 Lm/W', cut: 'Die-cast Aluminium / PC Diffuser', war: '24 Mo' },
    { name: 'Aqua Waterproof LED Panel (IP44/65)', watts: '6W, 12W, 18W', lumen: '95 Lm/W', cut: 'Sealed Gasket, Damp Locations', war: '24 Mo' },
    { name: 'Pixel Decorative Panel Light', watts: '3W, 6W, 12W', lumen: '90 Lm/W', cut: 'Edge-glow architectural rim', war: '18 Mo' },
    { name: 'PC Polycarbonate Body Panel', watts: '8W, 15W, 20W', lumen: '105 Lm/W', cut: 'Flame-retardant lightweight housing', war: '18 Mo' },
    { name: 'Side-Blue Dual Colour Accent Panel', watts: '6W+3W, 12W+4W', lumen: '95 Lm/W', cut: 'Dual mode central white + blue rim', war: '18 Mo' },
    { name: '2x2 Commercial Modular False Ceiling Panel', watts: '36W, 40W, 48W', lumen: '110 Lm/W', cut: '595x595mm Backlit / Edge-lit Frame', war: '27 Mo' },
    { name: 'Adjustable Surface / Concealed Panel', watts: '6W, 12W, 18W', lumen: '100 Lm/W', cut: 'Universal sliding mounting bracket', war: '24 Mo' }
  ];

  let y = 724;
  addRect(p, 40, y - 4, 515.28, 18, 0.9, 0.93, 0.98);
  addText(p, 'Product Model / Series', 45, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Wattage Options', 215, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Key Technical Features', 340, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Guarantee', 495, y, 8.5, true, 0.1, 0.2, 0.4);
  y -= 18;

  for (const row of panelTable) {
    addLine(p, 40, y + 14, 555, y + 14, 0.92, 0.92, 0.92);
    addText(p, row.name, 45, y, 8, true, 0.15, 0.15, 0.15);
    addText(p, row.watts, 215, y, 7.5, false, 0.25, 0.25, 0.25);
    addText(p, row.cut, 340, y, 7.5, false, 0.35, 0.35, 0.35);
    addText(p, row.war, 495, y, 8, true, 0.05, 0.45, 0.15);
    y -= 19;
  }

  // Section 2: Spotlights & COB
  y -= 10;
  addText(p, '2. COB SPOTLIGHTS & DEEP ARCHITECTURAL FOCAL LIGHTING', 40, y, 11, true, 0.08, 0.15, 0.35);
  addLine(p, 40, y - 8, 555, y - 8, 0.85, 0.85, 0.85);
  y -= 26;

  const cobTable = [
    { name: 'Grace Swivel COB Spotlight', watts: '3W, 7W, 12W, 16W, 20W', beam: '24° / 36° Reflector Lens, 360° Tilt', war: '24 Mo' },
    { name: 'Deep Downlight Anti-Glare COB', watts: '6W, 10W, 15W, 24W', beam: 'Low UGR < 19, Deep Baffle Housing', war: '27 Mo' },
    { name: 'Square Multi-Head Architectural COB', watts: '1-Head (10W), 2-Head (20W)', beam: 'Architectural showroom / gallery track style', war: '24 Mo' },
    { name: 'Mini Cabinet / Niche Focus Light', watts: '1W, 2W, 3W Button COB', beam: 'Compact cutout for wardrobes and mandirs', war: '18 Mo' }
  ];

  addRect(p, 40, y - 4, 515.28, 18, 0.9, 0.93, 0.98);
  addText(p, 'COB Fixture Model', 45, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Available Wattages', 215, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Optical & Mechanical Specs', 340, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Guarantee', 495, y, 8.5, true, 0.1, 0.2, 0.4);
  y -= 18;

  for (const row of cobTable) {
    addLine(p, 40, y + 14, 555, y + 14, 0.92, 0.92, 0.92);
    addText(p, row.name, 45, y, 8, true, 0.15, 0.15, 0.15);
    addText(p, row.watts, 215, y, 7.5, false, 0.25, 0.25, 0.25);
    addText(p, row.beam, 340, y, 7.5, false, 0.35, 0.35, 0.35);
    addText(p, row.war, 495, y, 8, true, 0.05, 0.45, 0.15);
    y -= 19;
  }

  // Section 3: Bulbs & Battens
  y -= 10;
  addText(p, '3. RESIDENTIAL BULBS, INVERTER AC/DC & TUBELIGHTS', 40, y, 11, true, 0.08, 0.15, 0.35);
  addLine(p, 40, y - 8, 555, y - 8, 0.85, 0.85, 0.85);
  y -= 26;

  const bulbTable = [
    { name: 'Standard High-Lumen LED Bulbs (B22/E27)', watts: '9W, 12W, 15W, 18W, 20W, 30W, 40W, 50W', feat: 'Surge Protected 3.5kV, HPF >0.90 Driver', war: '12-24 Mo' },
    { name: 'Emergency Rechargeable AC/DC Inverter Bulb', watts: '9W, 12W, 15W', feat: 'Lithium-ion Backup up to 4 Hours on Power Cut', war: '12 Mo' },
    { name: 'Slim Profile Linear Batten Tubelights', watts: '10W, 20W, 36W, 40W, 52W (1ft - 4ft)', feat: 'High transmission PC diffuser, flicker-free', war: '18 Mo' }
  ];

  addRect(p, 40, y - 4, 515.28, 18, 0.9, 0.93, 0.98);
  addText(p, 'Fixture / Bulb Type', 45, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Wattage Range', 215, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Driver & Safety Highlights', 340, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Guarantee', 495, y, 8.5, true, 0.1, 0.2, 0.4);
  y -= 18;

  for (const row of bulbTable) {
    addLine(p, 40, y + 14, 555, y + 14, 0.92, 0.92, 0.92);
    addText(p, row.name, 45, y, 8, true, 0.15, 0.15, 0.15);
    addText(p, row.watts, 215, y, 7.5, false, 0.25, 0.25, 0.25);
    addText(p, row.feat, 340, y, 7.5, false, 0.35, 0.35, 0.35);
    addText(p, row.war, 495, y, 8, true, 0.05, 0.45, 0.15);
    y -= 19;
  }

  // Footer
  addRect(p, 0, 0, 595.28, 35, 0.08, 0.15, 0.35);
  addText(p, 'Samarth Electronics Hub - Confidential Trade Catalogue - Dahod, Gujarat', 40, 13, 8.5, false, 0.8, 0.85, 0.9);
  addText(p, 'Page 2 of 3', 520, 13, 8.5, false, 0.8, 0.85, 0.9);
}

// ── PAGE 3: INDUSTRIAL OUTDOOR & SMPS DRIVERS ──────────────────────────────────
{
  const p = pdf.createPage();
  // Header
  addRect(p, 0, 780, 595.28, 61.89, 0.08, 0.15, 0.35);
  addText(p, 'SAMARTH ELECTRONICS HUB - PRODUCT SPECIFICATIONS', 40, 808, 14, true, 1, 1, 1);
  addText(p, 'Category: Outdoor Industrial Fixtures & Heavy-Duty SMPS Drivers', 40, 792, 9.5, false, 0.95, 0.7, 0.4);

  // Section 4: Outdoor & Industrial
  addText(p, '4. INDUSTRIAL FLOODLIGHTS, HIGHBAYS & STREET LIGHTS', 40, 750, 11, true, 0.08, 0.15, 0.35);
  addLine(p, 40, 742, 555, 742, 0.85, 0.85, 0.85);

  const outdoorTable = [
    { name: 'Slim Architectural LED Floodlight (IP66)', watts: '30W, 50W, 100W, 150W, 200W', specs: 'Toughened glass, 4kV surge, die-cast fins', war: '24 Mo' },
    { name: 'High-Power Stadium / High-Mast Projector', watts: '250W, 300W, 400W, 500W, 600W', specs: 'Modular lens optics, 6kV surge, IP67 rating', war: '27 Mo' },
    { name: 'UFO Industrial Highbay Warehouse Light', watts: '50W, 100W, 150W, 200W', specs: 'Die-cast circular radiator, hanging eye-bolt', war: '24 Mo' },
    { name: 'Picasso Series LED Streetlight (Lens Optic)', watts: '24W, 36W, 50W, 72W, 100W, 150W', specs: 'Batwing type-II street distribution, pole mount', war: '24 Mo' }
  ];

  let y = 724;
  addRect(p, 40, y - 4, 515.28, 18, 0.9, 0.93, 0.98);
  addText(p, 'Industrial Outdoor Fixture', 45, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Wattage Spectrum', 215, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Protection & Enclosure Class', 340, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Guarantee', 495, y, 8.5, true, 0.1, 0.2, 0.4);
  y -= 18;

  for (const row of outdoorTable) {
    addLine(p, 40, y + 14, 555, y + 14, 0.92, 0.92, 0.92);
    addText(p, row.name, 45, y, 8, true, 0.15, 0.15, 0.15);
    addText(p, row.watts, 215, y, 7.5, false, 0.25, 0.25, 0.25);
    addText(p, row.specs, 340, y, 7.5, false, 0.35, 0.35, 0.35);
    addText(p, row.war, 495, y, 8, true, 0.05, 0.45, 0.15);
    y -= 19;
  }

  // Section 5: SMPS Drivers
  y -= 10;
  addText(p, '5. REGULATED SMPS CONSTANT-VOLTAGE 12V / 24V DRIVERS', 40, y, 11, true, 0.08, 0.15, 0.35);
  addLine(p, 40, y - 8, 555, y - 8, 0.85, 0.85, 0.85);
  y -= 26;

  const smpsTable = [
    { name: 'Perforated Metal Mesh SMPS (12V)', amp: '2A (24W), 5A (60W), 10A (120W), 20A (240W), 30A (360W), 33A (400W)', feat: 'Short circuit, overload & over-voltage trip', war: '24 Mo' },
    { name: 'Sleek Ultra-Slim Pencil SMPS', amp: '2A, 3A, 5A, 8.3A (100W), 12.5A (150W)', feat: '18mm ultra-narrow profile for cove profiles', war: '24 Mo' },
    { name: 'Waterproof Solid Resin SMPS (IP67)', amp: '5A (60W), 8.3A (100W), 12.5A (150W), 16.6A (200W)', feat: 'Epoxy encapsulated waterproof for outdoor signage', war: '27 Mo' },
    { name: 'Eco Rainproof Outdoor SMPS', amp: '10A, 20A, 30A, 33A (Vertical Louver Enclosure)', feat: 'Sun-shielded outdoor ventilation design', war: '18 Mo' }
  ];

  addRect(p, 40, y - 4, 515.28, 18, 0.9, 0.93, 0.98);
  addText(p, 'SMPS Driver Family', 45, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Ampere & Wattage Ratings', 205, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Enclosure & Protection Specs', 350, y, 8.5, true, 0.1, 0.2, 0.4);
  addText(p, 'Guarantee', 495, y, 8.5, true, 0.1, 0.2, 0.4);
  y -= 18;

  for (const row of smpsTable) {
    addLine(p, 40, y + 14, 555, y + 14, 0.92, 0.92, 0.92);
    addText(p, row.name, 45, y, 8, true, 0.15, 0.15, 0.15);
    addText(p, row.amp, 205, y, 7.2, false, 0.25, 0.25, 0.25);
    addText(p, row.feat, 350, y, 7.2, false, 0.35, 0.35, 0.35);
    addText(p, row.war, 495, y, 8, true, 0.05, 0.45, 0.15);
    y -= 19;
  }

  // Ordering Terms & Direct WhatsApp Guidance
  y -= 14;
  addRect(p, 40, y - 110, 515.28, 115, 0.96, 0.97, 0.99, true, 0.8, 0.85, 0.92);
  addText(p, 'HOW TO PLACE ORDERS & RECEIVE CURRENT WHOLESALE RATE SHEET', 55, y - 18, 10.5, true, 0.08, 0.15, 0.35);
  addLine(p, 55, y - 26, 535, y - 26, 0.85, 0.88, 0.95);

  addText(p, 'Step 1: Note your model name, wattage, quantity, and delivery destination.', 55, y - 44, 8.5, false, 0.2, 0.2, 0.2);
  addText(p, 'Step 2: Message us directly on WhatsApp at +91 96242 34603 or email smarthelectronicshub9@gmail.com.', 55, y - 60, 8.5, false, 0.2, 0.2, 0.2);
  addText(p, 'Step 3: Receive formal GST proforma quotation with volume discount tiers within 2 hours.', 55, y - 76, 8.5, false, 0.2, 0.2, 0.2);
  addText(p, 'Step 4: Consignment dispatched via V-Trans / TCI / local transport with live bilty docket receipt.', 55, y - 92, 8.5, false, 0.2, 0.2, 0.2);

  // Footer
  addRect(p, 0, 0, 595.28, 35, 0.08, 0.15, 0.35);
  addText(p, 'Samarth Electronics Hub - Confidential Trade Catalogue - Dahod, Gujarat', 40, 13, 8.5, false, 0.8, 0.85, 0.9);
  addText(p, 'Page 3 of 3', 520, 13, 8.5, false, 0.8, 0.85, 0.9);
}

const pdfBuffer = pdf.build();
const outputPath = path.join(catalogueDir, 'samarth-electronics-catalogue.pdf');
fs.writeFileSync(outputPath, pdfBuffer);
console.log('Successfully generated official PDF catalogue at:', outputPath, 'Size:', pdfBuffer.length, 'bytes');

