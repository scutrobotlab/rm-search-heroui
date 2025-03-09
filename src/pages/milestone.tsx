import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function MilestonePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>里程碑</h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
