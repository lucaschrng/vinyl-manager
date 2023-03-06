import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

export async function login(email, password) {
  return await pb.collection('users').authWithPassword(email, password);
}

export async function logout() {
    await pb.authStore.clear();
    return pb.authStore;
}
export async function register(newUser) {
  return await pb.collection('users').create(newUser);
}

export async function getRecords() {
  return await pb.collection('records').getFullList({user_id: pb.authStore.model.id});
}

export async function updateRecord(id, record) {
  return await pb.collection('records').update(id, record);
}