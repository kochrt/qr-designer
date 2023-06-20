require("dotenv").config();
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  server: {
    host: "0.0.0.0"
  },

  head: {
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      // { href: "https://fonts.googleapis.com/css?family=:300,400,500,600,700", rel: "stylesheet" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true
      },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
        rel: "stylesheet"
      }
    ],
    script: [
      {
        src: "https://js.stripe.com/v3/",
        defer: true
      },
      {
        defer: true,
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": '{"token": "ba9d1866bd0e4b30af60c1be9ee36d51"}'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "codemirror/lib/codemirror.css",
    "codemirror/theme/base16-dark.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/konva.js", ssr: false }],

  // We'll have to come back to this
  // render: {
  //   csp: {
  //     policies: {
  //       'default-src': ["'self'"],
  //       'frame-ancestors': ["'none'"],
  //       'style-src': ["'self'", "'unsafe-inline'", "sw.ink"],
  //       'script-src': [
  //         "'self'",
  //         "'unsafe-inline'",
  //         PRIMARY_HOSTS,
  //         'sentry.io',
  //         '*.sentry-cdn.com',
  //         '*.google-analytics.com',
  //         '*.logrocket.io'
  //       ],
  //     }
  //   }
  // },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/tailwindcss"
  ],

  publicRuntimeConfig: {
    sitePath: process.env.SITE_PATH,
    apiPath: process.env.API_PATH,
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    environment: process.env.ENVIRONMENT
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxt/content", "nuxt-element-ui"],

  elementUI: {
    components: ["Upload"]
  },

  hooks: {
    "content:file:beforeParse": file => {
      if (file.extension !== ".md") {
        return;
      }
      file.data = file.data.replace(/{apiPath}/g, process.env.API_PATH);
    },
    "content:file:beforeInsert": file => {
      const separator = ";example";

      /** @type Array */
      const bodyElements = file.body.children;
      const separatorIndex = bodyElements.findIndex(element => {
        return (
          element.type === "element" &&
          element.tag === "p" &&
          element.children[0].value === separator
        );
      });

      if (separatorIndex === -1) {
        file.documentation = file.body;
        file.exampleArea = { type: "root", children: [] };
      } else {
        file.documentation = {
          type: "root",
          children: bodyElements.slice(0, separatorIndex)
        };
        file.exampleArea = {
          type: "root",
          children: bodyElements.slice(separatorIndex + 1)
        };
      }
    }
  },

  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: "prism-themes/themes/prism-vsc-dark-plus.css"
      },
      tocDepth: 6
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["konva"],
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.wasm.bin$/,
        loader: "file-loader"
      });
    }
  },

  target: "static",
  router: {
    base: "/qr-designer/"
  }
};
