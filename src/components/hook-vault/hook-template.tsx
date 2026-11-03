import { cn } from "@/lib/utils";

/** Renderiza o template destacando as [VARIÁVEIS] em terracota. */
export function HookTemplate({ value, className }: { value: string; className?: string }) {
  const parts = value.split(/(\[[^\]]+\])/g);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.startsWith("[") ? (
          <span
            key={i}
            className={cn("rounded bg-primary/10 px-0.5 font-medium text-primary")}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
