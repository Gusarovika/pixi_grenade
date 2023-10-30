export class EventManager {
	private listeners: { [eventName: string]: Function[] } = {};

	subscribe(eventName: string, listener: Function, context: any) {
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
		}
		// this.listeners[eventName].push(listener);
		// Используем bind, чтобы привязать контекст к слушателю
		const boundListener = listener.bind(context);
		this.listeners[eventName].push(boundListener);
	}

	emit(eventName: string, eventData: any) {
		if (this.listeners[eventName]) {
			for (const listener of this.listeners[eventName]) {
				listener(eventData);
			}
		}
	}
}
