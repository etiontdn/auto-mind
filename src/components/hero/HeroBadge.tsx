import { Badge } from "@/components/ui/badge";
import { RiSparkling2Line } from "@remixicon/react";

export function HeroBadge() {
    return (
        <div className="flex justify-center mb-8">
            <Badge
                variant="outline"
                className="px-4 py-1.5 border-blue-500/30 bg-blue-500/5 text-blue-400 gap-2 select-none"
            >
                <RiSparkling2Line
                    size={16}
                    className="animate-pulse text-blue-400"
                />
                <span className="tracking-wide">
                    Inteligência Automotiva • Dados 2026
                </span>
            </Badge>
        </div>
    );
}
