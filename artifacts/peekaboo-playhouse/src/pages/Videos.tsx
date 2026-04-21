import MediaPage from "./MediaPage";
import { useLanguage } from "@/contexts/LanguageContext";
import { defaultVideos } from "@/data/learning";

export default function Videos() {
  const { t } = useLanguage();
  return (
    <MediaPage
      storageKey="peekaboo.videos"
      defaults={defaultVideos}
      title={t("pages.videos.title")}
      subtitle={t("pages.videos.subtitle")}
      emoji="📺"
      color="#06D6A0"
      addLabel={t("common.addVideo")}
    />
  );
}
