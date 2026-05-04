"use client";

import { motion } from "framer-motion";

interface StatDonutChartProps {
    value: number;
    maxValue: number;
    label: string;
    subLabel?: string;
    color?: string;
    size?: number;
}

export default function StatDonutChart({ 
    value, 
    maxValue, 
    label, 
    subLabel,
    color = "#8B5CF6", // Default neon-purple
    size = 100 
}: StatDonutChartProps) {
    const radius = size * 0.4;
    const strokeWidth = size * 0.1;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background Circle */}
                <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        className="transition-all duration-1000"
                    />
                    
                    {/* Progress Circle with Gradient/Glow */}
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                        fill="transparent"
                        style={{
                            filter: `drop-shadow(0 0 8px ${color}44)`
                        }}
                    />
                </svg>

                {/* Inner Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-white font-black text-sm tracking-tighter">
                        {value > 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(1)}
                    </span>
                    {subLabel && (
                        <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest leading-none">
                            {subLabel}
                        </span>
                    )}
                </div>
            </div>
            
            <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 block">
                    {label}
                </span>
            </div>
        </div>
    );
}
