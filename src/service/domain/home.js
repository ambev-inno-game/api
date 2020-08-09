import { loadConfig } from '../../repository/config/config'

export async function getHome() {
  // TODO: suggest product box
  const configList = await loadConfig('BANNER_LINK')
  return configList.map(config => config.configValue)
}