import yaml from "js-yaml";

export function renderInjectionValue(injectionDescriptor, injectionItems) {
  const { type, options = {} } = injectionDescriptor;

  function getUnindentedValue() {
    if (type === "envVariables") {
      let merged = {};
      if (Array.isArray(injectionItems)) {
        merged = Object.assign({}, ...injectionItems);
      } else if (typeof injectionItems === "object" && injectionItems !== null) {
        merged = injectionItems;
      }
      return Object.entries(merged)
        .map(([key, value]) => `${key}="${value}"`)
        .join("\n");
    } else if (type === "string") {
      if (Array.isArray(injectionItems)) {
        return injectionItems.map(String).join(",");
      }
      return injectionItems;
    } else if (type === "object") {
      let obj;
      if (Array.isArray(injectionItems)) {
        obj = Object.assign({}, ...injectionItems);
      } else {
        obj = injectionItems;
      }
      if (options.sorted) {
        obj = Object.keys(obj)
          .sort()
          .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
          }, {});
      }
      return JSON.stringify(obj, null, 2);
    } else if (type === "codeblock") {
      if (Array.isArray(injectionItems)) {
        return injectionItems.join("\n");
      }
      return injectionItems;
    } else if (type === "yml") {
      let merged = {};
      if (Array.isArray(injectionItems)) {
        merged = Object.assign({}, ...injectionItems);
      } else if (typeof injectionItems === "object" && injectionItems !== null) {
        merged = injectionItems;
      }
      return yaml.dump(merged, { indent: 2 });
    } else if (type === "array") {
      if (Array.isArray(injectionItems)) {
        // Merge all arrays in injectionItems into a single array
        const merged = injectionItems.flat();
        return JSON.stringify(merged, null, 2);
      }
      return JSON.stringify([injectionItems], null, 2);
    }
    return "";
  }

  const indent = typeof options.indentation === "number" ? options.indentation : 0;

  return getUnindentedValue()
    .split("\n")
    .map((line) => " ".repeat(indent) + line)
    .join("\n");
}
