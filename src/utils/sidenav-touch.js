/**
 * Handles the touch events on the sidenav pusher element
 *
 * @export
 * @class SidenavTouch
 */
export default class SidenavTouch {
    constructor(toggleSidebar) {
        // CONFIG
        // Px dist to touch move before trigger menu
        this.touchMoveTriggerPx = 30
        // Px from pusher left that will listen for touch
        this.touchMoveLeftTarget = 50

        // METHODS
        this.toggleSidebar = toggleSidebar
    }

    /**
     * Gets fired when dragging ends with touch
     */
    touchEnd() {
        this.disableTouchMove = false
    }

    /**
     * Gets fired when dragging with touch
     * @param {Object} event
     */
    touchMove(e) {
        if (this.disableTouchMove) {
            return
        }

        const x = parseInt(e.clientX || e.touches[0].clientX)
        const touchX = x - this.touchXStart

        if (
            touchX >= this.touchMoveTriggerPx ||
            touchX <= -this.touchMoveTriggerPx
        ) {
            this.disableTouchMove = true
            this.toggleSidebar(null, touchX >= this.touchMoveTriggerPx)
        }
    }

    /**
     * Gets fired when starting touch
     * @param {Object} event
     */
    touchStart(e, pusher) {
        const pusherBounds = pusher.getBoundingClientRect()
        const x = parseInt(e.clientX || e.touches[0].clientX)

        if (x - pusherBounds.left > this.touchMoveLeftTarget) {
            this.disableTouchMove = true
            return
        }

        this.touchXStart = x
    }
}
