import { writable } from 'svelte/store';

/** True once the opening animation has completed (or been skipped). */
export const opDone = writable(false);
