import * as React from "react"

import { getMetadata } from "@/utils/metadata"

import Calendar from "@/components/Calendar"

export const metadata = getMetadata({
  path: "/",
  title: "Carbon Calendar",
  description: "Carbon Calendar",
})

const Home: React.FC = () => {
  return <Calendar />
}

export default Home
