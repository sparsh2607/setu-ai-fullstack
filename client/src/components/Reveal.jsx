import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Reveal({ children, className = '', custom = 0, as: Tag = 'div' }) {
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      custom={custom}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}
