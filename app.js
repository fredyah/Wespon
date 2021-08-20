//Variables for setup
let container;
let camera;
let renderer;
let scene;
let human;

function init(){
    container = document.querySelector('.scene');
    
    //Create scene
    scene = new THREE.Scene();

    const fov =35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    //Camera Setup
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0, 1, 5);

    const ambient = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(50, 50, 100);
    scene.add(light);

    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load("./human/Tomahawk.glb", function(gltf){
        scene.add(gltf.scene);
        human = gltf.scene.children[0];
        scene.scale.set(0.05,0.05,0.05);
        animate();

    })
}

function animate(){
    requestAnimationFrame(animate);
    human.rotation.y -= 0.005;
    renderer.render(scene, camera);
}

init()


function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  window.addEventListener("resize", onWindowResize);

