class GlobalState {
  _chestStage = 1;

  get chestStage() {
    return this._chestStage;
  }

  set chestStage(value) {
    this._chestStage = value;
  }

  get isLastStage() {
    return this._chestStage >= 3;
  }
}

export const globalState = new GlobalState();
