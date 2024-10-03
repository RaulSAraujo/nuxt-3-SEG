import { vi } from 'vitest';

// Exemplo de mock global
vi.mock('nuxt/dist/app/entry.mjs', () => ({
    useNuxtApp: () => ({
        $myCustomFetch: vi.fn(),
    }),
}));
