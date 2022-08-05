export default function handler(req, res) {
  const {
    query: { lat, lon },
  } = req;

  const url = `${process.env.OW_API_ENDPOINT}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${process.env.OW_API_KEY}`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      res.json(json);
    })
    .catch((error) => console.error(error));
}
