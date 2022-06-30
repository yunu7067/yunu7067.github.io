interface BlogViewProps {
  /** 사이트 도메인과 같은 고유한 값 */
  namespace: string;
}

interface CountApiReturn {
  /** 조회수 */
  value: number;
}

export interface ViewRequestProps {
  /** 사이트 도메인과 같은 고유한 값 */
  namespace: string;
  /**
   * 키 값 조건 : /^[A-Za-z0-9_\\-.]{3,64}$/
   */
  key: string;
}

/**
 * https://countapi.xyz/ 참조
 */
export const hit = ({namespace, key}: ViewRequestProps) => {
  const encodedNamespace = namespace
    .replaceAll(/[^A-Za-z0-9_\\\-\.]/g, '')
    .slice(0, 63)
    .padStart(3, '_');
  const encodedKey = key
    .replaceAll(/[^A-Za-z0-9_\\\-\.]/g, '')
    .slice(0, 63)
    .padStart(3, '_');

  // console.log(`https://api.countapi.xyz/hit/${encodedNamespace}/${encodedKey}`);
  return fetch(`https://api.countapi.xyz/hit/${encodedNamespace}/${encodedKey}`).then(result => {
    return result.json() as unknown as CountApiReturn;
  });
};
