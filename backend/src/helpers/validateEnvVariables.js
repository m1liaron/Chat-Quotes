import { envVariables } from "../common/envVariables.js";

const validateEnvVariables = () => {
  for (const key in envVariables) {
    const value = envVariables[key];

    if (typeof value === "string") {
      if (value.trim().length === 0) {
        console.error(`Error🔴: ${key} is empty`);
        process.exit(1);
      }
    } else if (value === undefined || value === null) {
      console.error(`${key} is not set`);
      process.exit(1);
    }
  }
};

export { validateEnvVariables };