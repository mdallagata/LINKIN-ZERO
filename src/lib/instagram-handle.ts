/** "https://www.instagram.com/linkin.zero/" → "@linkin.zero". */
export function instagramHandle(url: string): string {
  const user: string | undefined = url.match(/instagram\.com\/([^/?]+)/)?.[1];
  return user ? `@${user}` : url;
}
