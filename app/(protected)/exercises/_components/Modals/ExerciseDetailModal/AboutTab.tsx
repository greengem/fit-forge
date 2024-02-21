"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Exercise } from "@prisma/client";

export default function AboutTab({ exercise }: { exercise: Exercise | null }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className="overflow-hidden mb-3 relative" ref={emblaRef}>
        <div className="flex">
          <div className="shrink-0 grow-0 basis-full min-w-0">
            <Image
              src={`/images/exercises/${exercise?.image}/images/0.jpg`}
              width={750}
              height={500}
              alt={`${exercise?.name} photo 1`}
            />
          </div>
          <div className="shrink-0 grow-0 basis-full min-w-0">
            <Image
              src={`/images/exercises/${exercise?.image}/images/1.jpg`}
              width={750}
              height={500}
              alt={`${exercise?.name} photo 2`}
            />
          </div>
        </div>

        {emblaApi && (
          <div className="flex justify-center space-x-2 absolute left-0 right-0 bottom-2">
            {emblaApi.scrollSnapList().map((snap, index) => (
              <button
                key={index}
                onClick={() => emblaApi.scrollTo(index)}
                className={`h-1 w-10 rounded-full ${selectedIndex === index ? "bg-primary" : "bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      </div>

      {exercise?.instructions && (
        <>
          <h4 className="font-semibold text-lg mb-3">Instructions</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {exercise?.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
