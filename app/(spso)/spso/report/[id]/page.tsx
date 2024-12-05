'use client';
import { Report } from "@/components/ReportTable/columns";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";


const fetchReport = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/v1/report/${id}`)

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return response.json();
}

const ReportIdPage = async () => {
  const { id } = useParams()
  const [data, setData] = useState<Report>();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchReport(Array.isArray(id) ? id[0] : id);
      setData(fetchedData); // No need to spread, just set fetched data
    };
    fetchData();
  }, []);


  return (
    <div className="w-full h-[calc(100vh-10rem)]">
      <iframe className="w-full h-full" src={data?.link} />
    </div>
  )
}

export default ReportIdPage