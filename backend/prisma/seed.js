const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const cities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Jaipur', 'Ahmedabad', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad',
  'Agra', 'Varanasi', 'Amritsar', 'Chandigarh', 'Dehradun',
  'Prayagraj'
];

// Bus operators and types from frontend inspiration
const busPool = [
  { name: "UPSRTC Express", type: "Non-AC Seater" },
  { name: "Royal Travels", type: "AC Sleeper" },
  { name: "Shatabdi Bus Lines", type: "AC Seater" },
  { name: "City Connect", type: "Non-AC Seater" },
  { name: "SilverLine Travels", type: "AC Sleeper" },
  { name: "BlueSky Express", type: "AC Seater" },
  { name: "YellowLine", type: "Non-AC Sleeper" },
  { name: "FastTrack", type: "AC Seater" },
  { name: "Royal Coach", type: "AC Sleeper" },
  { name: "Metro Bus", type: "Non-AC Seater" },
  { name: "SuperBus", type: "AC Seater" },
  { name: "GoTravel", type: "Non-AC Sleeper" },
  { name: "StarLine", type: "AC Sleeper" },
  { name: "FastWay", type: "AC Seater" },
  { name: "Volvo Multi-Axle", type: "Volvo AC" },
  { name: "Luxury Wheels", type: "Luxury Sleeper" }
];

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
  
  // Helper to get date string YYYY-MM-DD
  const getDateString = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  // Generate routes for ALL city pairs for the next 10 days
  for (let day = 0; day < 10; day++) {
    const currentDate = getDateString(day);
    console.log(`Generating buses for ${currentDate}...`);

    for (const source of cities) {
      for (const destination of cities) {
        if (source === destination) continue;

        // Create exactly 5 buses for EVERY route as requested
        const busesPerRoute = 5;

        for (let j = 0; j < busesPerRoute; j++) {
          const busTemplate = getRandomElement(busPool);
          const seatsAvailable = getRandomInt(30, 50);
          const basePrice = getRandomInt(300, 2500);
          
          busesToCreate.push({
            name: busTemplate.name,
            type: busTemplate.type,
            basePrice: basePrice,
            departure: generateTime(),
            arrival: generateTime(),
            source: source,
            destination: destination,
            date: currentDate,
            seatsAvailable: seatsAvailable,
          });
        }
      }
    }
  }

  console.log(`Creating ${busesToCreate.length} buses...`);
  
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
