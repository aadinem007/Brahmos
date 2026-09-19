import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { useAppLocale } from "@/i18n/locale-context";
import {
  DICTIONARIES,
  LOCALE_LABELS,
  type DictKey,
} from "@/modules/rural/i18n/dictionaries";
import type { RuralLocale } from "@/modules/rural/types";

interface LocaleContextValue {
  locale: RuralLocale;
  setLocale: (locale: RuralLocale) => void;
  t: (key: DictKey) => string;
  labels: typeof LOCALE_LABELS;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function toRuralLocale(code: string): RuralLocale {
  if (code === "hi" || code === "gu") return code;
  return "en";
}

export function RuralLocaleProvider({ children }: { children: ReactNode }) {
  const { locale: appLocale, setLocale: setAppLocale } = useAppLocale();
  const locale = toRuralLocale(appLocale);

  const setLocale = useCallback(
    (next: RuralLocale) => {
      setAppLocale(next);
    },
    [setAppLocale],
  );

  const t = useCallback(
    (key: DictKey) => DICTIONARIES[locale][key] ?? DICTIONARIES.en[key] ?? key,
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, labels: LOCALE_LABELS }),
    [locale, setLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useRuralLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useRuralLocale must be used within RuralLocaleProvider");
  }
  return ctx;
}
