if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {}).catch(err => console.log('Worker :: error'));
}