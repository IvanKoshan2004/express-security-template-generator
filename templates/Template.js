export class Template {
  /**
   * @param {Object} config
   * @param {string} config.name - Ідентифікатор шаблону
   * @param {string} config.targetPath - Шлях до створюваного файлу
   * @param {Array<{ name: string, defaultValue: string, type: 'string' | 'codeblock' | 'object' | 'envVariables' }>} config.injectionDescriptors - Список токенів для підстановки
   * @param {string} config.template - Текст шаблону з токенами {{{name}}}
   */
  constructor({ name, targetPath, injectionDescriptors, template, skipWithoutInjections = false }) {
    this.name = name;
    this.targetPath = targetPath;
    this.injectionDescriptors = injectionDescriptors;
    this.template = template;
    this.skipWithoutInjections = skipWithoutInjections;
  }
}
