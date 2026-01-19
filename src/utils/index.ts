export function formatNumber(number: string | number): string {
  return Number(number).toLocaleString();
}

export function cx(
  ...classNames: Array<string | number | boolean | undefined | null>
) {
  return classNames.filter(Boolean).join(" ");
}

const hashCode = (str: string) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i); // hash * 33 + c
  }
  return hash;
};

type Colors = "primary" | "secondary" | "success" | "warning" | "danger";
const colors: Colors[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

export function hashColor(str: string) {
  const index = hashCode(str) % colors.length;
  return colors[index];
}
