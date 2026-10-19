// Copies a file a VIP client sent through the site into her client file in the
// tasks dashboard (matched there by email, then phone). Best-effort: the file is
// always in Rivky's email too, so a dashboard failure never fails the request.
// One file per request - each one is already under Vercel's 4.5MB request cap.
export async function forwardFilesToDashboard(
  client: { email?: string; phone?: string },
  files: { label: string; filename: string; content: Buffer; contentType?: string }[],
) {
  const secret = process.env.VIP_INTAKE_SECRET;
  if (!secret || !files.length || (!client.email && !client.phone)) return;
  const url = process.env.VIP_INTAKE_FILE_URL || "https://tasks-dashboard-gamma.vercel.app/api/vip-intake-file";

  await Promise.all(
    files.map(async f => {
      try {
        const fd = new FormData();
        fd.append("email", client.email || "");
        fd.append("phone", client.phone || "");
        fd.append("label", f.label);
        fd.append("file", new Blob([new Uint8Array(f.content)], { type: f.contentType || "application/octet-stream" }), f.filename);
        const res = await fetch(url, {
          method: "POST",
          headers: { "x-intake-secret": secret },
          body: fd,
          signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) console.error("Dashboard file forward failed:", f.label, res.status, await res.text().catch(() => ""));
      } catch (e) {
        console.error("Dashboard file forward failed:", f.label, e);
      }
    }),
  );
}
