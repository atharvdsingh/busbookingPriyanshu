const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const cities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Jaipur', 'Ahmedabad', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad'
];

const busTypes = ['AC Seater', 'AC Sleeper', 'Non-AC Seater', 'Non-AC Sleeper', 'Volvo AC', 'Luxury Sleeper'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateTime = () => {
  const hour = getRandomInt(0, 23).toString().padStart(2, '0');
  const minute = getRandomInt(0, 59).toString().padStart(2, '0');
  return `${hour}:${minute}`;
};

async function main() {
  console.log('Start seeding ...');

  // 1. Clear existing data
  await prisma.seat.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.bus.deleteMany();
  await prisma.user.deleteMany();
  console.log('Cleared existing data.');

  // 2. Create Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      phone: '9999999999',
    },
  });
  console.log(`Created admin: ${admin.email}`);

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'user@example.com',
      password: hashedPassword,
      role: 'user',
      phone: '8888888888',
    },
  });
  console.log(`Created user: ${user.email}`);

  // 3. Create Buses
  const busesToCreate = [];
  
  // Generate routes between random city pairs
  for (let i = 0; i < 50; i++) { // Create 50 random routes
    let source = getRandomElement(cities);
    let destination = getRandomElement(cities);
    
    while (source === destination) {
      destination = getRandomElement(cities);
    }

    // Create 3-5 buses for this route
    const busesPerRoute = getRandomInt(3, 5);
    
    for (let j = 0; j < busesPerRoute; j++) {
      const type = getRandomElement(busTypes);
      const seatsAvailable = getRandomInt(30, 50);
      const price = getRandomInt(500, 3000);
      
      busesToCreate.push({
        name: `${getRandomElement(['Express', 'Travels', 'Voyager', 'Lines', 'Connect'])} ${getRandomInt(100, 999)}`,
        type: type,
        basePrice: price,
        departure: generateTime(),
        arrival: generateTime(), // In a real app, arrival should be > departure, but for string representation it's fine for now
        source: source,
        destination: destination,
        seatsAvailable: seatsAvailable,
      });
    }
  }

  // Also ensure some popular routes exist specifically
  const popularRoutes = [
    ['Delhi', 'Jaipur'],
    ['Mumbai', 'Pune'],
    ['Bangalore', 'Chennai'],
    ['Delhi', 'Agra']
  ];

  for (const [src, dest] of popularRoutes) {
     for (let j = 0; j < 5; j++) {
      busesToCreate.push({
        name: `SuperFast ${getRandomInt(1000, 9999)}`,
        type: getRandomElement(busTypes),
        basePrice: getRandomInt(400, 1500),
        departure: generateTime(),
        arrival: generateTime(),
        source: src,
        destination: dest,
        seatsAvailable: 40,
      });
     }
  }

  console.log(`Creating ${busesToCreate.length} buses...`);
  
  // Batch create buses
  // Note: createMany is supported in MongoDB with Prisma
  await prisma.bus.createMany({
    data: busesToCreate,
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
