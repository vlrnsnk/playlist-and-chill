export const clearUrlParams = () => {
  const newUrl = `${window.location.origin}${window.location.pathname}`;
  window.history.replaceState({}, document.title, newUrl);
};
