import * as React from "react"

import * as motion from "motion/react-client"

import { BASE_TRANSITION } from "@/utils/animation"
import { getMetadata } from "@/utils/metadata"

import Calendar from "@/components/Calendar"

export const metadata = getMetadata({
  path: "/",
  title: "Next.js App",
  description: "Carbon Test",
})

const Home: React.FC = () => {
  return <Calendar />
}

export default Home
