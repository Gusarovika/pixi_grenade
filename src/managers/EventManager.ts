export class EventManager {
	private listeners: { [eventName: string]: Function[] } = {};

	// Subscribe to an event with a listener and context
	subscribe(eventName: string, listener: Function, context: any): void {
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
		}
		// Use bind to attach the context to the listener
		const boundListener = listener.bind(context);
		this.listeners[eventName].push(boundListener);
	}

	// Emit an event with optional eventData
	emit(eventName: string, eventData?: any): void {
		if (this.listeners[eventName]) {
			for (const listener of this.listeners[eventName]) {
				listener(eventData);
			}
		}
	}
}
