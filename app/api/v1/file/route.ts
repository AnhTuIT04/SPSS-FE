import { NextResponse } from "next/server"
import connectDB from "@/db/db"

const GET = async () => {
    await connectDB()

    return NextResponse.json({ file:  "123"})
}



export default {
    GET,

}