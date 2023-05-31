import Vue from "vue"
import { ActionTree, MutationTree } from "vuex"
import { SwinkState, Swink, SwinkError } from "./types"

export const state: (() => SwinkState) = () => ({
  swink: {
    tag: {
      redirect: true,
      url: ''
    },
    metadata: {
      id: ''
    }
  },
  creating: false,
  error: ''
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  setSwink(state, data: Swink) {
    state.swink = data
  },
  setId(state, id: string) {
    state.swink.metadata.id = id
  },
  setUrl(state, url: string) {
    state.swink.tag.url = url
  },
  setIsRedirect(state, isRedirect: boolean) {
    state.swink.tag.redirect = isRedirect
  },
  setError(state, error: SwinkError) {
    state.error = error
  },
  clearError(state) {
    state.error = ''
  },
  setCreating(state, creating: boolean) {
    state.creating = creating
  },
  setName(state, name: string) {
    state.swink.tag.name = name
  },
  setMessage(state, message: string) {
    state.swink.tag.message = message
  },
  resetSwink(state) {
    state.swink = {
      tag: {
        redirect: true,
        url: ''
      }, metadata: { id: '' }
    }
  },
  addImageIds(state, imageIds: string[]) {
    if (!state.swink.tag.images) {
      Vue.set(state.swink.tag, 'images', [])
    }
    for (let imageId of imageIds) {
      state.swink.tag.images!.push(imageId)
    }
  },
  removeImageIds(state, imageIds: string[]) {
    if (!state.swink.tag.images) {
      return
    }
    for (let i = state.swink.tag.images.length; i--; i >= 0) {
      if (imageIds.includes(state.swink.tag.images[i])) {
        state.swink.tag.images.splice(i, 1)
      }
    }
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async deleteImages(context, imageIds: string[]) {
    if (!context.state.swink.tag.images) {
      return
    }
    const deletions = imageIds.map(async imageId => {
      // let result = await this.$rpc.del(`/swink/${context.state.swink.metadata.id}/images/${imageId}`)
      // console.log(result)
      // return result
    })
    console.log(deletions)
    await Promise.all(deletions)

    context.commit('removeImageIds', imageIds)
  },
  async setIsRedirect({ state, dispatch, commit }, isRedirect: boolean) {
    if (state.swink.tag.redirect === isRedirect) {
      return
    }

    commit('setIsRedirect', isRedirect)

    await dispatch('createIfNeeded')
    await dispatch('updateSwink')
  },
  async setName(context, name: string) {
    if (context.state.swink.tag.name === name) {
      return
    }

    context.commit('setName', name)

    await context.dispatch('createIfNeeded')
    await context.dispatch('updateSwink')
  },
  async setMessage(context, message: string) {
    if (context.state.swink.tag.message === message) {
      return
    }

    context.commit('setMessage', message)

    await context.dispatch('createIfNeeded')
    await context.dispatch('updateSwink')
  },
  async updateSearchTerm(context, searchTerm: string) {
    await context.dispatch('createIfNeeded')
    if (!context.state.swink.metadata.id) {
      return
    }

    if (!searchTerm) {
      context.commit('setUrl', "")
    } else {
      // const result = await this.$rpc.post(
      //   `/swink/${context.state.swink.metadata.id}?searchTerm=${encodeURIComponent(
      //     searchTerm
      //   )}`,
      //   null
      // );
      // context.commit('setUrl', result.data);
    }
  },
  async updateSwink(context) {
    if (context.state.creating) {
      return
    }
    if (!context.state.swink.metadata.id) {
      return
    }
    return this.$fire.firestore
      .doc(`tags/${context.state.swink.metadata.id}`)
      .set(context.state.swink.tag, { merge: true })
  },
  async createIfNeeded({ state, dispatch }) {
    if (!state.swink.metadata.id && !state.creating) {
      await dispatch('createSwink')
    }
  },
  async createSwink({ state, commit }) {
    if (state.creating) {
      return
    }
    commit('setCreating', true)
    const newTag: { url?: string, redirect: boolean } = {
      redirect: !!state.swink.tag.redirect
    }
    if (state.swink.tag.url) {
      newTag.url = state.swink.tag.url
    }
    try {
      // const result = await this.$rpc.post('/swink', { data: newTag })
      // this.$fire.analytics.logEvent("create_code_draft_created");
      // commit('setId', result.data.swinkId)
    } catch (error: any) {
      if (
        error.response &&
        error.response.status &&
        error.response.status === 426
      ) {
        commit('setError', "EXCEEDED_QUOTA")
      } else {
        commit('setError', "UNKNOWN")
      }
    }
    commit('setCreating', false)
  }
}