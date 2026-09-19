import { Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/auth-context";
import { RuralLocaleProvider, useRuralLocale } from "@/modules/rural/i18n/locale-context";
import { useOnlineStatus } from "@/modules/rural/hooks";
import { cn } from "@/lib/utils";

function ShellInner() {
  const { user } = useAuth();
  const { t } = useRuralLocale();
  const online = useOnlineStatus();
  const workerName = user?.full_name || "Health worker";

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-3xl flex-col gap-3 pb-8">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-label">Field care</p>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Namaste, {workerName}
          </h1>
          <p className="text-xs text-muted-foreground">
            {t("appName")} · camps, verified screening, map, offline sync.
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium",
            online
              ? "bg-secondary/15 text-secondary"
              : "bg-warning/20 text-warning-foreground",
          )}
        >
          {online ? t("online") : t("offline")}
        </span>
      </div>

      <Outlet />
    </div>
  );
}

export function RuralShell() {
  return (
    <RuralLocaleProvider>
      <ShellInner />
    </RuralLocaleProvider>
  );
}
