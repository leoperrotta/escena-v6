export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return res.status(500).json({ error: 'Redis not configured' });

  const response = await fetch(`${url}/incr/escena-obra-counter`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  const numero = String(data.result).padStart(4, '0');
  return res.status(200).json({ numero });
}
