const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateImageField() {
  // Fetch all exercises from the database
  const exercises = await prisma.exercise.findMany();

  for (const exercise of exercises) {
    // Convert the name to the desired format
    let imageName = exercise.name.replace(/\//g, '_').replace(/\s+/g, '_');

    // Update the exercise with the new image field
    await prisma.exercise.update({
      where: { id: exercise.id },
      data: { image: imageName },
    });
  }

  console.log('Image fields updated successfully!');
}

updateImageField().finally(async () => {
  await prisma.$disconnect();
});
