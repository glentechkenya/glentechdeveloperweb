export default async function handler(req, res) {
  const ip = req.query.ip;

  if (!ip) {
    res.status(400).json({ error: "IP address required" });
    return;
  }

  try {
    const r = await fetch(
      `https://api.giftedtech.co.ke/api/stalk/ipstalk?apikey=${process.env.GIFTED_API_KEY}&address=${encodeURIComponent(ip)}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "GlentechKenya"
        }
      }
    );

    const text = await r.text();

    try {
      const json = JSON.parse(text);
      res.status(200).json(json);
    } catch {
      res.status(500).json({ error: "Invalid response", raw: text });
    }

  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}
