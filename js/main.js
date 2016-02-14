
var query = window.location.search.substr(3); 
const MAX_PICS = 16;
  var pictures = [], widths = [], heights = [], titles = [];
  pictures.push("images/1.jpg");
  pictures.push("images/2.jpg");
  pictures.push("images/3.jpg");
  pictures.push("images/4.jpg");
  pictures.push("images/5.jpg");
  pictures.push("images/6.jpg");
  pictures.push("images/7.jpg");
  pictures.push("images/8.jpg");
  pictures.push("images/9.jpg");
  pictures.push("images/10.jpg");
  pictures.push("images/11.jpg");
  pictures.push("images/12.jpg");
  pictures.push("images/13.jpg");
  pictures.push("images/14.jpg");
  pictures.push("images/15.jpg");
  pictures.push("images/16.jpg");



  // var link, description, width, widthEnd, height, heightEnd;

  //     $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  //         tags: query.val(),
  //         format: "json",
  //     },
  //     function(data) {
  //         $.each(data.items, function(i,item){
  //             link = item.media['m'];
  //             console.log(item);
  //             description = item.description;
  //             width = description.indexOf('width') + 7;
  //             widthEnd = description.indexOf('"', width);  
  //             //console.log(description.substr(width, widthEnd-width));
            
  //             height = description.indexOf('height') + 8;
  //             heightEnd = description.indexOf('"', height);  
  //             //console.log(description.substr(height, heightEnd-height));
            
              
  //             pictures.push(link);
  //             widths.push(description.substr(width, widthEnd-width));
  //             heights.push(description.substr(height, heightEnd-height));
  //             titles.push(item.title);
  //             //$("<img/>").attr("src", link).prependTo("#results");
  //             if (i == MAX_PICS - 1) return false;
        
  //         //console.log(pictures);
  //     });
  // });

  var clock;
  var scene, camera, renderer;
  var geometry, material, mesh;
  var havePointerLock = checkForPointerLock();
  var controls, controlsEnabled;
  var moveForward,
      moveBackward,
      moveLeft,
      moveRight,
      canJump;

  var velocity = new THREE.Vector3();
  var footStepSfx = new Audio('/sfx/footstep.wav');
  var ambienceSfx = new Audio('/sfx/ambience.wav');
  var hemisphereLight, spotLight, spotLight2, spotLight3, spotLight4; 

  ambienceSfx.preload = 'auto';
  ambienceSfx.loop = true;

  init();
  animate();

function init() {
    initControls();
    initPointerLock();

    ambienceSfx.play();
    footStepSfx.preload = 'auto';
    //footStepSfx.loop = true;

    clock = new THREE.Clock();


    scene = new THREE.Scene();    //scene.fog = new THREE.Fog(0xb2e1f2, 0, 750);

    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.y = 30;
    camera.position.x = 50; 

    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());

    // Cube
    var plane, plane2, plane3, plane4, ceiling; 
    var cube = new THREE.BoxGeometry(100, 10, 10); 

    plane = new THREE.PlaneGeometry(500, 200); 
    plane2 = new THREE.PlaneGeometry(500, 200); 
    plane3 = new THREE.PlaneGeometry(500, 200); 
    plane4 = new THREE.PlaneGeometry(500, 200); 
    ceiling = new THREE.PlaneGeometry(500, 500); 
    

    var material = new THREE.MeshLambertMaterial({
       color : 0x33ff55
     }); 
    var material2 = new THREE.MeshLambertMaterial({
      color : 0x00aa33
    }); 

    var material3 = new THREE.MeshLambertMaterial({
      color : 0xaaff22
    });

    var imgMaterialSpace = new THREE.MeshLambertMaterial({
      map:THREE.ImageUtils.loadTexture('images/space.jpg')
    }); 

//**88888888888888888888888888888888888888888888888888888888888888888888888888888*// 


    var imgMaterial = new THREE.MeshLambertMaterial({
     map:THREE.ImageUtils.loadTexture('images/ocean.jpg')
    });

for (var k = 0; k < 4; k++) {
        for (var i = 0; i < 4; i++) {
        var imagePlane1 = new THREE.PlaneGeometry(512/10, 512/10);

        var imgMaterial = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture(pictures[(k*4) + i])});
        
        if (k == 0) {
          imagePlane1.applyMatrix(new THREE.Matrix4().makeTranslation((100*i) - 150, 40, -245));
        } else if (k == 1) {
          imagePlane1.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));
          imagePlane1.applyMatrix(new THREE.Matrix4().makeTranslation((100*i) - 150, 40, 245));
        } else if (k == 2) {
          imagePlane1.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI/2)); 
          imagePlane1.applyMatrix(new THREE.Matrix4().makeTranslation(245, 40, (100*i) - 150));
        } else if (k == 3) {
          imagePlane1.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/2)); 
          imagePlane1.applyMatrix(new THREE.Matrix4().makeTranslation(-245, 40, (100*i) - 150));
        }

        var meshImage1 = new THREE.Mesh(imagePlane1, imgMaterial);
        scene.add(meshImage1);
      }
  }


