import type { Hit as AlgoliaHit } from "instantsearch.js/es/types/results";

import { Image } from "@heroui/image";
import { Card, CardBody, CardFooter } from "@heroui/card"; // 引入 CardFooter
import { Highlight, Snippet } from "react-instantsearch";
import { User } from "@heroui/user";
import moment from "moment";
import fallback from "@/assets/fallback.png";

type HitType = AlgoliaHit<{
  id: string;
  title: string;
  content: string;
  image: string;
  url: string;
  author_nickname: string;
  author_avatar: string;
  create_time: number;
}>;

export function Hit({ hit }: { hit: HitType }) {
  const hasImage = hit.image !== "";

  return (
    <a href={hit.url} rel="noopener noreferrer" target="_blank">
      <Card
        isBlurred
        className="border-none h-full flex flex-col p-2"
        shadow="sm"
        isHoverable
      >
        <CardBody>
          <div className="flex-grow">
            <div className="grid grid-cols-6 md:grid-cols-12 gap-0">
              <div
                className={
                  hasImage
                    ? "col-span-6 md:col-span-8"
                    : "col-span-12 md:col-span-12"
                }
              >
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
              </div>
              {hasImage && (
                <div className="col-span-6 md:col-span-4 ml-2 flex items-center justify-center h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center overflow-hidden">
                    <Image
                      alt={hit.title}
                      fallbackSrc={fallback}
                      shadow={"none"}
                      loading="eager"
                      src={hit.image}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="flex gap-1">
            <User
              avatarProps={{
                src: hit.author_avatar,
                alt: hit.author_nickname,
                size: "sm",
              }}
              name={hit.author_nickname}
            />
          </div>
          <div className="flex gap-1 pl-4">
            <time className="text-foreground/60 text-small">
              {moment(hit.create_time).format("YYYY-MM-DD")}
            </time>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
}
