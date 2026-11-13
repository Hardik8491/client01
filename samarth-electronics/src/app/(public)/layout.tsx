import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { InquiryCartProvider } from "@/context/InquiryCartContext";
import InquiryDrawer from "@/components/cart/InquiryDrawer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import FloatingInquiryBadge from "@/components/cart/FloatingInquiryBadge";
import { getPageSection } from "@/actions/page-actions";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const announcement = await getPageSection("global", "announcement");

  return (
    <InquiryCartProvider>
      <Navbar announcement={announcement} />
      <main className="flex-1">{children}</main>
      <Footer />
      <InquiryDrawer />
      <FloatingInquiryBadge />
      <FloatingWhatsApp />
    </InquiryCartProvider>
  );
}
