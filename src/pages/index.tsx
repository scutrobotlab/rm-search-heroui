import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { SearchIcon } from "@/components/icons.tsx";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>The Best&nbsp;</span>
          <span className={title({ color: "violet" })}>Search</span>
          <br />
          <span className={title()}>Engine for </span>
          <span className={title({ color: "blue" })}>RoboMaster</span>
          <div className={subtitle({ class: "mt-4" })}>
            华南理工大学华南虎战队献给 RoboMaster 的十周年礼物
          </div>
        </div>

        <div className="mt-8 w-full max-w-lg">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-lg",
            }}
            endContent={
              <Kbd className="hidden lg:inline-block" keys={["command"]}>
                K
              </Kbd>
            }
            labelPlacement="outside"
            placeholder="搜索..."
            radius={"md"}
            size={"lg"}
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = e.currentTarget.value;

                window.location.href = `/search?rm-search[query]=${value}`;
              }
            }}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
