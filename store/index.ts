
const PROD = process.env.NODE_ENV === `production`

interface State {
  currentQr: any
  currentApp: any
  qrCodeBeingCreated: any
  webapps: string
  protocol: string
  apiKey: {
    id: string
    apiKey: string
  }
}

export const state = () => ({
  currentQr: {},
  currentApp: {},
  qrCodeBeingCreated: {},
  webapps: PROD ? 'static.qrnew.app' : 'static.static.localhost:8081', // two 'static's to match the subdomain level in express in app engine
  protocol: PROD ? "https://" : "http://",
  apiKey: { id: null, apiKey: "" },
})

export const mutations = {
  setCurrentQr(state: State, payload: any) {
    state.currentQr = payload
  },
  setCurrentApp(state: State, payload: any) {
    state.currentApp = payload
  },
  setQrCodeBeingCreated(state: State, payload: any) {
    state.qrCodeBeingCreated = payload
  },
  setApiKey(state: State, key: any) {
    state.apiKey = key
  },
}

export const getters = {
  breadCrumbs(state: State) {
    return function (crumbs: any[]) {
      return crumbs.map((breadCrumb, index) => {
        breadCrumb.id = index
        breadCrumb.resolvedLink = breadCrumb.link ? breadCrumb.link(state) : ''
        breadCrumb.resolvedName = breadCrumb.name(state)
        return breadCrumb
      })
    }
  },
}

export const actions = {
  // @ts-ignore
  onAuthStateChanged(state: State, { authUser, claims }) {
    if (!authUser) {
      // @ts-ignore
      this.$fire.auth.signInAnonymously()
    }
  }
}