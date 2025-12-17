import React from 'react'
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"

function ResponsiveMenu({open}) {
  return (
    <AnimatePresence mode="wait">
        {
        open && (
            <motion.div
                initial = {{ opacity: 0}}
                animate = {{ opacity: 1}}
                exit = {{ opacity: 0}}
                className = "absolute top-20 left-0 w-full h-screen z-20"
            >
                <div className="text-xl font-semibold uppercase bg-red-700 text-white py-10 m-6 rounded-3xl">
                    <ul className='flex flex-col justify-center items-center gap-10'>
                        <li>Home</li>
                        <li>Projects</li>
                        <li>Contact</li>
                    </ul>
                </div>
                </motion.div>
        )}
    </AnimatePresence>
)
}

export default ResponsiveMenu;