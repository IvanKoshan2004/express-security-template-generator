#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import { modules } from "./modules/modules.js";
import { runProjectBuilder } from "./controller.js";

let lastOption = "done";
const getDefaultOptions = (modules = []) => {
  const options = {};
  modules.forEach((el) => (options[el.key] = el.defaultValue));
  return options;
};
const getYesNo = (val) => (val ? chalk.green("yes") : chalk.red("no"));
const getDisplayValue = (module, value) => {
  if (module.type === "toggle") {
    return getYesNo(value);
  }
  if (module.type === "select") {
    const selectedOption = module.options.find((opt) => opt.value === value);
    if (selectedOption && selectedOption.label) {
      return chalk.green(selectedOption.label);
    }
    return value ? chalk.green(value) : chalk.red("не використовувати");
  }
  return chalk.gray("-");
};
async function promptMenu(modules, options) {
  console.clear();
  console.log(chalk.blue.bold("\nExpress Security Template Generator\n"));

  const choices = modules
    .filter((module) => !module.hide)
    .map((module) => ({
      name: `${module.label}: ${getDisplayValue(module, options[module.key])}`,
      value: module.key,
      short: module.key,
    }));

  choices.push(new inquirer.Separator());
  choices.push({
    name: chalk.bold.green("✅ Завершити і згенерувати проект"),
    value: "done",
  });

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Оберіть модуль для налаштування:",
      choices,
      pageSize: choices.length,
      loop: false,
      default: lastOption,
    },
  ]);

  lastOption = action;

  if (action === "done") return true;

  const selected = modules.find((m) => m.key === action);
  if (!selected) return false;

  if (selected.type === "toggle") {
    options[selected.key] = !options[selected.key];
  } else if (selected.type === "select") {
    options[selected.key] = await promptModuleSelectOption(selected);
  }

  return false;
}

async function promptModuleSelectOption(module) {
  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: `Оберіть значення для: ${module.label}`,
      choices: module.options.map((o) => ({
        name: o.value ?? "не використовувати",
        value: o.value,
      })),
    },
  ]);

  return option;
}

async function main() {
  // Prompt for project name (українською)
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Введіть назву проекту:",
      validate: (input) => (input && input.trim() ? true : "Потрібно вказати назву проекту"),
    },
  ]);

  const projectDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(projectDir)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: `Папка '${projectName}' вже існує. Перезаписати?`,
        default: false,
      },
    ]);
    if (!overwrite) {
      console.log("Відмінено.");
      process.exit(1);
    }
    await fs.remove(projectDir);
  }
  await fs.mkdirp(projectDir);
  process.chdir(projectDir);

  const runningOptions = getDefaultOptions(modules);

  let done = false;
  while (!done) {
    done = await promptMenu(modules, runningOptions);
  }

  console.clear();
  console.log(chalk.green.bold("\n✅ Конфігурація завершена!"));
  await runProjectBuilder(runningOptions);
  console.log(chalk.blue.bold("\nПроект згенеровано. Виконайте npm install для встановлення залежностей.\n"));
}

main();
