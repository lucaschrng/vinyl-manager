import { writable } from 'svelte/store';

export const isLogin = writable(true);
export const selectedRecord = writable(null);
