import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "株式会社コスギ";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${APP_NAME}｜作業服・ユニフォームの専門商社｜秋田県` },
      {
        name: "description",
        content:
          "株式会社コスギは秋田県の作業服・ユニフォーム専門商社です。作業服、事務服、医療ウェア、安全用品の販売から、社名刺繍・プリント加工まで幅広く対応しています。",
      },
      { name: "theme-color", content: "#002559" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: `${APP_NAME}｜作業服・ユニフォームの専門商社｜秋田県` },
      {
        property: "og:description",
        content:
          "株式会社コスギは秋田県の作業服・ユニフォーム専門商社です。作業服、事務服、医療ウェア、安全用品の販売から、社名刺繍・プリント加工まで幅広く対応しています。",
      },
      { property: "og:url", content: "https://pokari28.github.io/kosugi/" },
      { property: "og:image", content: "https://pokari28.github.io/kosugi/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Noto+Sans+JP:wght@400;500;700;900&family=Yuji+Syuku&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: () => (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
