import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, Globe, MapPin, Search, X } from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Country } from "./backend.d";
import { useGetCountries } from "./hooks/useQueries";

// ── Stagger animation variants ──────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const heroVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Country Card ─────────────────────────────────────────────────────────────
function CountryCard({ country, index }: { country: Country; index: number }) {
  return (
    <motion.article
      variants={cardVariants}
      className="country-card group relative bg-card border border-border rounded-lg p-5 flex flex-col gap-3 cursor-default"
      data-ocid={`countries.item.${index}`}
    >
      {/* Index badge */}
      <div className="absolute top-3 right-3">
        <span className="text-xs font-mono text-muted-foreground/60 tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Country name */}
      <h2 className="font-display font-semibold text-lg leading-tight pr-8 text-foreground group-hover:text-primary transition-colors duration-200">
        {country.name}
      </h2>

      {/* Capital */}
      <div className="flex items-center gap-2 text-sm">
        <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0" />
        <span className="text-muted-foreground">Capital</span>
        <span className="text-foreground font-medium ml-auto text-right">
          {country.capital}
        </span>
      </div>

      {/* Currency */}
      <div className="flex items-center gap-2 text-sm">
        <Coins className="w-3.5 h-3.5 text-accent/80 shrink-0" />
        <span className="text-muted-foreground">Currency</span>
        <Badge
          variant="outline"
          className="ml-auto border-accent/30 text-accent bg-accent/5 font-mono text-xs"
        >
          {country.currency}
        </Badge>
      </div>
    </motion.article>
  );
}

// ── Loading Skeletons ─────────────────────────────────────────────────────────
function CountrySkeletons() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      data-ocid="countries.loading_state"
    >
      {Array.from({ length: 12 }, (_, i) => `skeleton-${i}`).map((id) => (
        <div
          key={id}
          className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3"
        >
          <Skeleton className="h-6 w-3/4 bg-muted" />
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-2/3 bg-muted" />
        </div>
      ))}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 gap-4 text-center"
      data-ocid="countries.empty_state"
    >
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center border border-border">
        <Globe className="w-7 h-7 text-muted-foreground" />
      </div>
      <div>
        <p className="text-lg font-display font-medium text-foreground">
          No countries found
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          No results for{" "}
          <span className="text-primary font-medium">"{query}"</span>. Try a
          different name, capital, or currency.
        </p>
      </div>
    </motion.div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allCountries, isLoading, isError } = useGetCountries();

  // Client-side filtering for instant feedback
  const filtered = useMemo<Country[]>(() => {
    if (!allCountries) return [];
    if (!searchQuery.trim()) return allCountries;
    const q = searchQuery.toLowerCase();
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q),
    );
  }, [allCountries, searchQuery]);

  const totalCount = allCountries?.length ?? 0;
  const resultCount = filtered.length;

  return (
    <div className="min-h-screen atlas-bg atlas-grid relative">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10">
        {/* ── Header ── */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/40 sticky top-0 z-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-semibold text-base tracking-tight text-foreground">
                World Atlas
              </span>
            </div>
            <Badge
              variant="outline"
              className="border-border text-muted-foreground font-mono text-xs hidden sm:flex"
            >
              {totalCount} countries
            </Badge>
          </div>
        </header>

        {/* ── Hero ── */}
        <motion.section
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="container max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10"
        >
          {/* Decorative label */}
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-xs font-mono tracking-widest uppercase text-primary/70">
              Global Reference
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
            World <span className="text-primary">Countries</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mb-8">
            Explore 50 countries with their capitals and currencies — your
            essential global reference guide.
          </p>

          {/* ── Search ── */}
          <div className="relative max-w-xl search-glow rounded-lg transition-all duration-300">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="search.search_input"
              type="search"
              placeholder="Search by country, capital, or currency…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 bg-card/80 border-border/70 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 text-base rounded-lg"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* ── Results bar ── */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-4">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${resultCount}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground"
              >
                {isLoading ? (
                  "Loading countries…"
                ) : searchQuery ? (
                  <>
                    Showing{" "}
                    <span className="text-foreground font-medium">
                      {resultCount}
                    </span>{" "}
                    of{" "}
                    <span className="text-foreground font-medium">
                      {totalCount}
                    </span>{" "}
                    countries
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="text-foreground font-medium">
                      {totalCount}
                    </span>{" "}
                    countries
                  </>
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Main content ── */}
        <main className="container max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          {isLoading ? (
            <CountrySkeletons />
          ) : isError ? (
            <div
              className="flex flex-col items-center justify-center py-20 gap-3 text-center"
              data-ocid="countries.error_state"
            >
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-destructive font-medium">
                Failed to load countries
              </p>
              <p className="text-sm text-muted-foreground">
                Please refresh the page to try again.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState query={searchQuery} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              data-ocid="countries.list"
            >
              {filtered.map((country, i) => (
                <CountryCard
                  key={country.name}
                  country={country}
                  index={i + 1}
                />
              ))}
            </motion.div>
          )}
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-border/50 bg-background/60 backdrop-blur-sm">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary/60" />
              <span>World Atlas — 50 Countries Reference</span>
            </div>
            <span>
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary transition-colors"
              >
                Built with ♥ using caffeine.ai
              </a>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
