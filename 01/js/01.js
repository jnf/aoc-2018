const state = new WeakMap()
class Calibration {
  constructor (base=0) {
    state.set(this, { frequency: base })
  }

  modulate (change=0) {
    const oldState = state.get(this)
    const frequency = oldState.frequency + Number(change)
    state.set(this, { ...oldState, frequency })
  }

  get frequency () { return state.get(this).frequency }
}

export default Calibration
