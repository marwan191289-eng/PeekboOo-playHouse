import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { PeekabooCreatorAssistant } from "@/components/PeekabooCreatorAssistant";

export default function Teacher() {
  const { t } = useLanguage();
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <PageHeader
        title={t("pages.teacher.title")}
        subtitle={t("pages.teacher.subtitle")}
        emoji="🤖"
        color="#F77F00"
      />
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#F77F00] h-[640px]">
        <PeekabooCreatorAssistant />
      </div>
    </div>
  );
}
