import { Accordion, AccordionItem } from "@heroui/accordion";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function MilestonePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-8">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>里程碑</h1>
        </div>

        <Accordion className="mt-4" selectionMode="multiple" variant="splitted">
          <AccordionItem subtitle="2025年1月20日" title="受到B站视频启发">
            B站up主 --Action--
            发布了关于论坛搜索的吐槽视频，引起了广泛关注和讨论。
            我们经过分析后认为，以目前的条件，可以实现第三方搜索引擎。
          </AccordionItem>
          <AccordionItem subtitle="2025年1月21日" title="技术方案验证完成">
            我们对论坛的字段和接口进行分析和抓包后，验证了数据获取的可行性。
          </AccordionItem>
          <AccordionItem subtitle="2025年1月22日" title="论坛数据收集完成">
            通过爬虫程序，我们收集了论坛的全量<b>公开</b>数据，获取到约 4.3
            万篇文章和模板。
          </AccordionItem>
          <AccordionItem subtitle="2025年1月23日" title="论坛全文索引完成">
            将所有数据导入到 ElasticSearch 构建索引，实现了基本的全文搜索功能。
          </AccordionItem>
          <AccordionItem subtitle="2025年1月23日" title="明确更高的目标">
            经过几天的思考，我们认为与其做最好的论坛搜索引擎，不如做最好的 RM
            社区搜索引擎。我们计划继续索引官网公告，
            同时将B站、微信公众号等自媒体的内容也纳入搜索范围。
            基于大量的公开资料，自动为每支队伍立传，最后发展成 RM 的《史记》。
          </AccordionItem>
          <AccordionItem subtitle="2025年2月11日" title="前端框架技术验证">
            经过了3天的技术验证，我们初步选定了基于 Algolia InstantSearch 的
            Searchkit 作为前端搜索框架，并搭建简易的页面，完成首个 Demo.
          </AccordionItem>
          <AccordionItem subtitle="2025年2月12日" title="前端框架确定">
            我们选定了基于 React 的 HeroUI 作为前端框架和组件库，并结合上述的
            Searchkit 正式开始了前端项目的开发。
          </AccordionItem>
          <AccordionItem subtitle="2025年2月16日" title="MVP 版本完成">
            经过了几天的开发，我们完成了第一个 MVP
            版本。在实现最基本功能的同时，保持了 UI 的简洁和美观。
          </AccordionItem>
          <AccordionItem subtitle="2025年3月1日" title="官网公告索引完成">
            我们完成了官网公告的全文索引，实现了对官网公告的搜索功能。
          </AccordionItem>
          <AccordionItem subtitle="2025年3月2日" title="官网 PDF 索引完成">
            我们完成了官网 PDF 文件的全文索引，实现了对 PDF 文件的搜索功能。
          </AccordionItem>
          <AccordionItem subtitle="2025年3月5日" title="内测计划启动">
            我们陆续邀请了5位华南虎队伍外的 RM
            用户参与内测，收到了一些反馈和建议。在此感谢他们的支持和帮助。
          </AccordionItem>
          <AccordionItem subtitle="2025年3月6日" title="LOGO 设计完成">
            设计师完成了多个版本 RM Search 的 LOGO
            设计，我们从中选出了最满意的设计并最终定稿。
          </AccordionItem>
          <AccordionItem subtitle="2025年3月6日" title="宣传推文初稿完成">
            我们完成了 RM Search 的宣传推文初稿，并确定了最终发布时间。
          </AccordionItem>
          <AccordionItem subtitle="2025年3月8日" title="生产环境部署完成">
            我们在一台拥有 36 核 CPU 和 128GB
            内存的服务器上部署了生产环境，并提供了 200Mbps 的公网带宽。
          </AccordionItem>
          <AccordionItem subtitle="2025年3月9日" title="正式发布">
            所有的努力都已经完成。我们在此宣布，RM Search 正式上线。
          </AccordionItem>
        </Accordion>
      </section>
    </DefaultLayout>
  );
}
