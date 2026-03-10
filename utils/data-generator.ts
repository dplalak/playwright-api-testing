export const testNamespace = `pw-api-${Math.floor(Math.random() * 10000)}`;

export const uniqueId = (): number => {
  return 1000000 + Math.floor(Math.random() * 9000000);
};

export const uniqueName = (prefix: string): string => {
  return `${prefix}-${testNamespace}`;
};
