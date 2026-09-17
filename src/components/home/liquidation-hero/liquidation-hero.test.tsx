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
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import LiquidationHero from './index';
import { ConfigProvider } from '@salesforce/storefront-next-runtime/config';
import { mockConfig, getSitePrefix, mockSiteObject } from '@/test-utils/config';
import { SiteProvider, type Site } from '@salesforce/storefront-next-runtime/site-context';

vi.mock('@/components/dynamic-image', () => ({
    DynamicImage: ({ alt, src }: { alt?: string; src: string }) => <img alt={alt} src={src} />,
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'hero.liquidation.line1': "We're liquidating.",
                'hero.liquidation.highlight': 'liquidating',
                'hero.liquidation.line2': 'Everything must go!',
                'hero.liquidation.ctaText': 'Shop the sale',
                'hero.liquidation.ctaAriaLabel': 'Shop the sale, everything must go',
                'hero.liquidation.imageAlt': 'Looks from the closing collection',
            };
            return translations[key] || key;
        },
        i18n: { language: mockSiteObject.defaultLocale },
    }),
}));

const mockSite: Site = mockSiteObject;
const mockLocale =
    mockSite.supportedLocales.find((l) => l.id === mockSite.defaultLocale) ?? mockSite.supportedLocales[0];

const renderComponent = () => {
    const router = createMemoryRouter(
        [
            {
                path: '/',
                element: (
                    <ConfigProvider config={mockConfig}>
                        <SiteProvider
                            site={mockSite}
                            locale={mockLocale}
                            language={mockSiteObject.defaultLocale}
                            currency={mockSiteObject.defaultCurrency}>
                            <LiquidationHero />
                        </SiteProvider>
                    </ConfigProvider>
                ),
            },
        ],
        { initialEntries: ['/'] }
    );
    return render(<RouterProvider router={router} />);
};

describe('LiquidationHero', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders the liquidation headline and sale CTA', () => {
        renderComponent();

        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent("We're liquidating.");
        expect(heading).toHaveTextContent('Everything must go!');
        const emphasized = heading.querySelector('span.underline');
        expect(emphasized).toHaveTextContent('liquidating');
        expect(emphasized).toHaveClass('text-warning-foreground', 'decoration-wavy');
        expect(screen.getByRole('link', { name: 'Shop the sale, everything must go' })).toHaveAttribute(
            'href',
            `${getSitePrefix()}/category/root`
        );
        expect(screen.getByRole('img', { name: 'Looks from the closing collection' })).toBeInTheDocument();
    });
});
