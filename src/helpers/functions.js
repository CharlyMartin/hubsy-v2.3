function sample(array, number) {
  // No re-assignement of function parameters
  const a = array;

  // Shuffling array
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Return the x first items
  return a.slice(0, number);
}


function textEllipsis(str, limit = 110) {
  if (str.length > limit) return (`${str.substring(0, limit - 1).trim()}...`);
  return str;
}


function prefixLocale(locale, path) {
  return `${locale}${path}`;
}

export { sample, textEllipsis, prefixLocale };
