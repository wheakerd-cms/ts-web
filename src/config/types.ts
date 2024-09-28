export type ReturnTypeRouter<T> = () => Promise<T | (ReturnTypeRouter<T>)>;