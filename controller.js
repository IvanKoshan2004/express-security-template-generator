import { modules } from "./modules/modules.js";
import { generateFileFromTemplate } from "./templates/helpers/generateFileFromTemplate.js";
import { renderInjectionValue } from "./templates/helpers/renderInjectionValue.js";
import { templates } from "./templates/templates.js";

// Збирає injectionItems для певного шаблону та дескриптора на основі вибраних модулів
function collectInjectionItemsForTemplate(templateName, descriptorName, options) {
  const items = [];
  for (const module of modules) {
    if (options[module.key] === false || options[module.key] == null) continue;
    if (Array.isArray(module.options)) {
      const selectedOption = module.options.find((opt) => opt.value === options[module.key]);
      if (selectedOption && Array.isArray(selectedOption.injectionItems)) {
        for (const item of selectedOption.injectionItems) {
          if (item.templateName === templateName && item.injectionName === descriptorName) {
            items.push(item.value);
          }
        }
      }
    }
  }
  return items;
}

export async function runProjectBuilder(options) {
  for (const template of templates) {
    let hasInjectionItems = false;
    const descriptorValues = {};
    for (const descriptor of template.injectionDescriptors) {
      const injectionItems = collectInjectionItemsForTemplate(template.name, descriptor.name, options);
      const value =
        injectionItems.length > 0
          ? renderInjectionValue(descriptor, injectionItems)
          : renderInjectionValue(descriptor, descriptor.defaultValue);
      descriptorValues[descriptor.name] = value;
      hasInjectionItems = hasInjectionItems || injectionItems.length > 0;
    }

    if (!hasInjectionItems && template.skipWithoutInjections) continue;
    await generateFileFromTemplate(template, descriptorValues, process.cwd());
  }
}
