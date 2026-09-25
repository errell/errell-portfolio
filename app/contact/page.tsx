import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact — Let's Work Together",
  description:
    "Get in touch with Errell Niño about UX design leadership roles, project collaboration, or speaking. Send a message or book a 30-minute call.",
};

export default function ContactPage() {
  return <ContactContent />;
}
