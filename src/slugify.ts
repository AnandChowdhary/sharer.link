export default (result: any) => {
  const name = result.trackName || result.collectionName;
  return name
    .replace(/[^a-zA-Z ]/g, '')
    .substring(0, 20).trim()
    .replace(/\s+/g, '-')
    .toLowerCase() + '-' + (result.trackId || result.collectionId);
};
