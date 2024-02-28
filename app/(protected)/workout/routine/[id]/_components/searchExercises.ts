import prisma from "@/prisma/prisma";
import { SearchResult } from "../NewRoutineTypes";

export async function searchExercises(search: string) {
    const searchWords = search.split(" ");
    let searchResults: SearchResult[] = [];

  if (search.trim() !== "") {
    searchResults = await prisma.exercise.findMany({
      where: {
        AND: searchWords.map((word) => ({
          name: {
            contains: word,
            mode: "insensitive",
          },
        })),
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        category: true,
        image: true,
      }
    });
  }

  return searchResults;
}