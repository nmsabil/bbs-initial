import { RichText } from 'prismic-reactjs';

export function linkResolver(doc) {
  // Pretty URLs for known types
  if (doc.type === 'product') return `/product/${doc.uid}`
  if (doc.type === 'page') return `/${doc.uid}`
  if (doc.type === 'pages') return `/${doc.uid}`
  // Fallback for other types, in case new custom types get created
  return `/${doc.id}`
}
