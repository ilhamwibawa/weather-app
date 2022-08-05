export default function handler(req, res) {
  const {
    query: { query },
  } = req;

  const url = `${process.env.UNSPLASH_API_ENDPOINT}/search/photos?query=${query}&orientation=landscape&client_id=${process.env.UNSPLASH_API_KEY}`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      res.json(json);
    })
    .catch((error) => console.error(error));
}