//*8888888888888888888888888888888888888888888888888888888888888888888888888888888888*// 

    plane.applyMatrix(new THREE.Matrix4().makeTranslation(0, 100, 250)); 

    plane2.applyMatrix(new THREE.Matrix4().makeTranslation(0, 100, -250));

    plane3.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI /2));
    plane3.applyMatrix(new THREE.Matrix4().makeTranslation(250, 100, 0));
    
    plane4.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2)); 
    plane4.applyMatrix(new THREE.Matrix4().makeTranslation(-250, 100, 0));

    ceiling.applyMatrix(new THREE.Matrix4().makeRotationX( -Math.PI/2));
    ceiling.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI));
    ceiling.applyMatrix(new THREE.Matrix4().makeTranslation(0, 200, 0));

     
     var mesh = new THREE.Mesh(plane, material); 
     var mesh2 = new THREE.Mesh(plane2, material); 
     var mesh3 = new THREE.Mesh(plane3, material2); 
     var mesh4 = new THREE.Mesh(plane4, material3);
     var meshCeiling = new THREE.Mesh(ceiling, imgMaterialSpace); 
     var cubeMesh = new THREE.Mesh(cube, material2); 

    mesh.material.side = THREE.DoubleSide;
    mesh2.material.side = THREE.DoubleSide;
    mesh3.material.side = THREE.DoubleSide; 
    mesh4.material.side = THREE.DoubleSide; 



    //!!!!!!!!!!!!!!!!!@#$%&*$#@!$*&( LIGHTS )
    hemisphereLight = new THREE.HemisphereLight(0xffe5bb, 0xFFBF00, 0.5); 
    hemisphereLight.position.set(0, 150, 0);   



    
    scene.add(mesh);
    scene.add(mesh2);
    scene.add(mesh3);
    scene.add(mesh4); 
    scene.add(meshCeiling);

    //lights
    scene.add(hemisphereLight);

    // floor
     scene.add(createFloor());


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xb2e1f2);
    document.body.appendChild(renderer.domElement);
  }

  function animate() {
    requestAnimationFrame(animate);
    updateControls();
    renderer.render(scene, camera);
  }

function createFloor() {
  geometry = new THREE.PlaneGeometry(500, 500, 5, 5);
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI/2));
  var texture = THREE.ImageUtils.loadTexture('textures/crate.gif ');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(64, 64);
  material = new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture });
  return new THREE.Mesh(geometry, material);
}



  function checkForPointerLock() {
    return 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
  }
  
  function initPointerLock() {
    var element = document.body;
    if (havePointerLock) {
      var pointerlockchange = function (event) {
        if (document.pointerLockElement === element || 
            document.mozPointerLockElement === element || 
            document.webkitPointerLockElement === element) {
          controlsEnabled = true;
          controls.enabled = true;
        } else {
          controls.enabled = false;
        }
      };

      var pointerlockerror = function (event) {
        element.innerHTML = 'PointerLock Error';
      };

      document.addEventListener('pointerlockchange', pointerlockchange, false);
      document.addEventListener('mozpointerlockchange', pointerlockchange, false);
      document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

      document.addEventListener('pointerlockerror', pointerlockerror, false);
      document.addEventListener('mozpointerlockerror', pointerlockerror, false);
      document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

      var requestPointerLock = function(event) {
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
      };

      element.addEventListener('click', requestPointerLock, false);
    } else {
      element.innerHTML = 'Bad browser; No pointer lock';
    }
  }
  
  function onKeyDown(e) {
    switch (e.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = true;
        break;
      case 37: // left
      case 65: // a
        moveLeft = true; 
        break;
      case 40: // down
      case 83: // s
        moveBackward = true;
        break;
      case 39: // right
      case 68: // d
        moveRight = true;
        break;
      case 32: // space
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
    }
  }

  function onKeyUp(e) {
    switch(e.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = false;
        break;
      case 37: // left
      case 65: // a
        moveLeft = false;
        break;
      case 40: // down
      case 83: // s
        moveBackward = false;
        break;
      case 39: // right
      case 68: // d
        moveRight = false;
        break;
    }
  }

  function initControls() {
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
  }

  function updateControls() {
    if (controlsEnabled) {
      var delta = clock.getDelta();
      var walkingSpeed = 400.0;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;
      velocity.y -= 9.8 * 100.0 * delta;

      if (moveForward) velocity.z -= walkingSpeed * delta;
      if (moveBackward) velocity.z += walkingSpeed * delta;

      if (moveLeft) velocity.x -= walkingSpeed * delta;
      if (moveRight) velocity.x += walkingSpeed * delta;

      if (moveForward || moveBackward || moveLeft || moveRight) {
        footStepSfx.play();
      } 

      controls.getObject().translateX(velocity.x * delta);
      controls.getObject().translateY(velocity.y * delta);
      controls.getObject().translateZ(velocity.z * delta);

      if (controls.getObject().position.y < 10) {
        velocity.y = 0;
        controls.getObject().position.y = 10;
        canJump = true;
      }

      //Collisions 
      if (controls.getObject().position.x >= 240) {
        velocity.x = 0; 
        controls.getObject().position.x = 240;
      } else if (controls.getObject().position.x <= -240) {
        velocity.x = 0; 
        controls.getObject().position.x = -240; 
      }
    }
  }

