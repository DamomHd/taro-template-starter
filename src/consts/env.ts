const Config = {
  env: CODE_ENV || 'dev',
};

export function changeEnv(env: 'dev' | 'pro'): void {
  Config.env = env;
}

export default Config;
