export interface LocalEvent<E> {
    type: E;
    target?: any;
}
export declare type Callback<E> = (e: E, ...params: any[]) => void;
export declare abstract class EventBase<T, E extends LocalEvent<T>> {
    private listeners;
    on(type: T, callback: Callback<E>, self?: any): void;
    off(type: T, callback: Callback<E>, self?: any): void;
    emit(event: E, ...params: any[]): void;
}
