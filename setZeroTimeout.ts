interface Handler {
  handler: Function;
  arguments: any[];
}

const messageKey =
  '__setZeroTimeoutcallback$' +
  Math.random()
    .toString(36)
    .slice(2);

const timeouts = new Map<number, Handler>();
let id = 0;

function handleTick(event: MessageEvent) {
  if (event.source !== window || event.data !== messageKey) {
    return;
  }

  const firstId = timeouts.keys()[0];

  const handler = timeouts.get(firstId);

  handler.handler(...arguments);

  timeouts.delete(firstId);
}

function setZeroTimeout(handler: Function, ...arguments: any[]): number {
  timeouts.set(id, { handler, arguments });

  window.postMessage(messageKey, '*');

  return ++id;
}

function clearZeroTimeout(id: number) {
  timeouts.delete(id);
}

window.addEventListener('message', handleTick, false);
