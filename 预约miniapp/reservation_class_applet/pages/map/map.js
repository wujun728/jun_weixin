Page({
  data: {
    latitude: 34.34127,
    longitude: 108.93984,
    markers: [{
      iconPath: "/images/ic_position.png",
      id: 0,
      // 经纬度
      latitude: 34.34127,
      longitude: 108.93984,
      width: 20,
      height: 25
    }],
    polyline: [{
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/images/ic_position.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})