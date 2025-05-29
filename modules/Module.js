export class Module {
  constructor({ key, label, type, defaultValue, hide, options = [] }) {
    this.key = key;
    this.label = label;
    this.type = type;
    this.defaultValue = defaultValue;
    this.options = options;
    this.hide = hide || false;
  }
}
