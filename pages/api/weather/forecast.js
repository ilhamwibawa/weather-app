export default function handler(req, res) {
  const {
    query: { lat, lon },
  } = req;

  const url = `${process.env.OW_API_ENDPOINT}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OW_API_KEY}`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      res.json(json);
    })
    .catch((error) => console.error(error));
}
