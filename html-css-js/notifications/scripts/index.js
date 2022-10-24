// How To Send Push Notifications With JavaScript
// https://www.youtube.com/watch?v=Bm0JjR4kP8w&list=WL&index=3
// https://developer.mozilla.org/en-US/docs/Web/API/notification

const btnSend = document.querySelector('#btnSend');

btnSend.addEventListener('click', async () => {
    // Check if `Notifications` is supported.
    const notificationSupported = 'Notification' in window;
    console.log({notificationSupported})

    if (!notificationSupported) {
        alert('Notifications is not supported!');
        return;
    }

    if (Notification.permission != 'granted') {
        console.log('Denied!');
        return;
    }

    console.log('Granted!');

    new Notification('Hello!');

    // const notification = new Notification('My Title', {
    //     body: 'A sample body in the notification',
    //     data: { name: 'Adam Smith', message: 'Hello World!!!' }
    // });

    // notification.addEventListener('close', (e) => {
    //     console.log(e);
    // });
});
