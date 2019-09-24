import addEventListener from 'add-dom-event-listener';
import { bindActionCreators } from 'redux';
import store from 'store';
import { browserResize, browserScroll } from 'store/actions/browser';

const boundActionCreators = bindActionCreators({ browserResize, browserScroll }, store.dispatch);
const _browserResize = boundActionCreators.browserResize;
const _browserScroll = boundActionCreators.browserScroll;

((window, { documentElement, body }) => {
    // 节流函数
    function throttle(func, wait, mustRun) {
        var timeout,
            startTime = new Date();

        return function () {
            var context = this,
                args = arguments,
                curTime = new Date();

            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if (curTime - startTime >= mustRun) {
                func.apply(context, args);
                startTime = curTime;
            }
            else {
                // 没达到触发间隔，重新设定定时器
                timeout = setTimeout(func, wait);
            }
        };
    };

    function onResize() {
        var width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
        var height = window.innerHeight || documentElement.clientHeight || body.clientHeight;
        _browserResize({
            width,
            height
        });
    }

    function onScroll() {
        _browserScroll(window.scrollY || documentElement.scrollTop || body.scrollTop);
    }

    addEventListener(window, 'resize', throttle(onResize, 100, 500))
})(window, document);