import React from 'react'

function CommunitySection() {
    return (
        <section className="py-24 px-6 md:px-12 text-center bg-white/[0.01]">
            <div className="max-w-4xl mx-auto">
                <span className="text-neon-purple/50 text-[10px] uppercase tracking-[0.3em] font-bold mb-8 block">Private Network</span>
                <h3 className="text-3xl font-bold mb-10 tracking-tight">Trusted by 12,000+ Wellness Visionaries.</h3>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-14 h-14 rounded-full border border-white/10 glass-card flex items-center justify-center text-white/20 font-black relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            U{i}
                        </div>
                    ))}
                    <div className="w-14 h-14 rounded-full bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-[10px] font-bold text-neon-purple">
                        +12k
                    </div>
                </div>
                <p className="text-white/30 text-sm italic italic">"Join the future of personal wellness in the AdultPlayToys Echo System across India."</p>
            </div>
        </section>
    )
}

export default CommunitySection