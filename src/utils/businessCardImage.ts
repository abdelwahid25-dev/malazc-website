export interface BusinessCardImageData {
  name: string;
  position: string;
  department?: string;
  about: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  companyName: string;
  companyNameAlt: string;
  imageUrl?: string | null;
  language: "en" | "ar";
  isDark: boolean;
}

const W = 1080;
const PAD = 72;
const HEADER_H = 260;
const AVATAR_R = 130;

// Lucide icon outlines (24x24 viewBox) so the saved image matches the on-page icons.
const ICON_PATHS = {
  phone:
    "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
  mail: [
    "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
    "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  ],
  globe: [
    "M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0",
    "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
    "M2 12h20",
  ],
  pin: [
    "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
    "M9 10a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  ],
} as const;

const drawIcon = (
  ctx: CanvasRenderingContext2D,
  icon: keyof typeof ICON_PATHS,
  x: number,
  y: number,
  size: number,
  color: string,
) => {
  const paths = ([] as string[]).concat(ICON_PATHS[icon]);
  const scale = size / 24;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  paths.forEach((d) => ctx.stroke(new Path2D(d)));
  ctx.restore();
};

const loadImage = (url: string): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] => {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

/** Draws the business card straight to a canvas (no DOM rendering), returning a PNG blob. */
export const renderBusinessCardImage = async (
  data: BusinessCardImageData,
): Promise<Blob> => {
  const isAr = data.language === "ar";
  const family = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const font = (weight: number, size: number) =>
    `${weight} ${size}px ${family}`;

  await Promise.all(
    [400, 600, 700, 800].map((w) => document.fonts.load(`${w} 32px ${family}`)),
  ).catch(() => undefined);

  const photo = data.imageUrl ? await loadImage(data.imageUrl) : null;

  const colors = data.isDark
    ? { bg: "#0f172a", title: "#ffffff", body: "#cbd5e1", muted: "#94a3b8", line: "#1e293b" }
    : { bg: "#ffffff", title: "#020617", body: "#475569", muted: "#64748b", line: "#e2e8f0" };

  // Measure first so the canvas height fits the content.
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.direction = isAr ? "rtl" : "ltr";
  probe.font = font(500, 32);
  const aboutLines = wrapText(probe, data.about, W - PAD * 2);
  probe.font = font(800, 62);
  const nameLines = wrapText(probe, data.name, W - PAD * 2);

  const rows = [data.phone, data.email, data.website, data.address];
  const ROW_ICONS = ["phone", "mail", "globe", "pin"] as const;
  const avatarCy = HEADER_H;
  let y = avatarCy + AVATAR_R + 70;
  const nameY = y;
  y += nameLines.length * 76;
  const positionY = y;
  y += 56;
  const deptY = y;
  y += data.department ? 56 : 0;
  y += 30;
  const aboutY = y;
  y += aboutLines.length * 54 + 30;
  const rowsY = y;
  y += rows.length * 92 + 40;
  const H = y;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.direction = isAr ? "rtl" : "ltr";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, W, H);

  // Header
  const grad = ctx.createLinearGradient(0, 0, W, HEADER_H);
  grad.addColorStop(0, "#1e3a8a");
  grad.addColorStop(1, "#00a651");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, HEADER_H);

  const align: CanvasTextAlign = isAr ? "right" : "left";
  const logoX = isAr ? W - PAD - 100 : PAD;
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, logoX, 56, 100, 100, 20);
  ctx.fill();
  const s = 0.64;
  const lx = logoX + 18;
  const ly = 74;
  ctx.fillStyle = "#1e3a8a";
  ctx.beginPath();
  ctx.moveTo(lx, ly);
  ctx.lineTo(lx, ly + 100 * s);
  ctx.lineTo(lx + 47 * s, ly + 50 * s);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#00a651";
  ctx.beginPath();
  ctx.moveTo(lx + 100 * s, ly);
  ctx.lineTo(lx + 100 * s, ly + 100 * s);
  ctx.lineTo(lx + 53 * s, ly + 50 * s);
  ctx.closePath();
  ctx.fill();

  const textX = isAr ? logoX - 24 : logoX + 100 + 24;
  ctx.textAlign = align;
  ctx.fillStyle = "#ffffff";
  ctx.font = font(800, 40);
  ctx.fillText(data.companyName.toUpperCase(), textX, 106);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = font(600, 28);
  ctx.fillText(data.companyNameAlt, textX, 148);

  // Avatar
  const cx = W / 2;
  ctx.fillStyle = colors.bg;
  ctx.beginPath();
  ctx.arc(cx, avatarCy, AVATAR_R + 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, avatarCy, AVATAR_R, 0, Math.PI * 2);
  ctx.clip();
  if (photo) {
    // Square crop anchored to the top so faces stay in frame.
    const side = Math.min(photo.width, photo.height);
    const sx = (photo.width - side) / 2;
    ctx.drawImage(
      photo,
      sx,
      0,
      side,
      side,
      cx - AVATAR_R,
      avatarCy - AVATAR_R,
      AVATAR_R * 2,
      AVATAR_R * 2,
    );
  } else {
    ctx.fillStyle = "rgba(0,166,81,0.12)";
    ctx.fillRect(cx - AVATAR_R, avatarCy - AVATAR_R, AVATAR_R * 2, AVATAR_R * 2);
    ctx.fillStyle = "#00a651";
    ctx.beginPath();
    ctx.arc(cx, avatarCy - 20, 44, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, avatarCy + 110, 80, Math.PI, 0);
    ctx.fill();
  }
  ctx.restore();

  // Name, position, department
  ctx.textAlign = "center";
  ctx.fillStyle = colors.title;
  ctx.font = font(800, 62);
  nameLines.forEach((line, i) => ctx.fillText(line, cx, nameY + 56 + i * 76));
  ctx.fillStyle = "#00a651";
  ctx.font = font(700, 38);
  ctx.fillText(data.position, cx, positionY + 36);
  if (data.department) {
    ctx.fillStyle = colors.muted;
    ctx.font = font(600, 30);
    ctx.fillText(data.department, cx, deptY + 34);
  }

  // About
  ctx.fillStyle = colors.body;
  ctx.font = font(500, 32);
  aboutLines.forEach((line, i) => ctx.fillText(line, cx, aboutY + 40 + i * 54));

  // Contact rows (phone, email, website are always left-to-right text)
  ctx.strokeStyle = colors.line;
  ctx.lineWidth = 2;
  rows.forEach((value, i) => {
    const top = rowsY + i * 92;
    const isLatin = i < 3;
    const iconX = isAr ? W - PAD - 52 : PAD;
    ctx.beginPath();
    ctx.moveTo(PAD, top);
    ctx.lineTo(W - PAD, top);
    ctx.stroke();
    ctx.fillStyle = "rgba(0,166,81,0.14)";
    roundRect(ctx, iconX, top + 20, 52, 52, 14);
    ctx.fill();
    drawIcon(ctx, ROW_ICONS[i], iconX + 10, top + 30, 32, "#00a651");
    ctx.fillStyle = colors.title;
    ctx.font = isLatin ? "600 32px Inter, sans-serif" : font(600, 32);
    ctx.direction = isLatin ? "ltr" : isAr ? "rtl" : "ltr";
    ctx.textAlign = isAr ? "right" : "left";
    const tx = isAr ? iconX - 24 : iconX + 52 + 24;
    ctx.fillText(value, tx, top + 58, W - PAD * 2 - 76);
  });

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Image export failed"))),
      "image/png",
    ),
  );
};
