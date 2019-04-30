import uuid from 'uuid'

const OptionInitialState = [
  {
    id: uuid(),
    label: 'Use size as param',
    value: true
  },
  {
    id: uuid(),
    label: 'Use provider as param',
    value: true
  }
];

export default OptionInitialState;