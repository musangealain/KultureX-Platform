import type { Metadata } from "next";

import AdminPortal from "@/features/admin/AdminPortal";

export const metadata: Metadata = {
  title: "KultureX Admin Portal",
  description: "Central administration portal for KultureX web/mobile content and commerce operations."
};

export default function AdminPage() {
  return <AdminPortal />;
}
