import { Button } from "@/components/ui/button";
import { RiArrowRightLine, RiCarFill } from "@remixicon/react";

export function HeroCallToActions() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 gap-2 group"
            >
                Começar Análise
                <RiArrowRightLine
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                />
            </Button>

            <Button
                size="lg"
                variant="outline"
                className="border-slate-800 text-slate-300 hover:bg-slate-900 gap-2"
            >
                <RiCarFill size={20} />
                Explorar Modelos
            </Button>
        </div>
    );
}
