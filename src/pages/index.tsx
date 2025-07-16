import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Logo } from "@/components/Icons.tsx";
import QueryInput from "@/components/QueryInput.tsx";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-6">
        <Logo size={128} />
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
            而我愿陪你走进下一个十年
          </div>
        </div>

        <div className="mt-6 w-full max-w-lg">
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <QueryInput autoFocus={true} size={"lg"} />
        </div>

        <div className="mt-6 w-full max-w-lg">
          <Alert
            color="primary"
            endContent={
              <Button
                color="primary"
                size="md"
                onPress={() => {
                  window.open(
                    "https://mp.weixin.qq.com/s/sz-43wAiDWigDKl-ROQSHw",
                  );
                }}
              >
                参与投票
              </Button>
            }
            title="为 RoboSouls 投票！争夺 2025CUSGA 最具人气奖"
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
