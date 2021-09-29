// 格式化url
export function formatUrl(path: string, params: any = {}): string {
  let url = path;

  const haveP = url.indexOf('?') !== -1;
  const keys = Object.keys(params) || [];
  keys.forEach((key, index) => {
    let link = '';
    if (haveP) {
      link = '&';
    } else {
      link = (index === 0) ? '?' : '&';
    }
    const value = params[key];
    url = `${url}${link}${key}=${encodeURIComponent(value)}`;
  });

  return url;
}
