var controls;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var innerColor = 0x69a9f3,
    outerColor = 0x69a9f3;
    netColor = 0x69a9f3;
var innerSize = 55,
    outerSize = 60;    

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x000000, 0); // background
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls = new THREE.TrackballControls( camera );
// controls.noPan = true;
// controls.minDistance = 120;
// controls.maxDistance = 650;

camera.position.z = -400;
// Mesh
var group = new THREE.Group();
scene.add(group);

// Lights
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 128, 128);
scene.add(directionalLight);

// Sphere Wireframe Inner
var sphereWireframeInner = new THREE.Mesh(
  new THREE.IcosahedronGeometry(innerSize, 2),
  new THREE.MeshLambertMaterial({ 
    color: netColor,
    //ambient: netColor,
    wireframe: true,
    transparent: true,
    shininess: 10
  })
);
scene.add(sphereWireframeInner);

// Sphere Wireframe Outer
var sphereWireframeOuter = new THREE.Mesh(
  new THREE.IcosahedronGeometry(outerSize, 3),
  new THREE.MeshLambertMaterial({ 
    color: outerColor,
    //ambient: outerColor,
    wireframe: true,
    transparent: true,
    shininess: 0 
  })
);
scene.add(sphereWireframeOuter);

// Sphere Glass Inner
var sphereGlassInner = new THREE.Mesh(
  new THREE.SphereGeometry(innerSize, 32, 32),
  new THREE.MeshPhongMaterial({ 
    color: innerColor,
    ambient: innerColor,
    transparent: true,
    shininess: 25,
    opacity: 0.3,
  })
);
scene.add(sphereGlassInner);

// Sphere Glass Outer
var sphereGlassOuter = new THREE.Mesh(
  new THREE.SphereGeometry(outerSize, 32, 32),
  new THREE.MeshPhongMaterial({ 
    color: outerColor,
    ambient: outerColor,
    transparent: true,
    shininess: 25,
    opacity: 0.3,
  })
);
scene.add(sphereGlassOuter);

// Particles Outer
var geometry = new THREE.BufferGeometry();
var vertices = [];
for (let i = 0; i < 350; i++) {
  var x = -1 + Math.random() * 2;
  var y = -1 + Math.random() * 2;
  var z = -1 + Math.random() * 2;
  var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  x *= d;
  y *= d;
  z *= d;
  vertices.push(x * outerSize, y * outerSize, z * outerSize);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

var particlesOuter = new THREE.Points(geometry, new THREE.PointsMaterial({
  size: 0.1,
  color: outerColor,
  transparent: true,
}));
scene.add(particlesOuter);

// Particles Inner
var geometry = new THREE.BufferGeometry();
var vertices = [];
for (let i = 0; i < 350; i++) {
  var x = -1 + Math.random() * 2;
  var y = -1 + Math.random() * 2;
  var z = -1 + Math.random() * 2;
  var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  x *= d;
  y *= d;
  z *= d;
  vertices.push(x * outerSize, y * outerSize, z * outerSize);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

var particlesInner = new THREE.Points(geometry, new THREE.PointsMaterial({
  size: 0.1,
  color: innerColor,
  transparent: true,
}));
scene.add(particlesInner);

// Starfield
var geometry = new THREE.BufferGeometry();
var vertices = [];
for (let i = 0; i < 1000; i++) {
  vertices.push(
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000
  );
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

var starField = new THREE.Points(geometry, new THREE.PointsMaterial({
  size: 2,
  color: 0xffff99
}));
scene.add(starField);

camera.position.z = -110;
//camera.position.x = mouseX * 0.05;
//camera.position.y = -mouseY * 0.05;
//camera.lookAt(scene.position);

var time = new THREE.Clock();
var mouseX = 0;
var mouseY = 0;

// 添加移动范围限制
var maxOffset = 50; // 最大偏移量
var currentOffset = new THREE.Vector3(0, 0, 0);
var targetOffset = new THREE.Vector3(0, 0, 0);
var moveSpeed = 0.01; // 移动速度

// 定义颜色过渡范围
var lightBlue = new THREE.Color(0x69a9f3);  // 浅蓝色
var lightGreen = new THREE.Color(0x90EE90);  // 浅绿色
var colorTransitionSpeed = 0.002;  // 颜色过渡速度

function updateSpherePosition() {
    // 如果当前偏移量接近目标偏移量，生成新的目标
    if (currentOffset.distanceTo(targetOffset) < 1) {
        targetOffset.set(
            (Math.random() - 0.5) * maxOffset * 2,
            (Math.random() - 0.5) * maxOffset * 2,
            (Math.random() - 0.5) * maxOffset * 2
        );
    }
    
    // 平滑移动到目标位置
    currentOffset.lerp(targetOffset, moveSpeed);
    
    // 应用偏移到所有球体相关对象
    group.position.copy(currentOffset);
}

function updateSphereColors() {
    // 使用正弦函数在0到1之间循环
    var t = (Math.sin(time.getElapsedTime() * colorTransitionSpeed) + 1) / 2;
    
    // 在两种颜色之间插值
    var currentColor = lightBlue.clone().lerp(lightGreen, t);
    
    // 应用颜色到内层球体的所有部分
    //sphereWireframeInner.material.color.copy(currentColor);
    sphereGlassInner.material.color.copy(currentColor);
    particlesInner.material.color.copy(currentColor);
}

function animate() {
  requestAnimationFrame(animate);
  
  updateSpherePosition();
  updateSphereColors();  // 添加颜色更新
  
  camera.lookAt(scene.position);

  sphereWireframeInner.rotation.x += 0.002;
  sphereWireframeInner.rotation.z += 0.002;
  
  sphereWireframeOuter.rotation.x += 0.001;
  sphereWireframeOuter.rotation.z += 0.001;
  
  sphereGlassInner.rotation.y += 0.005;
  sphereGlassInner.rotation.z += 0.005;

  sphereGlassOuter.rotation.y += 0.01;
  sphereGlassOuter.rotation.z += 0.01;

  particlesOuter.rotation.y += 0.0005;
  particlesInner.rotation.y -= 0.002;
  
  starField.rotation.y -= 0.002;

  var innerShift = Math.abs(Math.cos(( (time.getElapsedTime()+2.5) / 20)));
  var outerShift = Math.abs(Math.cos(( (time.getElapsedTime()+5) / 10)));

  starField.material.color.setHSL(Math.abs(Math.cos((time.getElapsedTime() / 10))), 1, 0.5);

  //sphereWireframeOuter.material.color.setHSL(0, 1, outerShift);
  //sphereGlassOuter.material.color.setHSL(0, 1, outerShift);
  particlesOuter.material.color.setHSL(0, 1, outerShift);

  //sphereWireframeInner.material.color.setHSL(0.08, 1, innerShift);
  particlesInner.material.color.setHSL(0.08, 1, innerShift);
  //sphereGlassInner.material.color.setHSL(0.08, 1, innerShift);

  //sphereWireframeInner.material.opacity = Math.abs(Math.cos((time.getElapsedTime()+0.5)/0.9)*0.5);
  //sphereWireframeOuter.material.opacity = Math.abs(Math.cos(time.getElapsedTime()/0.9)*0.5);

  directionalLight.position.x = Math.cos(time.getElapsedTime()/0.5)*128;
  directionalLight.position.y = Math.cos(time.getElapsedTime()/0.5)*128;
  directionalLight.position.z = Math.sin(time.getElapsedTime()/0.5)*128;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

// Mouse and resize events
document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - window.innerWidth/2;
  mouseY = event.clientY - window.innerHeight/2;
}