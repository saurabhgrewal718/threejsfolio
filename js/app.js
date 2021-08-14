import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

export default class Sketch{
    constructor(options){
        this.time = 0;
        this.container = options.dom;
        this.scene = new THREE.Scene();

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
        this.camera.position.z = 1;

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( this.width, this.height );
        this.container.appendChild( this.renderer.domElement );

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.resize();
        this.setUpResize();
        this.addObjects();
        this.render();
    }
    setUpResize(){
        window.addEventListener('resize',this.resize.bind(this));
    }
    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width,this.height);
        this.camera.aspect = this.width/this.height;
        //changing now will change the cube but the aspectratio will be fucked up...
        //so to make sure that this is not fucked up we will use the update camera 
        //projecton martix and will update that so that it is not doing crazy stuff
        this.camera.updateProjectionMatrix();
    }
    addObjects(){
        this.geometry = new THREE.PlaneBufferGeometry(0.5,0.5,30,30);
        this.material = new THREE.MeshNormalMaterial();

        this.material = new THREE.ShaderMaterial({
            side:THREE.DoubleSide,
            wireframe:true,
            fragmentShader:fragment,
            vertexShader:vertex,
        })
    
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }
    render(){
        this.time+=0.5;
        this.mesh.rotation.x = this.time / 2000;
        this.mesh.rotation.y = this.time / 1000;
    
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render.bind(this));
    }
}


new Sketch({
    dom:document.getElementById('container')
})

