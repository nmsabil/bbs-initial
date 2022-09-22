import * as prismic from '@prismicio/client' // client to query content
import { enableAutoPreviews } from '@prismicio/next' // plugin for previews

export const endpoint = process.env.PRISMIC_API;
export const repositoryName = prismic.getRepositoryName(endpoint)

export function linkResolver(doc) {
  switch (doc.type) {
    case 'homepage':
      return '/'
    case 'page':
      return `/${doc.uid}`
    case 'pages':
      return `/${doc.uid}`
    case 'blog':
      return `/blog/${doc.uid}`
    default:
      return `/${doc.uid}`
  }
}

// This factory function allows smooth preview setup
export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.hasOwnProperty('previewData') ? config['previewData'] : null,
    req: config.hasOwnProperty('req') ? config['req'] : null,
  })

  return client
}
