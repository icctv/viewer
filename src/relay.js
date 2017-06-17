export default ({ relayUrl }) => {
  const isProtected = ({ channel }) => {
    const url = [relayUrl, 'protect', channel].join('/')
    return window.fetch(url)
      .then(r => r.json())
      .then(r => r.isProtected)
  }

  const isAuthorized = ({ channel, password }) => {
    const url = [relayUrl, 'protect', channel, password].join('/')
    return window.fetch(url)
      .then(r => r.json())
      .then(r => r.isAuthorized)
  }

  const getStreamUrl = ({ channel, password }) => {
    const baseUrl = relayUrl.replace(/^http/, 'ws')
    const url = [baseUrl, 'out', channel, password].join('/')
    return url
  }

  return { relayUrl, isProtected, isAuthorized, getStreamUrl }
}
