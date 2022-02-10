const fetchProducts = async (item) => {
  const fetchApi = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
    const data = (await fetchApi.json()).results;
    return data;
  };

  if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
