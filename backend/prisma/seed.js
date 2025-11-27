const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const upCities = [
  "Lucknow",
  "Kanpur",
  "Varanasi",
  "Prayagraj",
  "Agra",
  "Ghaziabad",
  "Noida",
  "Meerut",
  "Gorakhpur",
  "Bareilly",
  "Aligarh",
  "Moradabad",
  "Saharanpur",
  "Jhansi",
  "Ayodhya",
  "Mathura",
  "Basti",
  "Sitapur",
  "Firozabad",
  "Etawah",
];

const busTypes = ["AC Seater", "Non-AC Seater", "AC Sleeper", "Non-AC Sleeper"];
const busNames = [
  "UPSRTC Express",
  "Royal Travels",
  "Shatabdi Bus Lines",
  "City Connect",
  "SilverLine Travels",
  "BlueSky Express",
  "YellowLine",
  "FastTrack",
  "Royal Coach",
  "Metro Bus",
  "SuperBus",
  "GoTravel",
  "StarLine",
  "FastWay",
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomTime() {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
}

function addHours(timeStr, hoursToAdd) {
  // Simple time addition logic for demo purposes
  // Assuming format "HH:MM AM/PM"
  // This is a rough approximation for seed data
  return getRandomTime(); // Just return another random time for simplicity in seed
}

async function main() {
  console.log('Start seeding ...');

  // Clear existing buses (optional, but good for clean state if desired)
  // await prisma.bus.deleteMany({}); 

  const busesToCreate = [];

  // Generate buses for random routes
  // We won't generate n*n routes as that's too many (20*19 = 380 routes)
  // Let's generate about 50-100 random routes with multiple buses each
  
  for (let i = 0; i < 100; i++) {
    const source = getRandomElement(upCities);
    let destination = getRandomElement(upCities);
    
    while (source === destination) {
      destination = getRandomElement(upCities);
    }

    // Create 2-4 buses for this route
    const numBuses = Math.floor(Math.random() * 3) + 2;

    for (let j = 0; j < numBuses; j++) {
      const departure = getRandomTime();
      const arrival = getRandomTime(); // Simplified
      const type = getRandomElement(busTypes);
      const basePrice = Math.floor(Math.random() * 500) + 300; // 300 - 800
      const name = getRandomElement(busNames);
      const seatsAvailable = Math.floor(Math.random() * 20) + 20; // 20 - 40

      busesToCreate.push({
        name,
        type,
        basePrice,
        departure,
        arrival,
        source,
        destination,
        seatsAvailable,
      });
    }
  }

  // Also ensure some popular routes definitely have buses
  const popularRoutes = [
    ["Lucknow", "Kanpur"],
    ["Kanpur", "Lucknow"],
    ["Lucknow", "Varanasi"],
    ["Varanasi", "Lucknow"],
    ["Agra", "Noida"],
    ["Noida", "Agra"],
    ["Delhi", "Lucknow"], // Adding Delhi manually as it's a common hub even if not in UP list
    ["Lucknow", "Delhi"]
  ];

  for (const [source, destination] of popularRoutes) {
     for (let j = 0; j < 5; j++) {
      const departure = getRandomTime();
      const arrival = getRandomTime();
      const type = getRandomElement(busTypes);
      const basePrice = Math.floor(Math.random() * 500) + 400;
      const name = getRandomElement(busNames);
      const seatsAvailable = Math.floor(Math.random() * 20) + 20;

      busesToCreate.push({
        name,
        type,
        basePrice,
        departure,
        arrival,
        source,
        destination,
        seatsAvailable,
      });
    }
  }

  console.log(`Creating ${busesToCreate.length} buses...`);

  for (const bus of busesToCreate) {
    await prisma.bus.create({
      data: bus,
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
