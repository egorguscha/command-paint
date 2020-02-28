export function shape(n, m) {
  let str = ''
  // let path = 'x'
  // let space = '.'
  let path = '<div>x</div>'
  let space = '<div>.</div>'

  return {
    paint(shapes, options = {}) {
      const {bucketFill = ''} = options
      str = ''
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          const isPath = shapes.some(shape => shape.paint(i, j))
          const isFill =
            bucketFill && !shapes.some(shape => shape.paint(i, j, bucketFill))

          if (isPath) {
            str += path
          } else if (isFill) {
            str += `<div>${bucketFill}</div>`
          } else {
            str += space
          }
        }
        str += '\n'
      }

      return str
    },
  }
}

export function line({x1, y1, x2, y2}) {
  function paint(i, j) {
    const isH = y1 === i && x1 <= j && j <= x2
    const isV = x1 === j && y1 <= i && i <= y2
    const isHvalid = x1 <= x2
    const isVvalid = y1 <= y2

    return (isH || isV) && isHvalid && isVvalid
  }
  return {
    paint,
  }
}

export function rectangle({x1, y1, x2, y2}) {
  function paint(i, j, bucketFill) {
    const isH1 = y1 === i && x1 <= j && j <= x2
    const isV1 = x1 === j && y1 <= i && i <= y2
    const isH2 = y2 === i && x1 <= j && j <= x2
    const isV2 = x2 === j && y1 <= i && i <= y2
    const isHvalid = x1 <= x2
    const isVvalid = y1 <= y2
    const isFill = i >= y1 && i <= y2 && j >= x1 && j <= x2

    if (bucketFill) {
      return isFill
    }

    return (isH1 || isV1 || isH2 || isV2) && isHvalid && isVvalid
  }

  return {
    paint,
  }
}
