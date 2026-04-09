import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    RiCloseLine,
    RiSparklingLine,
    RiShieldCheckLine,
    RiBankCardLine,
    RiLoader4Line
} from "@remixicon/react";

interface HeroModalProps {
    isOpen: boolean;
    onClose: () => void;
    salary: number;
    downPayment: number;
}

export function HeroModal({ isOpen, onClose, salary, downPayment }: HeroModalProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setIsAnalyzing(true);
            const timer = setTimeout(() => {
                setIsAnalyzing(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Mock calculations
    const monthlyBudget = salary * 0.3; // 30% of salary
    const financingCapacity = monthlyBudget * 48 * 0.8; // 48 months with some interest assumption
    const recommendedCarValue = financingCapacity + downPayment;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-blue-900/20 animate-in zoom-in-95 duration-300">
                {/* Header background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />

                <div className="relative flex items-center justify-between p-6 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400">
                            <RiSparklingLine size={18} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Análise Auto-Mind IA</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <RiCloseLine size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {isAnalyzing ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <RiLoader4Line size={48} className="text-blue-500 animate-spin mb-6" />
                            <h3 className="text-xl font-semibold text-white mb-2">Analisando seu perfil financeiro...</h3>
                            <p className="text-slate-400 max-w-xs">
                                Nossa inteligência artificial está cruzando seus dados com as melhores ofertas do mercado.
                            </p>
                        </div>
                    ) : (
                        <div className="animate-in slide-in-from-bottom-4 duration-500">
                            <p className="text-slate-300 mb-6 font-medium">
                                Excelente! Com base nos dados informados, calculamos o cenário ideal para o seu próximo carro.
                            </p>

                            <div className="bg-slate-950/50 rounded-xl p-5 border border-white/5 mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] pointer-events-none" />
                                <p className="text-sm text-slate-400 mb-1">Valor Recomendado do Veículo</p>
                                <div className="flex items-end gap-3 mb-4">
                                    <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(recommendedCarValue)}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Parcela ideal (48x)</p>
                                        <p className="text-lg font-semibold text-emerald-400">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyBudget)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Valor de entrada</p>
                                        <p className="text-lg font-semibold text-white">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(downPayment)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                                        <RiShieldCheckLine size={16} />
                                    </div>
                                    <p>Parcela segura que não compromete sua renda mensal</p>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-1 rounded-md bg-purple-500/20 text-purple-400">
                                        <RiBankCardLine size={16} />
                                    </div>
                                    <p>Maior chance de aprovação de crédito</p>
                                </div>
                            </div>

                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 text-base">
                                Ver Carros Sugeridos
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
