import { motion } from 'framer-motion';
import React from 'react';

declare module 'framer-motion' {
  interface MotionProps {
    className?: string;
    onClick?: () => void;
    type?: string;
    role?: string;
    'aria-label'?: string;
    disabled?: boolean;
  }
} 