import { colors } from './config'
import platform from 'platform'

/**
 * Returns a color from config
 *
 * @param {string} element
 * @param {string} [shade='base']
 * @returns {string} Color value
 */
export function getColor(element, shade = 'base') {
    if (typeof colors[element] === 'undefined') {
        console.error(`colors does not contain ${element}`)
        return
    }
    if (typeof colors[element][shade] === 'undefined') {
        console.error(`colors[${element}] does not contain shade ${shade}`)
        return
    }

    return colors[element][shade]
}

/**
 * Gets the current OS platform
 *
 * @returns {string} Lowercase, if not known, defaults to `windows`
 */
export function getPlatform() {
    let currentDevice
    try {
        currentDevice = platform.os.family.toLowerCase()
    } catch (e) {
        return 'windows'
    }

    if (currentDevice.indexOf('android') > -1) {
        return 'android'
    }
    if (currentDevice.indexOf('ios') > -1) {
        return 'ios'
    }
    if (currentDevice.indexOf('os x') > -1) {
        return 'macos'
    }
    if (currentDevice.indexOf('windows phone') > -1) {
        return 'windowsphone'
    }

    return 'windows'
}
