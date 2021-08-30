/* EXAMPLE USAGE
function setSubscribeButton() {
  console.log('subscribing')

  subscriptionButton.onclick = subscribe;
  subscriptionButton.textContent = 'Subscribe!';
}


function setUnsubscribeButton() {
  console.log('unsubscribing')

  subscriptionButton.onclick = unsubscribe;
  subscriptionButton.textContent = 'Unsubscribe!';
}

let subscriptionButton
subscriptionButton = document.getElementById('subscribe')
navigator.serviceWorker.register('service-worker.js');
*/


function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
  

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}


async function subscribe() {
  const registration = await navigator.serviceWorker.ready

  const response = await fetch('http://localhost:3456/notify/vapidPublicKey');
  const vapidPublicKey = await response.text();

  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey
  });

  console.log('Subscribed', subscription.endpoint);
    
  return fetch('http://localhost:3456/notify/register', {
    body: JSON.stringify({
      subscription: subscription
    }),
    headers: {
      'Content-type': 'application/json'
    },
    method: 'post',
    mode: 'cors',
  });
}


async function unsubscribe() {
  const registration = await navigator.serviceWorker.ready

  const subscription = await registration.pushManager.getSubscription();

  await subscription.unsubscribe()

  console.log('Unsubscribed', subscription.endpoint);
        
  return fetch('http://localhost:3456/notify/unregister', {
    body: JSON.stringify({
      subscription: subscription
    }),
    headers: {
      'Content-type': 'application/json'
    },
    method: 'post',
    mode: 'cors',
  });
}



async function initialize() {
  const registration = await navigator.serviceWorker.ready

  console.log('service worker registered');
  subscriptionButton.removeAttribute('disabled');
  
  const subscription = registration.pushManager.getSubscription();

  if (subscription) {
    console.log('Already subscribed', subscription.endpoint);

    return subscribed = true
  } else {
    setSubscribeButton();
    return subscribed = false
  }

}

export {
  initialize,
  subscribe,
  unsubscribe,
}