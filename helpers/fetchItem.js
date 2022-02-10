const fetchItem = async (code) => {
  const infoItem = await fetch(`https://api.mercadolibre.com/items/${code}`);
  const data = await infoItem.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
