/* eslint-disable @typescript-eslint/no-explicit-any */
export default function getUniqueValues(data: any[], type: string) {
  let unique = data.map((item: any) => item[type]);

  if (type === 'colors') {
    unique = unique.flat();
  }

  return ['all', ...Array.from(new Set(unique))];
}
