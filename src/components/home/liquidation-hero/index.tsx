/**
 * Copyright 2026 Salesforce, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import { DynamicImage } from '@/components/dynamic-image';
import heroImage from '/images/hero-01.webp';

const IMAGE_WIDTHS = ['92vw', '92vw', '44vw'];

/**
 * Full-bleed homepage hero announcing the store closing sale.
 * Type-first editorial layout so the liquidation message is the first thing shoppers see.
 */
export default function LiquidationHero(): ReactElement {
    const { t } = useTranslation('home');
    const headingId = 'liquidation-hero-heading';

    return (
        <section
            data-slot="liquidation-hero"
            aria-labelledby={headingId}
            className="relative overflow-hidden bg-brand-black text-brand-white">
            <div className="section-container grid min-h-[min(88vh,54rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20 lg:py-24">
                <div className="relative z-10 max-w-4xl">
                    <h1
                        id={headingId}
                        className="font-bold leading-[0.92] text-brand-white tracking-[-0.045em] text-[clamp(2.75rem,8vw,7.25rem)]">
                        <span className="block">{t('hero.liquidation.line1')}</span>
                        <span className="mt-[0.08em] block">{t('hero.liquidation.line2')}</span>
                    </h1>
                    <div className="mt-10">
                        <Button
                            asChild
                            variant="outline"
                            className="h-auto border-brand-white bg-transparent px-8 py-4 text-sm font-medium text-brand-white hover:bg-brand-white hover:text-brand-black">
                            <Link to="/category/root" aria-label={t('hero.liquidation.ctaAriaLabel')}>
                                {t('hero.liquidation.ctaText')}
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative aspect-[4/5] w-full max-w-xl justify-self-stretch overflow-hidden lg:justify-self-end motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-8 motion-safe:duration-700">
                    <DynamicImage
                        src={heroImage}
                        alt={t('hero.liquidation.imageAlt')}
                        widths={IMAGE_WIDTHS}
                        priority="high"
                        loading="eager"
                        className="absolute inset-0 h-full w-full"
                        imageProps={{ className: 'h-full w-full object-cover' }}
                    />
                </div>
            </div>
        </section>
    );
}
