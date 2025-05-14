import Calendar from "../../components/Calender/page";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title: "Next.js Calender | Nexus - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for Nexus  Tailwind CSS Admin Dashboard Template",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <Calendar />
    </DefaultLayout>
  );
};

export default CalendarPage;
