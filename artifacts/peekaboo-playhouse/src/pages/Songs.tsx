import MediaPage from "./MediaPage";
import { useLanguage } from "@/contexts/LanguageContext";
import { defaultSongs } from "@/data/learning";

export default function Songs() {
  const { t } = useLanguage();
  return (
    <MediaPage
      storageKey="peekaboo.songs"
      defaults={defaultSongs}
      title={t("pages.songs.title")}
      subtitle={t("pages.songs.subtitle")}
      emoji="🎵"
      color="#EF476F"
      addLabel={t("common.addSong")}
    />
  );
}
