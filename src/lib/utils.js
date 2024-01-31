// 替换换行符
export function transBlogContent(text) {
    const regex = /\\n/ig;
    return text?.replaceAll(regex, '\n') ?? ''
}

//滚动条在Y轴上的滚动距离
function getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//文档的总高度
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

//浏览器视口的高度
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

export function isScrollButtom() {
    if (Math.floor(getScrollTop() + getWindowHeight() + 1) >= getScrollHeight()) {
        return true
    }
}

// 生成随机字符串
export function randomString() {
    const length = 12
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// 防抖
export function debounce(fn, delay = 1000) {
    let time = null;
    function _debounce(...args) {
        if (time !== null) {
            clearTimeout(time)
        }
        time = setTimeout(() => {
            fn.apply(this, args)
        }, delay);
    }
    return _debounce
}

// 判断是否为服务端
export const isServer = () => typeof window === 'undefined'