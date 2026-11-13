import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { InquiryCartProvider } from "@/context/InquiryCartContext";
import InquiryDrawer from "@/components/cart/InquiryDrawer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import FloatingInquiryBadge from "@/components/cart/FloatingInquiryBadge";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <InquiryCartProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <InquiryDrawer />
      <FloatingInquiryBadge />
      <FloatingWhatsApp />
    </InquiryCartProvider>
  );
}
