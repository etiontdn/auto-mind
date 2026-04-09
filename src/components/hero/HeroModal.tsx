import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    RiCloseLine,
    RiSparklingLine,
    RiShieldCheckLine,
    RiBankCardLine,
    RiLoader4Line,
    RiCarLine
} from "@remixicon/react";

interface HeroModalProps {
    isOpen: boolean;
    onClose: () => void;
    salary: number;
    downPayment: number;
}

interface RecommendationResult {
    texto_resumo: string;
    carro_indicado: {
        marca: string;
        modelo: string;
        ano: number;
        preco: number;
        motivo_recomendacao: string;
    };
    erro?: string;
}

export function HeroModal({ isOpen, onClose, salary, downPayment }: HeroModalProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [result, setResult] = useState<RecommendationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setIsAnalyzing(true);
            setError(null);

            // Faz a chamada para a nossa função serverless no Netlify
            fetch(`/.netlify/functions/search?salario=${salary}&entrada=${downPayment}`)
                .then(res => res.json())
                .then((data: RecommendationResult) => {
                    if (data.erro) {
                        setError(data.erro);
                    } else {
                        setResult(data);
                    }
                })
                .catch(err => {
                    console.error("Erro ao buscar recomendação:", err);
                    setError("Ocorreu um erro ao buscar sua recomendação. Tente novamente mais tarde.");
                })
                .finally(() => {
                    setIsAnalyzing(false);
                });
        } else {
            // Limpa o estado quando fecha para a próxima vez
            setResult(null);
            setError(null);
        }
    }, [isOpen, salary, downPayment]);

    if (!isOpen) return null;

    // Converte o preço que vem em centavos para reais (ex: 3000000 -> R$ 30.000,00)
    const precoReal = result?.carro_indicado?.preco ? result.carro_indicado.preco / 100 : 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-blue-900/20 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                {/* Header background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />

                <div className="relative flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-slate-900/80 backdrop-blur-md z-10">
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
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <RiLoader4Line size={48} className="text-blue-500 animate-spin mb-6" />
                            <h3 className="text-xl font-semibold text-white mb-2">Analisando seu perfil com IA...</h3>
                            <p className="text-slate-400 max-w-sm">
                                Nossa inteligência artificial está lendo nossa base de dados e encontrando a combinação perfeita para o seu salário e entrada!
                            </p>
                        </div>
                    ) : error ? (
                        <div className="py-12 text-center">
                            <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-400 mb-4">
                                <RiCloseLine size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Ops, algo deu errado</h3>
                            <p className="text-slate-400 max-w-sm mx-auto mb-6">{error}</p>
                            <Button onClick={onClose} variant="outline" className="border-white/10">Tentar Novamente</Button>
                        </div>
                    ) : result ? (
                        <div className="animate-in slide-in-from-bottom-4 duration-500">
                            <p className="text-slate-300 mb-6 font-medium leading-relaxed">
                                {result.texto_resumo}
                            </p>

                            <div className="bg-slate-950/50 rounded-xl p-6 border border-white/5 mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[40px] pointer-events-none" />

                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-md uppercase tracking-wider">
                                                Recomendação Ideal
                                            </span>
                                            <span className="text-sm text-slate-400 border border-white/10 px-2 py-1 rounded-md">
                                                Ano: {result.carro_indicado.ano}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">
                                            {result.carro_indicado.marca} {result.carro_indicado.modelo}
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-full text-blue-400 shrink-0">
                                        <RiCarLine size={28} />
                                    </div>
                                </div>

                                <div className="flex items-end gap-3 mb-6 pb-6 border-b border-white/5">
                                    <h4 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoReal)}
                                    </h4>
                                    <span className="text-slate-500 mb-1 font-medium">Preço à vista / Base Tabela</span>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                                        <RiSparklingLine size={16} className="text-blue-400" />
                                        Por que escolhemos este?
                                    </h4>
                                    <p className="text-slate-400 text-sm leading-relaxed bg-white/5 p-4 rounded-lg border border-white/5">
                                        {result.carro_indicado.motivo_recomendacao}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-emerald-500/10">
                                    <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                                        <RiShieldCheckLine size={16} />
                                    </div>
                                    <p>Este valor se enquadra perfeitamente na sua capacidade de financiamento.</p>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-purple-500/10">
                                    <div className="p-1 rounded-md bg-purple-500/20 text-purple-400">
                                        <RiBankCardLine size={16} />
                                    </div>
                                    <p>Alta probabilidade de aprovação com o valor de R$ {downPayment} de entrada.</p>
                                </div>
                            </div>

                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 text-base shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                                Tenho interesse neste modelo
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
