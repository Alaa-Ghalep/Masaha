import { useState } from "react";
import { RiHome5Line, RiUserReceived2Line } from "react-icons/ri";
import PageHeader from "../../components/common/PageHeader"; 
import OccupancyCard from "../../components/receptionist/OccupancyCard";
import AttendeesList from "../../components/receptionist/AttendeesList";

import {  INITIAL_ATTENDEES } from "../../constants/receptionistData";

export default function Home() {
  const [attendees, setAttendees] = useState(INITIAL_ATTENDEES);
  const occupied = attendees.length;

  const handleCheckOut = (id) =>
    setAttendees((prev) => prev.filter((a) => a.id !== id));

  const handleCheckIn = ({ name, hours }) =>
    setAttendees((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        hours,
        seat: "—", 
        checkInTime: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

  return (
       <div className="space-y-10 font-['Cairo']">

      <PageHeader
        title="الرئيسية"
        icon={<RiHome5Line />}
        role="receptionist"
        roleIcon={<RiUserReceived2Line size={20} />}
      />

   
    </div>
  );
}