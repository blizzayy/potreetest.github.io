var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 10000);

var canvas = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.top = "0px";
canvas.style.left = "0px";
canvas.style.width = "100%";
canvas.style.height = "100%";
document.body.appendChild(canvas);

var renderer = new THREE.WebGLRenderer({canvas:canvas});

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var controls = new THREE.OrbitControls(camera, canvas);
camera.position.z = 10;

var points = new Potree.Group();
points.setPointBudget(10000000);
scene.add(points);

Potree.loadPointCloud("data/test/cloud.js", name, function(data)
{
	var pointcloud = data.pointcloud;
	points.add(pointcloud);
});

function loop()
{
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}loop();

document.body.onresize = function()
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
};
document.body.onresize();
