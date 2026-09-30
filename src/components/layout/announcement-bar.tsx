import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="bg-[#3E1C27] text-[#FAF7F2] py-2.5 px-4 text-center text-[10px] md:text-[11px] font-medium tracking-[0.25em] uppercase border-b border-[#522536]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span>{siteConfig.announcement}</span>
      </div>
    </aside>
  );
}
