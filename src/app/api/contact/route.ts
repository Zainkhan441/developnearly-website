// Contact form backend: the form POSTs here (same origin), and this route
// forwards the inquiry to our own Google Apps Script web app, which sends
// the email from developnearly@gmail.com via Zain's own Gmail account.
// No third-party form service is involved. The Apps Script URL is kept in
// the APPS_SCRIPT_URL environment variable (Vercel project settings) so it
// does not live in the public repo.

export async function POST(request: Request) {
  const scriptUrl = process.env.APPS_SCRIPT_URL;
  if (!scriptUrl) {
    return Response.json(
      { ok: false, error: "Form backend not configured" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  // Honeypot: bots fill this hidden field, humans never see it.
  if (str(data.honeypot) !== "") {
    return Response.json({ ok: true });
  }

  const name = str(data.name);
  const email = str(data.email);
  const company = str(data.company);
  const service = str(data.service);
  const budget = str(data.budget);
  const message = str(data.message);

  if (name.length < 2) {
    return Response.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (!service || !budget || message.length < 10) {
    return Response.json({ ok: false, error: "Invalid inquiry" }, { status: 400 });
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, service, budget, message }),
      signal: AbortSignal.timeout(20000),
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !out || out.ok !== true) {
      return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
}
