export abstract class EnvConfig {
  static getEnv = (envKey: string) => {
    var result = process.env[envKey];
    if (result == null) throw Error();
    return result;
  };
  static getAppConfig() {
    return {
      isDev: EnvConfig.getEnv('isDev'),
      backend_url: EnvConfig.getEnv('backend_url'),
      backend_url_dev: EnvConfig.getEnv('backend_url_dev'),
      secret_encrypt: EnvConfig.getEnv('secret_encrypt'),
    };
  }
}