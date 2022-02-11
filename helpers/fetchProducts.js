const fetchProducts = async (item) => {
  try {
    const fetchApi = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
    const data = await fetchApi.json();
    return data;
  } catch (error) {
    return error;
  }
  };

  if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
