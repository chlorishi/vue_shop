import Timeline from './src/main'

/* istanbul ignore next */
Timeline.install = function(Vue) {
    Vue.component(Timeline.name, Timeline)
}

// eslint-disable-next-line eol-last
export default Timeline