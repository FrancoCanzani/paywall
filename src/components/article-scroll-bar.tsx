'use client';

import { motion, useScroll } from 'framer-motion';

export default function ArticleScrollBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div className='progress-bar' style={{ scaleX: scrollYProgress }} />
  );
}
