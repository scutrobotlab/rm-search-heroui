import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme.tsx";
import { ToastProvider } from "@heroui/toast";
import { I18nProvider } from "@react-aria/i18n";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <I18nProvider locale="zh-CN">
        <HeroUIProvider navigate={navigate} useHref={useHref}>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
