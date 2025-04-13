import { Divider } from "@heroui/divider";
import { Alert } from "@heroui/alert";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-8">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>关于</h1>
        </div>

        <div className={"text-md mt-2"}>
          <Alert
            hideIcon
            color="success"
            description={
              <p>
                <b>RM Search</b>&nbsp;
                是由华南理工大学机器人未来创新实验室华南虎战队成员发起的软件项目，励志做全
                RM 最好用的搜索引擎。
              </p>
            }
            variant="flat"
          />
          <p className="indent-8" />
        </div>

        <b className={"text-2xl mt-4"}>项目团队</b>
        <div className={"text-md mt-2 text-center"}>
          <p className={"text-lg"}>后端工程师</p>
          <p className={"text-md"}>2023赛季信息组组长 常霆钰</p>
          <br />
          <p className={"text-lg"}>前端工程师</p>
          <p className={"text-md"}>2023赛季信息组组长 常霆钰</p>
          <br />
          <p className={"text-lg"}>运维工程师</p>
          <p className={"text-md"}>
            2024&2025赛季软件开发组组长 罗棨文
            <br />
            2023赛季信息组组长 常霆钰
          </p>
          <br />
          <p className={"text-lg"}>宣传运营</p>
          <p className={"text-md"}>2023赛季宣运组组长 杨卓石</p>
          <br />
          <p className={"text-lg"}>LOGO 设计</p>
          <p className={"text-md"}>2024赛季软件开发组组长 温欣怡</p>
          <br />
          <p className={"text-md"}>
            特别感谢内测用户首都师范大学W.PIE 张盛博、湖南大学跃鹿
            王文喆提出的宝贵意见。
          </p>
        </div>

        <Divider className="my-4" />

        <b className={"text-2xl"}>免责声明</b>
        <div className={"text-md mt-2 indent-8"}>
          <p className="indent-8">
            截止至本站完成全量索引构建时， bbs.robomaster.com 和
            www.robomaster.com 均没有设置 robots.txt 文件，
            根据行业规范和相关法律法规，本站作为搜索引擎可以合法收集上述网站的内容。
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
