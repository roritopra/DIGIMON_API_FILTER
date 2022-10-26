export async function getData(){
  try {
    const data = await fetch('https://digimon-api.vercel.app/api/digimon').then(res => res.json());
    return data;
  } catch (e) {
    console.log(e);
  }
}
