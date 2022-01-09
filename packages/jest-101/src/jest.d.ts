declare namespace jest {
  interface Matchers<R> {
    toMatchJsonPath(value: string): CustomMatcherResult;
  }
}
