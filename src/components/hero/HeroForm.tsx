import { Button } from "@/components/ui/button";
import {
    RiArrowRightLine,
    RiMoneyDollarCircleLine,
    RiWalletLine,
} from "@remixicon/react";

export function HeroForm() {
    return (
        <div className="mx-auto mt-10 w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="relative group">
                {/* Efeito de brilho atrás do formulário */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

                <form className="relative flex flex-col sm:flex-row items-center gap-3 p-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg">
                    <div className="flex-1 w-full flex items-center px-3 py-2 bg-slate-950/50 border border-white/5 rounded-md focus-within:border-blue-500/50 transition-colors">
                        <RiMoneyDollarCircleLine
                            size={18}
                            className="text-slate-500 mr-2"
                        />
                        <input
                            type="number"
                            placeholder="Salário Mensal"
                            className="bg-transparent border-none text-white text-sm outline-none w-full placeholder:text-slate-600"
                        />
                    </div>

                    <div className="flex-1 w-full flex items-center px-3 py-2 bg-slate-950/50 border border-white/5 rounded-md focus-within:border-blue-500/50 transition-colors">
                        <RiWalletLine
                            size={18}
                            className="text-slate-500 mr-2"
                        />
                        <input
                            type="number"
                            placeholder="Valor de Entrada"
                            className="bg-transparent border-none text-white text-sm outline-none w-full placeholder:text-slate-600"
                        />
                    </div>

                    <Button
                        size="lg"
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold gap-2"
                    >
                        Analisar
                        <RiArrowRightLine size={18} />
                    </Button>
                </form>
            </div>
            <p className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                Consultoria IA instantânea baseada em economia comportamental
            </p>
        </div>
    );
}
