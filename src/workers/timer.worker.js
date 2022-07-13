// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  setInterval(() => {
    // eslint-disable-next-line no-restricted-globals
    self.postMessage('tick');
  }, 1000);
}
