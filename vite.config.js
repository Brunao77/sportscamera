export default {
  // Other Vite options...
  ssr: {
    noExternal: ["node:crypto"], // Exclude node:crypto from external modules
  },
};
