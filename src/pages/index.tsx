import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Logo } from "@/components/Icons.tsx";
import QueryInput from "@/components/QueryInput.tsx";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-6">
        <Logo size={120} />
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>The Best&nbsp;</span>
          <span className={title({ color: "violet" })}>Search</span>
          <br />
          <span className={title()}>Engine for </span>
          <span className={title({ color: "blue" })}>RoboMaster</span>
          <div className={subtitle({ class: "mt-4" })}>
            你是我 灵魂的旋律
            <br />
            春日的细雨 墓碑的雏菊
            <br />
            而我 将陪你走入下一个十年
          </div>
        </div>

        <div className="mt-6 w-full max-w-lg">
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <QueryInput autoFocus={true} size={"lg"} />
        </div>
      </section>
    </DefaultLayout>
  );
}
