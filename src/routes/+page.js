import {redirect} from "@sveltejs/kit";
import {pb} from "$lib/pocketbase.js";

/** @type {import('./$types').PageLoad} */
export function load() {
  if (pb.authStore.isValid) throw redirect(302, '/my-library');
}