import type { ReflectionEntry } from "@/types/reflection";

type ReflectionListProps = {
  entries: readonly ReflectionEntry[];
};

export const ReflectionList = ({ entries }: ReflectionListProps) => {
  if (entries.length === 0) {
    return null;
  }

  return (
    <ul className="list-none space-y-2 p-0">
      {entries.map((entry) => (
        <li key={entry.id} className="rounded-md border border-border p-3">
          <p className="text-sm text-muted-foreground">{entry.createdAt}</p>
          <p className="text-sm">{entry.body}</p>
        </li>
      ))}
    </ul>
  );
};
