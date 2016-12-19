import * as THREE from 'three';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Game.css';
import raf from 'raf';

const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 600;

const VIEW_ANGLE = 75;
const ASPECT = STAGE_WIDTH / STAGE_HEIGHT;
const NEAR = 0.1;
const FAR = 1000;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }
  tick() {
    this.renderer.render( this.scene, this.camera );

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    raf( this.tick.bind( this ) );
  }
  componentWillUnmount() {
    if ( this.tickHandler ) {
      raf.cancel( this.tickHandler );
    }
  }
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( STAGE_WIDTH, STAGE_HEIGHT );

    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshLambertMaterial({
      color: 0x00ff00
    });
    this.cube = new THREE.Mesh( this.geometry, this.material );

    this.scene.add( this.cube );
    this.camera.position.z = 5;

    this.pointLight = new THREE.PointLight(0xFFFFFF);
    this.pointLight.position.x = 10;
    this.pointLight.position.y = 10;
    this.pointLight.position.z = 10;
    
    this.scene.add( this.pointLight );

    let node = ReactDOM.findDOMNode( this );
    node.appendChild( this.renderer.domElement );

    this.tickHandler = raf( this.tick.bind( this ) );
  }
  render() {
    return (
      <div id={styles.stage}></div>
    );
  }
}