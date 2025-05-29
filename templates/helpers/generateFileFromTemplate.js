import fs from "fs/promises";
import path from "path";

/**
 * Генерує файл на основі шаблону з підставленням значень.
 * @param {Object} template - шаблон, який містить шлях, ін'єкційні дескриптори і шаблонний текст
 * @param {{[name: string]: string}} renderedInjectionValues - значення, що будуть вставлені за ключами дескрипторів шаблону
 * @param {string} basePath - базовий шлях до директорії, де буде створено файл за шаблоном
 */
export async function generateFileFromTemplate(template, renderedInjectionValues, basePath) {
  const fullPath = path.join(basePath, template.targetPath);
  const dirPath = path.dirname(fullPath);

  await fs.mkdir(dirPath, { recursive: true });

  let content = template.template;
  for (const [name, value] of Object.entries(renderedInjectionValues)) {
    const token = new RegExp(`{{{\\s*${name}\\s*}}}`, "g");
    content = content.replace(token, value);
  }

  await fs.writeFile(fullPath, content.trim(), "utf8");
}
