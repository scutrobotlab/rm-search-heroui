import type { Hit as AlgoliaHit } from "instantsearch.js/es/types/results";

import { Image } from "@heroui/image";
import { Card, CardBody } from "@heroui/card";
import { Highlight, Snippet } from "react-instantsearch";

type HitType = AlgoliaHit<{
  id: string;
  title: string;
  content: string;
  image: string;
  url: string;
}>;

export function Hit({ hit }: { hit: HitType }) {
  const hasImage = hit.image !== "";

  return (
    <a href={hit.url} rel="noopener noreferrer" target="_blank">
      <Card isBlurred className="border-none h-full cursor-pointer">
        <div className="grid grid-cols-6 md:grid-cols-12 gap-0 justify-center">
          <div
            className={
              hasImage
                ? "col-span-6 md:col-span-8 p-2"
                : "col-span-12 md:col-span-12 p-2"
            }
          >
            <CardBody>
              <div className="flex flex-col gap-0">
                <h1 className="text-large font-medium line-clamp-2">
                  <Highlight
                    attribute="title"
                    highlightedTagName="mark"
                    hit={hit}
                  />
                </h1>
                <p className="text-small text-foreground/80 line-clamp-4">
                  <Snippet
                    attribute="content"
                    highlightedTagName="mark"
                    hit={hit}
                  />
                </p>
              </div>
            </CardBody>
          </div>
          {hasImage && (
            <div className="col-span-6 md:col-span-4 mr-4 flex items-center justify-center h-full relative">
              <div className="image-gradient-mask absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white">
                <Image
                  isZoomed
                  alt={hit.title}
                  className="object-cover h-full w-full rounded-none border-none"
                  fallbackSrc="/placeholder.jpg"
                  shadow={"none"}
                  src={hit.image}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </a>
  );
}
