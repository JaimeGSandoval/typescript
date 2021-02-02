interface Bankai {
  name: string;
  bankai: boolean;
}

interface Kage {
  name: string;
  kageNumber: number;
}

const ichigo: Bankai = {
  name: "Kurosaki Ichigo",
  bankai: true
}

const naruto: Kage = {
  name: "Uzumaki Naruto",
  kageNumber: 7
}

const renji: Bankai = {
  name: "Abarai Renji",
  bankai: false
}

const kakashi: Kage = {
  name: "Hatake Kakashi",
  kageNumber: 6
}

console.log(ichigo);
console.log(naruto);
console.log(renji);
console.log(kakashi);
