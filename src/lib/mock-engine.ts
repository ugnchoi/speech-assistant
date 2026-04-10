export type MockEngine = {
  readonly version: number;
  tick: () => void;
};

export const createMockEngine = (): MockEngine => ({
  version: 1,
  tick: () => {},
});
