import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageTitle label="[ Contact ]">Contact.</PageTitle>
      <Contact />
    </>
  );
}
