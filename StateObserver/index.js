class StateObserver {
  constructor(config={}) {
    const {source=window.location} = config;

    this.source = source;
  }

  currentState = () => {
    return decodeURIComponent(this.source.hash.replace('#', ''));
  }

  updateState = (text) => {
    this.source.hash = encodeURIComponent(text);
  }
}
