/**
 * Icon Name Mapper
 * Single Responsibility: Map lowercase icon names to Lucide PascalCase names
 */

const ICON_MAP: Record<string, string> = {
  sparkles: "Sparkles",
  video: "Video",
  mic: "Mic",
  microphone: "Mic",
  check: "Check",
  checkcircle: "CheckCircle",
  "check-circle": "CheckCircle",
  film: "Film",
  wand: "Wand",
  zap: "Zap",
  image: "Image",
  images: "Image",
  camera: "Camera",
  music: "Music",
  star: "Star",
  heart: "Heart",
  crown: "Crown",
  shield: "Shield",
  lock: "Lock",
  unlock: "Unlock",
  infinity: "Infinity",
  rocket: "Rocket",
  gift: "Gift",
  flame: "Flame",
  trophy: "Trophy",
  target: "Target",
  bell: "Bell",
  settings: "Settings",
  user: "User",
  users: "Users",
  globe: "Globe",
  download: "Download",
  upload: "Upload",
  share: "Share",
  edit: "Edit",
  trash: "Trash",
  plus: "Plus",
  minus: "Minus",
  x: "X",
  arrowright: "ArrowRight",
  "arrow-right": "ArrowRight",
  chevronright: "ChevronRight",
  "chevron-right": "ChevronRight",
  chevronleft: "ChevronLeft",
  "chevron-left": "ChevronLeft",
};

/**
 * Normalize icon name to Lucide PascalCase format
 * @param iconName - Icon name (can be lowercase, kebab-case, or PascalCase)
 * @returns Normalized PascalCase icon name
 */
export function normalizeIconName(iconName: string): string {
  if (!iconName) {
    return "Circle";
  }

  // If already PascalCase, return as is
  if (/^[A-Z][a-zA-Z]*$/.test(iconName)) {
    return iconName;
  }

  // Check if in map
  const normalized = iconName.toLowerCase().replace(/-/g, "");
  const mapped = ICON_MAP[normalized];

  if (mapped) {
    return mapped;
  }

  // Convert to PascalCase if not found
  return iconName
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

