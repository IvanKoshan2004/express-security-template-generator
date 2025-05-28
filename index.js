#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { modules } from "./modules/modules.js";
import { runTemplateBuilder } from "./controller.js";

let lastOption = "";
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
    return value ? chalk.green(value) : chalk.red("no");
  }
  return chalk.gray("-");
};

async function promptMenu(modules, options) {
  console.clear();
  console.log(chalk.blue.bold("\nExpress Security Template Generator\n"));

  const choices = modules.map((module) => ({
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
        name: o ?? "не використовувати",
        value: o,
      })),
    },
  ]);

  return option;
}

async function main() {
  const runningOptions = getDefaultOptions(modules);

  let done = false;
  while (!done) {
    done = await promptMenu(modules, runningOptions);
  }

  console.clear();
  console.log(chalk.green.bold("\n✅ Конфігурація завершена!"));
  console.log(chalk.yellow("\nОбрані модулі:\n"));
  runTemplateBuilder(runningOptions);
}

main();
