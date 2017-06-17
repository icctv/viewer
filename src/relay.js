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

  return { isProtected, isAuthorized }
}
