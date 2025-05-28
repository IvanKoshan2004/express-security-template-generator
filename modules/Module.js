export class Module {
  constructor({ key, label, type, defaultValue, options = [] }) {
    this.key = key;
    this.label = label;
    this.type = type;
    this.defaultValue = defaultValue;
    this.options = options;
  }
}
