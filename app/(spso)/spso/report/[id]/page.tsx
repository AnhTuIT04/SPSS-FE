'use client';
import { useParams } from "next/navigation"


const fetchReport = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/v1/report/${id}`)

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return response.json();
}

const ReportIdPage = async () => {
  const { id } = useParams()


  const report = await fetchReport(Array.isArray(id) ? id[0] : id)

  return (
    <div className="w-full h-[calc(100vh-10rem)]">
      <iframe className="w-full h-full" src={report.link} />
    </div>
  )
}

export default ReportIdPage