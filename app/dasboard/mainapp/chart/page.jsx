import Chart from "@/components/Charts/page";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata= {
  title: "Next.js Chart | Nexus - Next.js Dashboard Template",
  description:
    "This is Next.js Chart page for Nexus - Next.js Tailwind CSS Admin Dashboard Template",
};

const BasicChartPage = () => {
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
