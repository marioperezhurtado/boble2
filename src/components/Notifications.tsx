import { createSignal, For } from 'solid-js'

type Notification = {
  title: string,
  description: string,
  createdAt: Date,
}

const [notifications, setNotifications] = createSignal<Notification[]>([]);

export function addNotification(notification: Notification) {
  setNotifications([...notifications(), notification]);

  setTimeout(() => {
    setNotifications(notifications().filter((n) => n !== notification));
  }, 10000); // 10 seconds
}

export function ToastNotifications() {
  function dismissNotification(notification: Notification) {
    setNotifications(notifications().filter((n) => n !== notification));
  }

  return (
    <ol class="flex fixed top-4 right-4 z-20 flex-col-reverse gap-2">
      <For each={notifications()}>
        {(notification) => (
          <li class="flex-1 p-2 w-72 bg-white rounded-md shadow-md">
            <div class="flex gap-4 justify-between items-start mb-1">
              <h1 class="text-sm font-medium">{notification.title}</h1>
              <button
                onClick={() => dismissNotification(notification)}
                class="rounded-full transition min-w-fit hover:bg-zinc-100"
              >
                <img src="/icons/close.svg" alt="close" class="w-5 h-5" />
              </button>
            </div>
            <p class="text-xs text-zinc-600">{notification.description}</p>
          </li>
        )}
      </For>
    </ol>
  );
}
