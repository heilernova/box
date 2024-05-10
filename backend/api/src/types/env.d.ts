declare  {
    namespace NodeJS {
      interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production';
        readonly PORT: string;

        readonly APP_DIR_FILES: string;
        readonly APP_URL_MEDIA: string;
        
        readonly DB_TYPE: "PostgreSQL" | "MariaDB",
        readonly DB_HOSTNAME: string;
        readonly DB_USERNAME: string,
        readonly DB_PASSWORD: string,
        readonly DB_DATABASE: string,
        readonly DB_PORT?: string;
      }
    }
  }