import {
    RiDatabase2Line,
    RiShieldCheckLine,
    RiBrainLine,
    RiWallet3Line,
} from "@remixicon/react";

export function HeroFeatures() {
    const features = [
        {
            icon: RiDatabase2Line,
            label: "Big Data",
            sub: "Fipe 2026",
            color: "text-blue-500",
        },
        {
            icon: RiShieldCheckLine,
            label: "Segurança",
            sub: "Risco Zero",
            color: "text-emerald-500",
        },
        {
            icon: RiBrainLine,
            label: "IA Nativa",
            sub: "LLM Advisor",
            color: "text-purple-500",
        },
        {
            icon: RiWallet3Line,
            label: "Economia",
            sub: "Custo Real",
            color: "text-amber-500",
        },
    ];

    return (
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-slate-900 pt-12">
            {features.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                    <item.icon
                        size={28}
                        className={`${item.color} opacity-80`}
                    />
                    <div className="text-center">
                        <p className="text-white font-semibold text-sm">
                            {item.label}
                        </p>
                        <p className="text-slate-500 text-[10px] uppercase tracking-tighter">
                            {item.sub}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
