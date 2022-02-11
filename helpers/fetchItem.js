const fetchItem = async (code) => {
  try {
  const infoItem = await fetch(`https://api.mercadolibre.com/items/${code}`);
  const data = await infoItem.json();
  return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
