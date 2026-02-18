import { getHomeV2Markup } from "@/features/home-v2/template";

function HomeV2Markup({ html }: { html: string }) {
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}

export default async function HomeV2Page() {
  const markup = await getHomeV2Markup();

  return (
    <main className="home-v2-react-root" aria-label="KultureX landing page">
      <HomeV2Markup html={markup} />
    </main>
  );
}
