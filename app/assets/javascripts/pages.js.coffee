# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

window.onload = ->
  stage = new Kinetic.Stage({
    container: 'trunk_animation'
    width: 328
    height: 200
  })

  layer = new Kinetic.Layer()

  animations = {
    idle: [
      {x:2658, y:1226, width:328, height:200}
      {x:2326, y:1226, width:328, height:200}
      {x:1994, y:1226, width:328, height:200}
      {x:1662, y:1226, width:328, height:200}
      {x:1330, y:1226, width:328, height:200}
      {x:998, y:1226, width:328, height:200}
      {x:666, y:1226, width:328, height:200}
      {x:334, y:1226, width:328, height:200}
      {x:2, y:1226, width:328, height:200}
      {x:3654, y:1022, width:328, height:200}
      {x:3322, y:1022, width:328, height:200}
      {x:2990, y:1022, width:328, height:200}
      {x:2658, y:1022, width:328, height:200}
      {x:2326, y:1022, width:328, height:200}
      {x:1994, y:1022, width:328, height:200}
      {x:1662, y:1022, width:328, height:200}
      {x:1330, y:1022, width:328, height:200}
      {x:998, y:1022, width:328, height:200}
      {x:666, y:1022, width:328, height:200}
      {x:334, y:1022, width:328, height:200}
      {x:2, y:1022, width:328, height:200}
      {x:3654, y:818, width:328, height:200}
      {x:3322, y:818, width:328, height:200}
      {x:2990, y:818, width:328, height:200}
      {x:2658, y:818, width:328, height:200}
      {x:2326, y:818, width:328, height:200}
      {x:1994, y:818, width:328, height:200}
      {x:1662, y:818, width:328, height:200}
      {x:1330, y:818, width:328, height:200}
      {x:998, y:818, width:328, height:200}
      {x:666, y:818, width:328, height:200}
      {x:334, y:818, width:328, height:200}
      {x:2, y:818, width:328, height:200}
      {x:3654, y:614, width:328, height:200}
      {x:3322, y:614, width:328, height:200}
      {x:2990, y:614, width:328, height:200}
      {x:2658, y:614, width:328, height:200}
      {x:2326, y:614, width:328, height:200}
      {x:1994, y:614, width:328, height:200}
      {x:1662, y:614, width:328, height:200}
      {x:1330, y:614, width:328, height:200}
      {x:998, y:614, width:328, height:200}
      {x:666, y:614, width:328, height:200}
      {x:334, y:614, width:328, height:200}
      {x:2, y:614, width:328, height:200}
      {x:3654, y:410, width:328, height:200}
      {x:3322, y:410, width:328, height:200}
      {x:2990, y:410, width:328, height:200}
      {x:2658, y:410, width:328, height:200}
      {x:2326, y:410, width:328, height:200}
      {x:1994, y:410, width:328, height:200}
      {x:1662, y:410, width:328, height:200}
      {x:1330, y:410, width:328, height:200}
      {x:998, y:410, width:328, height:200}
      {x:666, y:410, width:328, height:200}
      {x:334, y:410, width:328, height:200}
      {x:2, y:410, width:328, height:200}
      {x:3654, y:206, width:328, height:200}
      {x:3322, y:206, width:328, height:200}
      {x:2990, y:206, width:328, height:200}
      {x:2658, y:206, width:328, height:200}
      {x:2326, y:206, width:328, height:200}
      {x:1994, y:206, width:328, height:200}
      {x:1662, y:206, width:328, height:200}
      {x:1330, y:206, width:328, height:200}
      {x:998, y:206, width:328, height:200}
      {x:666, y:206, width:328, height:200}
      {x:334, y:206, width:328, height:200}
      {x:2, y:206, width:328, height:200}
      {x:3654, y:2, width:328, height:200}
      {x:3322, y:2, width:328, height:200}
      {x:2990, y:2, width:328, height:200}
      {x:2658, y:2, width:328, height:200}
      {x:2326, y:2, width:328, height:200}
      {x:1994, y:2, width:328, height:200}
      {x:1662, y:2, width:328, height:200}
      {x:1330, y:2, width:328, height:200}
      {x:998, y:2, width:328, height:200}
      {x:666, y:2, width:328, height:200}
      {x:334, y:2, width:328, height:200}
      {x:2, y:2, width:328, height:200}
    ]
  }

  imageObj = new Image();
  imageObj.onload = ->
    trunk = new Kinetic.Sprite({
      x: 0
      y: 0
      image: imageObj
      animation: 'idle'
      animations: animations
      frameRate: 7
      index: 0
    })

    layer.add(trunk)

    stage.add(layer)

    trunk.start()

  imageObj.src = '/assets/desktop/trunk2.png';
