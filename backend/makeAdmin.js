const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const makeAdmin = async () => {
  const email = process.argv[2];

  if (!email) {
    console.log('Please provide an email address.');
    console.log('Usage: node makeAdmin.js <email>');
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email: email },
      data: { role: 'admin' },
    });

    console.log(`Success! User ${user.name} (${user.email}) is now an Admin.`);
  } catch (error) {
    if (error.code === 'P2025') {
      console.error('User not found!');
    } else {
      console.error('Error updating user:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
};

makeAdmin();
