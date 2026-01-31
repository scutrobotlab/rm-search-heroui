import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/react";
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
  const href = useHref;

  const handleNavigate = (to: string, options?: NavigateOptions) => {
    if (to.startsWith("http://") || to.startsWith("https://")) {
      window.location.href = to;
      return;
    }
    navigate(to, options);
  };

  const handleHref = (to: string) => {
    if (to.startsWith("http://") || to.startsWith("https://")) {
      return to;
    }
    return href(to);
  };

  return (
    <ThemeProvider>
      <I18nProvider locale="zh-CN">
        <HeroUIProvider navigate={handleNavigate} useHref={handleHref}>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
