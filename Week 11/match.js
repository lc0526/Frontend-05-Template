// parseSelector 对 selector 做预处理，把 .test-child2 .child1 > .child2 > .child3 .child4 按 Combinator 分割得到选择器数组并翻转，选择器可以是+、~、>结尾，得到 ['.child4', '.child3', '.child2>', '.child1>', '.test-child2'] 这样的数组
// matchSimpleSelector 匹配简单选择器
// matchCompound 匹配复合选择器
// matchSelectors 处理 Combinator
// 可以参考 https://www.yuque.com/u1581204/vcbvy3/dkoqgr
function match(selector, element) {
  let selectors = parseSelector(selector)
  if (selectors.length === 0) {
    return false
  }
  if (matchCompound(selectors[0], element)) {
    return matchSelectors(selectors.slice(1), element)
  }
  return false
}
    
function matchSelectors(selectors, element) {
    if (!element) {
      return false
  }
  if (selectors.length === 0) {
      return true
  }
  let [suffix, nextElement, selector] = getSuffix(selectors[0])
  let currentElement = element
  if (suffix === '>' || suffix === '+') {
    currentElement = currentElement[nextElement]
    if (matchCompound(selector, currentElement)) {
        return matchSelectors(selectors.slice(1), currentElement)
    }
  } else {
    while (currentElement) {
      currentElement = currentElement[nextElement]
      if (matchCompound(selector, currentElement)) {
        if (matchSelectors(selectors.slice(1), currentElement)) {
          return true
        }
      }
    }
  }
  return false
}

function getSuffix(selector) {
  let suffix = selector.slice(-1)
  if (suffix === '+' || suffix === '~') {
    return [suffix, 'previousElementSibling', selector.slice(0, -1)]
  }
  if (suffix === '>') {
    return [suffix, 'parentElement', selector.slice(0, -1)]
  }
  return [' ', 'parentElement', selector]
}

function matchSimpleSelector(simpleSelector, element) {
  let prefix = simpleSelector.slice(0, 1)
  if (prefix === '#') {
    return element.getAttribute('id') === simpleSelector.slice(1)
  } else if (prefix === '.') {
    let classes = element.getAttribute('class')
    if (classes) {
      return classes.split(' ').indexOf(simpleSelector.slice(1)) !== -1
    }
    return false
  } else {
    return simpleSelector === element.tagName.toLowerCase()
  }
}

function matchCompound(selector, element) {
  if (!element) {
    return false
  }
  let selectors = splitSelector(selector)
  // 也可以用数组的every方法
  for (let simpleSelector of selectors) {
    if (!matchSimpleSelector(simpleSelector, element)) {
      return false
    }
  }
  return true
}

function splitSelector(selector) {
  if (!selector) {
    return []
  }
  let selectors = []
  let currentSelector = ''
  for (let c of selector) {
    if (c === '#' || c === '.') {
      if (currentSelector.length > 0) {
        selectors.push(currentSelector)
      }
      currentSelector = c
    } else {
      currentSelector += c
    }
  }
  if (currentSelector.length > 0) {
    selectors.push(currentSelector)
  }
  return selectors
}

function parseSelector(selector) {
  return selector
    .replace(/\\s+[+>~]/g, (match) => {
      return match.slice(-1)
    })
    .split(' ')
    .reverse()
}

match("div #id.class", document.getElementById("id"));