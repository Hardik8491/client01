# Samarth Electronics — Production Deployment Guide

## Architecture Overview
- **Framework**: Next.js 16 (App Router + React 19)
- **Styling**: Tailwind CSS + Custom Design System
- **Database**: PostgreSQL (Neon / Supabase / Railway)
- **ORM**: Prisma 6
- **Hosting**: Vercel

---

## 1. Environment Variables Configuration

Copy `.env.example` to your production environment or add in Vercel Project Settings > **Environment Variables**:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@ep-xyz.neon.tech/samarth?sslmode=require` |
| `ADMIN_JWT_SECRET` | 32+ character secure random string | `samarth-electronics-secure-jwt-secret-key-32chars-min` |
| `DEFAULT_ADMIN_EMAIL` | Default Owner/Admin login email | `admin@samarthelectronics.in` |
| `DEFAULT_ADMIN_PASSWORD` | Default Admin password | `SamarthAdmin@2026` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `demo` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `optional` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `optional` |
| `NEXT_PUBLIC_COMPANY_PHONE` | Primary business phone | `+91 98765 43210` |
| `NEXT_PUBLIC_COMPANY_WHATSAPP`| WhatsApp chat number | `+919876543210` |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Business inquiry email | `contact@samarthelectronics.in` |

---

## 2. Deploying to Vercel (One-Click)

1. Push this project to GitHub.
2. In Vercel, click **Add New Project** and select this repository.
3. In **Build and Output Settings**:
   - Framework Preset: **Next.js**
   - Root Directory: `samarth-electronics` (if deploying from monorepo) or `./`
   - Build Command: `npm run build`
4. Add the **Environment Variables** listed above.
5. Click **Deploy**.

---

## 3. Database Initialization & Seeding

Once your PostgreSQL database (Neon or Supabase) is provisioned:

1. **Push the schema to PostgreSQL**:
   ```bash
   npx prisma db push
   ```

2. **Seed initial products, categories, services, and default admin**:
   ```bash
   npx prisma db seed
   ```

---

## 4. Default Admin Credentials

- **Admin Login URL**: `/admin/login`
- **Email**: `admin@samarthelectronics.in`
- **Password**: `SamarthAdmin@2026`
*(Password can be updated anytime inside `/admin/settings`)*
