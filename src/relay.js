export default ({ relayUrl }) => {
  const getMetadata = ({ channel }) => {
    const url = [relayUrl, 'out', channel].join('/')
    return window.fetch(url).then(r => r.json())
  }

  return { getMetadata }
}
