interface Env {
  BREVO_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { BREVO_API_KEY } = context.env;
  if (!BREVO_API_KEY) {
    return new Response(JSON.stringify({ error: "Brevo not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await context.request.json() as Record<string, string>;
  const { email, name, company, teamSize, challenge, budget, timeline } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: "Email required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const [firstName, ...lastParts] = (name || "").trim().split(" ");
  const lastName = lastParts.join(" ");

  const attributes: Record<string, string> = {};
  if (name) attributes.FIRSTNAME = firstName;
  if (name) attributes.LASTNAME = lastName;
  if (company) attributes.COMPANY = company;
  if (teamSize) attributes.TEAM_SIZE = teamSize;
  if (challenge) attributes.CHALLENGE = challenge;
  if (budget) attributes.BUDGET = budget;
  if (timeline) attributes.TIMELINE = timeline;
  attributes.SOURCE = "quiz";

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      listIds: [9],
      attributes,
      updateEnabled: true,
    }),
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    return new Response(JSON.stringify({ error: text }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
