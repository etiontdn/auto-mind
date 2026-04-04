import { HeroBadge } from "./hero/HeroBadge";
import { HeroTitulo } from "./hero/HeroTitulo";
import { HeroSubtitulo } from "./hero/HeroSubtitulo";
import { HeroCallToActions } from "./hero/HeroCallToActions";
import { HeroFeatures } from "./hero/HeroFeatures";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-32">
            {/* Efeito Visual de Fundo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl bg-blue-600/10 blur-[140px] rounded-full" />

            <div className="container relative z-10 mx-auto px-6 text-center">
                <HeroBadge />
                <HeroTitulo />
                <HeroSubtitulo />
                <HeroCallToActions />
                <HeroFeatures />
            </div>
        </section>
    );
}
