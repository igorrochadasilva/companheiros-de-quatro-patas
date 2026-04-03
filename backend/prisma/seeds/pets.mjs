import { PrismaPg } from "@prisma/adapter-pg";
import {
  PetGender,
  PetMediaType,
  PetSize,
  PetSpecies,
  PetStatus,
  PrismaClient,
} from "@prisma/client";

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`[seed:pets] Missing required env var: ${name}`);
  }
  return value;
}

const adapter = new PrismaPg({
  connectionString: requireEnv("DATABASE_URL"),
});

const prisma = new PrismaClient({ adapter });

const seedPets = [
  {
    externalId: "seed-pet-001",
    name: "Luna",
    species: PetSpecies.DOG,
    size: PetSize.MEDIUM,
    gender: PetGender.FEMALE,
    age: "2",
    city: "Sao Paulo",
    state: "SP",
    status: PetStatus.AVAILABLE,
    featured: true,
    published: true,
    vaccinated: true,
    castrated: true,
    description: "Docil, vacinada e pronta para adocao responsavel.",
  },
  {
    externalId: "seed-pet-002",
    name: "Thor",
    species: PetSpecies.DOG,
    size: PetSize.LARGE,
    gender: PetGender.MALE,
    age: "5",
    city: "Guarulhos",
    state: "SP",
    status: PetStatus.TREATMENT,
    featured: false,
    published: true,
    vaccinated: true,
    castrated: true,
    description: "Em tratamento veterinario, mas com boa evolucao.",
  },
  {
    externalId: "seed-pet-003",
    name: "Nina",
    species: PetSpecies.CAT,
    size: PetSize.SMALL,
    gender: PetGender.FEMALE,
    age: "8 meses",
    city: "Osasco",
    state: "SP",
    status: PetStatus.AVAILABLE,
    featured: true,
    published: true,
    vaccinated: true,
    castrated: false,
    description: "Filhote carinhosa e muito brincalhona.",
  },
  {
    externalId: "seed-pet-004",
    name: "Mingau",
    species: PetSpecies.CAT,
    size: PetSize.SMALL,
    gender: PetGender.MALE,
    age: "1",
    city: "Barueri",
    state: "SP",
    status: PetStatus.RESERVED,
    featured: false,
    published: true,
    vaccinated: true,
    castrated: true,
    description: "Ja possui familia interessada, em fase final de avaliacao.",
  },
  {
    externalId: "seed-pet-005",
    name: "Mel",
    species: PetSpecies.DOG,
    size: PetSize.SMALL,
    gender: PetGender.FEMALE,
    age: "3",
    city: "Sao Paulo",
    state: "SP",
    status: PetStatus.AVAILABLE,
    featured: false,
    published: false,
    vaccinated: true,
    castrated: true,
    description: "Energetica e sociavel, indicada para familias ativas.",
  },
  {
    externalId: "seed-pet-006",
    name: "Rex",
    species: PetSpecies.DOG,
    size: PetSize.MEDIUM,
    gender: PetGender.MALE,
    age: "9",
    city: "Santo Andre",
    state: "SP",
    status: PetStatus.ADOPTED,
    featured: false,
    published: false,
    vaccinated: true,
    castrated: true,
    description: "Caso de sucesso: ja adotado e acompanhando adaptacao.",
  },
  {
    externalId: "seed-pet-007",
    name: "Chico",
    species: PetSpecies.OTHER,
    size: PetSize.SMALL,
    gender: PetGender.UNKNOWN,
    age: "2",
    city: "Campinas",
    state: "SP",
    status: PetStatus.AVAILABLE,
    featured: false,
    published: true,
    vaccinated: false,
    castrated: false,
    description: "Resgate especial para validar especie OTHER nos filtros.",
  },
  {
    externalId: "seed-pet-008",
    name: "Amora",
    species: PetSpecies.CAT,
    size: PetSize.MEDIUM,
    gender: PetGender.FEMALE,
    age: "7",
    city: "Sao Paulo",
    state: "SP",
    status: PetStatus.TREATMENT,
    featured: true,
    published: true,
    vaccinated: true,
    castrated: true,
    description: "Em tratamento dermatologico, com acompanhamento semanal.",
  },
];

async function seed() {
  const created = [];

  for (const pet of seedPets) {
    const saved = await prisma.pet.upsert({
      where: { externalId: pet.externalId },
      create: pet,
      update: pet,
    });

    created.push(saved);
  }

  const ids = created.map((pet) => pet.id);

  await prisma.petMedia.deleteMany({
    where: {
      petId: { in: ids },
      publicId: { startsWith: "seed-pet/" },
    },
  });

  await prisma.petMedia.createMany({
    data: created.map((pet, index) => ({
      petId: pet.id,
      type: PetMediaType.IMAGE,
      isMain: true,
      sortOrder: 0,
      publicId: `seed-pet/${pet.externalId}`,
      url: `https://placehold.co/800x800.png?text=${encodeURIComponent(
        `${index + 1}-${pet.name}`,
      )}`,
    })),
  });

  return created.length;
}

seed()
  .then(async (count) => {
    process.stdout.write(`[seed:pets] Done. Upserted ${count} pets.\n`);
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("[seed:pets] Failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
