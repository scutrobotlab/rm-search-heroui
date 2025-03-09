import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-8">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>关于</h1>
        </div>
        <p className={"text-2xl mt-4"}>免责声明</p>
        <p className={"text-lg mt-2"}>
          截止至本站完成全量索引构建时， bbs.robomaster.com 和
          www.robomaster.com 均没有设置 robots.txt 文件，
          <br />
          根据行业惯例，本站作为搜索引擎可以合法的抓取并展示这些网站的内容。
          <br />
          本站所有内容均来自互联网，如有侵权，请联系我们删除。
        </p>
      </section>
    </DefaultLayout>
  );
}
