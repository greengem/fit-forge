const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateExerciseImages() {
    
  const exercises = await prisma.exercise.findMany({
    where: {
      image: null,
    },
  });

  for (const exercise of exercises) {
    const updatedImage = exercise.name.replace(/\s+/g, '_').replace(/\//g, '_');
    await prisma.exercise.update({
      where: {
        id: exercise.id,
      },
      data: {
        image: updatedImage,
      },
    });
    console.log(`Updated exercise ${exercise.name} with image ${updatedImage}`);
  }

  console.log('All exercises have been updated successfully.');
}

updateExerciseImages().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
