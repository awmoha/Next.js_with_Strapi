declare module "strapi-sdk-javascript" {
    interface Strapi {
      get: (path: string) => Promise<any>;
      // Definiera andra metoder som du vill använda från strapi-sdk-javascript
      // Exempel: post, put, delete, etc.
    }
  
    const strapi: Strapi;
    export default strapi;
  }
  